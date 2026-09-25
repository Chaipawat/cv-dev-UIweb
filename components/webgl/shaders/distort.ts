/**
 * Distorted image plane. The vertex stage gives the plane real depth — a
 * bulge under the cursor and a vertical bend from scroll velocity — while
 * the fragment stage cover-fits the texture and displaces its UVs. With every
 * input at rest the output is the untouched image, so the idle state stays
 * perfectly readable.
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

  varying vec2 vUv;
  varying float vLift;

  // Cheap value noise — enough for a soft, organic displacement.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * uCover + mix(vec2(0.5), uFocus, 1.0 - uCover);

    // Lens push away from the cursor, roughened by noise.
    vec2 toMouse = vUv - uMouse;
    float falloff = exp(-dot(toMouse, toMouse) * 10.0) * uHover;
    float n = noise(vUv * 6.0 + uTime * 0.25) - 0.5;
    uv -= toMouse * falloff * 0.07;
    uv += n * falloff * 0.02;

    // Scroll velocity: vertical smear with a slight horizontal wave.
    float v = uVelocity;
    uv.y += v * 0.03 * sin(vUv.x * 3.14159265);
    uv.x += sin(vUv.y * 12.0 + uTime) * 0.004 * abs(v);

    // Directional split — under the page's grayscale grade it reads as a motion ghost.
    vec2 shift = vec2(0.0, v * 0.008 + falloff * 0.004);
    vec3 color = vec3(
      texture2D(uTexture, uv + shift).r,
      texture2D(uTexture, uv).g,
      texture2D(uTexture, uv - shift).b
    );
    color += vLift * 0.06;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;
