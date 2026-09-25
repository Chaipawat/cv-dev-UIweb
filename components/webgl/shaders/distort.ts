/**
 * Ink-bleed image plane for a washi (light) page. The vertex stage gives the
 * plane real depth — a bulge under the cursor and a vertical bend from scroll
 * velocity. The fragment stage cover-fits the texture, then lets the image's
 * dark areas bleed into the paper: noise-warped UVs plus a min-filter along
 * the flow direction dilate the ink with an irregular, absorbed edge. At rest
 * it renders the same ink/paper duotone as the CSS `.ink-duotone` treatment
 * and eases to true colour on hover, so the idle state stays readable.
 */
export const distortVertex = /* glsl */ `
  uniform vec2 uMouse;     // 0..1, origin bottom-left
  uniform float uHover;    // 0..1, eased cursor presence
  uniform float uVelocity; // signed, eased scroll velocity (≈ -1..1)
  uniform float uTime;

  varying vec2 vUv;
  varying float vLift;

  void main() {
    vUv = uv;
    vec3 p = position;

    float d = distance(uv, uMouse);
    float bulge = exp(-d * d * 14.0) * uHover;
    // Bend: middle of the plane lags behind the edges in the scroll direction.
    float bend = sin(uv.y * 3.14159265) * uVelocity;
    float ripple = sin(uv.x * 9.0 + uTime * 1.6) * 0.012 * abs(uVelocity);

    p.z += bulge * 0.09 - bend * 0.12 + ripple;
    vLift = bulge;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const distortFragment = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uCover;     // scale that cover-fits the image into the plane
  uniform vec2 uFocus;     // object-position equivalent, 0..1
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uVelocity;
  uniform float uTime;
  uniform vec3 uInk;       // sumi ink, sRGB 0..1
  uniform vec3 uPaper;     // washi paper, sRGB 0..1
  uniform float uColor;    // 0 = duotone, 1 = true colour
  uniform float uDot;      // halftone cell in device px (4 CSS px × DPR)

  varying vec2 vUv;
  varying float vLift;

  const float PI = 3.14159265;
  const int TAPS = 5;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  // Three octaves: enough for fibrous, paper-like edges.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = p * 2.03 + 17.1;
      a *= 0.5;
    }
    return v;
  }

  // Textures decode to linear; the duotone is built in sRGB so it matches
  // the CSS grayscale() + blend layers exactly.
  vec3 toSRGB(vec3 c) { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }
  vec3 toLinear(vec3 c) { return pow(max(c, 0.0), vec3(2.2)); }

  void main() {
    vec2 uv = (vUv - 0.5) * uCover + mix(vec2(0.5), uFocus, 1.0 - uCover);

    // Bleed field: strongest under the cursor, with a ragged, drifting edge.
    vec2 toMouse = vUv - uMouse;
    float falloff = exp(-dot(toMouse, toMouse) * 9.0) * uHover;
    float n1 = fbm(vUv * 5.0 + uTime * 0.12);
    float n2 = fbm(vUv * 8.0 - uTime * 0.09 + 3.7);
    vec2 warp = vec2(n1, n2) - 0.5;
    float bleed = falloff * smoothstep(0.3, 0.8, n1 + falloff * 0.45);

    // Soft lens push plus fibrous warp where the ink is spreading.
    uv -= toMouse * falloff * 0.045;
    uv += warp * bleed * 0.04;

    // Scroll velocity: the ink drags vertically, slightly wavering.
    float v = uVelocity;
    uv.y += v * 0.028 * sin(vUv.x * PI);
    uv.x += warp.x * 0.012 * abs(v);

    // Ink spread: darkest sample along the flow direction = dark areas dilate
    // into the paper, like wet sumi wicking through fibres.
    vec3 base = texture2D(uTexture, uv).rgb;
    vec2 dir = warp + vec2(0.0, sign(v) * abs(v) * 1.6) + 1e-4;
    dir = normalize(dir);
    float reach = bleed * 0.018 + abs(v) * 0.012;
    vec3 inked = base;
    for (int i = 1; i <= TAPS; i++) {
      float t = float(i) / float(TAPS);
      inked = min(inked, texture2D(uTexture, uv + dir * reach * t).rgb);
    }
    vec3 color = mix(base, inked, 0.85);

    // Ink print, mirroring .ink-duotone: grayscale → contrast(1.22) →
    // brightness(1.05), then screen with ink and multiply with washi + a
    // halftone screen. Where the ink is bleeding, the fibres pick up a touch
    // more pigment.
    vec3 srgb = toSRGB(color);
    float g = dot(srgb, vec3(0.2126, 0.7152, 0.0722));
    g = ((g - 0.5) * 1.22 + 0.5) * 1.05;
    g = clamp(g + vLift * 0.04 - bleed * n2 * 0.08, 0.0, 1.0);
    vec3 screened = uInk + g * (1.0 - uInk);
    vec2 cell = mod(gl_FragCoord.xy, uDot) - uDot * 0.5;
    float dotMask = 1.0 - smoothstep(uDot * 0.19, uDot * 0.31, length(cell));
    vec3 layer = mix(uPaper, uInk, 0.28 * dotMask);
    vec3 duo = toLinear(screened * layer);

    gl_FragColor = vec4(mix(duo, color, uColor), 1.0);
    #include <colorspace_fragment>
  }
`;
