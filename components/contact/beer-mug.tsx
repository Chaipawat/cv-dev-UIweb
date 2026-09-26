"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/*
 * A cold, faceted beer mug that pours itself. Everything is in the glass's local
 * space (base at y = 0). The pour is a small state machine advanced in
 * useFrame and written straight into uniforms and instance matrices, so the
 * animation never re-renders React.
 */

const RIM = 1.9;
const BASE = 0.24; // top of the heavy glass base
const WALL = 0.05;
const R_BOTTOM = 0.6;
const R_TOP = 0.63;
/** Faceted like a classic beer mug; the panels catch light as vertical bands. */
const SIDES = 14;
const outerR = (y: number) => R_BOTTOM + (R_TOP - R_BOTTOM) * (y / RIM);
const innerR = (y: number) => outerR(y) - WALL;
/** Largest circle that fits inside the faceted wall — liquid, foam and bubbles use it. */
const FIT = Math.cos(Math.PI / SIDES) - 0.008;
const fitR = (y: number) => innerR(y) * FIT;
// Lathe angle for the handle: three-quarters toward the camera, on the right.
const HANDLE_ANGLE = THREE.MathUtils.degToRad(85);

const LIQUID_FULL = 1.42;
const FOAM_POURING = 0.5;
const FOAM_FULL = 0.42;
const STREAM_TOP = RIM + 1.45;
const POUR = 3.4;
const SETTLE = 2.4;
const DRAIN = 1.0;

const BUBBLES = 84;
const DROPLETS = 110;

type Phase = "empty" | "pour" | "settle" | "full" | "drain";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Deterministic PRNG so bubble/droplet layouts are stable and render stays pure. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function glassGeometry() {
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(R_BOTTOM - 0.04, 0),
    new THREE.Vector2(R_BOTTOM + 0.02, 0.04),
    new THREE.Vector2(R_BOTTOM + 0.02, 0.16),
    new THREE.Vector2(R_BOTTOM, 0.2),
  ];
  for (let i = 1; i <= 12; i++) {
    const y = 0.2 + ((RIM - 0.2) * i) / 12;
    pts.push(new THREE.Vector2(outerR(y), y));
  }
  // Rolled lip.
  pts.push(new THREE.Vector2(R_TOP - 0.008, RIM + 0.02), new THREE.Vector2(R_TOP - WALL + 0.008, RIM + 0.02));
  for (let i = 12; i >= 0; i--) {
    const y = BASE + ((RIM - BASE) * i) / 12;
    pts.push(new THREE.Vector2(innerR(y), y));
  }
  pts.push(new THREE.Vector2(0, BASE + 0.012));
  // Flat-shaded facets: each panel reflects as one clean band.
  const geometry = new THREE.LatheGeometry(pts, SIDES).toNonIndexed();
  geometry.computeVertexNormals();
  return geometry;
}

/** C-shaped glass handle, built in the mug's local space on the HANDLE_ANGLE side. */
function handleGeometry() {
  const R = outerR(1.0);
  const curve = new THREE.CatmullRomCurve3(
    [
      [R - 0.06, 1.58],
      [R + 0.26, 1.6],
      [R + 0.46, 1.38],
      [R + 0.47, 0.92],
      [R + 0.3, 0.58],
      [R - 0.06, 0.52],
    ].map(([x, y]) => new THREE.Vector3(x, y, 0)),
  );
  const geometry = new THREE.TubeGeometry(curve, 48, 0.085, 14, false);
  // Lathe angle φ puts a point at (sin φ, cos φ) on x/z; turn the +x handle there.
  geometry.rotateY(HANDLE_ANGLE - Math.PI / 2);
  return geometry;
}

function liquidGeometry() {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, BASE + 0.003)];
  for (let i = 0; i <= 24; i++) {
    const y = BASE + 0.003 + ((RIM - BASE) * i) / 24;
    pts.push(new THREE.Vector2(fitR(y), y));
  }
  return new THREE.LatheGeometry(pts, 64);
}

/** Distance from the axis to a faceted wall of radius `r` (at the corners) at lathe angle `phi`. */
function facetR(r: number, phi: number) {
  const step = (Math.PI * 2) / SIDES;
  const local = (((phi % step) + step) % step) - step / 2;
  return (r * Math.cos(Math.PI / SIDES)) / Math.cos(local);
}

/** Unit-radius foam head (1.25 tall at the centre) with a lumpy, irregular crown. */
function foamGeometry() {
  const profile = [
    [1, 0],
    [1, 0.8],
    [0.95, 0.97],
    [0.8, 1.1],
    [0.55, 1.19],
    [0.28, 1.24],
    [0, 1.25],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const geometry = new THREE.LatheGeometry(profile, 64);
  const pos = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = pos.getY(i);
    if (y < 0.75) continue;
    const a = Math.atan2(z, x);
    const r = Math.hypot(x, z);
    // Integer angular frequencies keep the lathe seam closed.
    const bump = Math.sin(a * 7 + r * 5) * Math.sin(r * 11 + 1.3) * 0.07 + Math.sin(a * 3 - r * 4) * 0.04 + Math.sin(a * 13 + r * 17) * 0.018;
    pos.setY(i, y + bump * smooth(0.75, 1.05, y));
  }
  geometry.computeVertexNormals();
  return geometry;
}

function radialTexture(stops: [number, string][]) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const GLASS_VERTEX = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  varying float vY;
  varying float vAngle;
  void main() {
    vNormalV = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    vY = position.y;
    vAngle = atan(position.z, position.x);
    gl_Position = projectionMatrix * mv;
  }
`;

const GLASS_FRAGMENT = /* glsl */ `
  uniform float uLevel;
  uniform float uFrost;
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  varying float vY;
  varying float vAngle;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    vec3 n = normalize(vNormalV);
    vec3 v = normalize(-vViewPos);
    float ndv = abs(dot(n, v));
    float fresnel = pow(1.0 - ndv, 2.2);
    // Moss-tinted mug glass (the site's --color-moss family): a light tint in
    // the body, deep sumi-green where the wall turns edge-on, so the mug
    // reads as an inked outline against the paper instead of vanishing.
    vec3 tint = vec3(0.58, 0.7, 0.6);
    vec3 edge = vec3(0.1, 0.15, 0.12);
    vec3 color = mix(tint, edge, clamp(fresnel * 1.5, 0.0, 1.0));
    float alpha = 0.04 + fresnel * 0.72;
    // Softbox reflections: each flat facet lights up as one clean band.
    float band = smoothstep(0.34, 0.42, n.x) * (1.0 - smoothstep(0.58, 0.7, n.x));
    float band2 = smoothstep(-0.82, -0.76, n.x) * (1.0 - smoothstep(-0.68, -0.6, n.x));
    float spec = band * 0.9 + band2 * 0.45;
    color = mix(color, vec3(1.0), spec);
    alpha += spec * 0.55;
    // Cold mist where the beer is, speckled so it reads as condensation.
    float speck = hash(floor(vec2(vAngle * 70.0, vY * 90.0)));
    float frost = uFrost * (1.0 - smoothstep(uLevel - 0.06, uLevel + 0.02, vY)) * step(0.26, vY);
    color = mix(color, vec3(0.93, 0.97, 0.95), frost * 0.35);
    alpha += frost * (0.04 + speck * 0.07);
    // Heavy base and rolled lip read as thicker, darker glass.
    float base = 1.0 - smoothstep(0.18, 0.26, vY);
    float lip = smoothstep(${(RIM - 0.03).toFixed(2)}, ${RIM.toFixed(2)}, vY);
    color = mix(color, edge * 1.6, base * 0.35);
    alpha += base * 0.28 + lip * 0.5;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.95));
  }
`;

const LIQUID_VERTEX = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  varying float vY;
  varying float vAngle;
  void main() {
    vNormalV = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    vY = position.y;
    vAngle = atan(position.z, position.x);
    gl_Position = projectionMatrix * mv;
  }
`;

const LIQUID_FRAGMENT = /* glsl */ `
  uniform float uLevel;
  uniform float uTime;
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  varying float vY;
  varying float vAngle;
  void main() {
    if (vY > uLevel) discard;
    vec3 n = normalize(vNormalV);
    vec3 v = normalize(-vViewPos);
    float fresnel = pow(1.0 - abs(dot(n, v)), 2.0);
    float depth = clamp((vY - ${BASE.toFixed(2)}) / max(uLevel - ${BASE.toFixed(2)}, 0.001), 0.0, 1.0);
    vec3 deep = vec3(0.66, 0.28, 0.01);
    vec3 gold = vec3(1.0, 0.72, 0.1);
    vec3 color = mix(deep, gold, pow(depth, 0.75));
    // Backlit edges glow; the core stays rich and dark.
    color = mix(color, vec3(1.0, 0.82, 0.3), fresnel * 0.45);
    color *= 0.93 + 0.07 * fresnel;
    color += 0.012 * sin(vAngle * 24.0 + vY * 3.0 + uTime * 0.6);
    gl_FragColor = vec4(color, 0.96);
  }
`;

const STREAM_VERTEX = /* glsl */ `
  uniform float uBottom;
  uniform float uTop;
  uniform float uTime;
  varying float vY;
  varying float vAngle;
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  void main() {
    vec3 p = position;
    float y = mix(uBottom, uTop, p.y);
    // Narrows as it falls, and wobbles a little like a real pour.
    float width = 0.045 * mix(0.68, 1.0, clamp((y - uBottom) / max(uTop - uBottom, 0.001), 0.0, 1.0));
    p.xz *= width;
    p.x += sin(y * 7.0 - uTime * 9.0) * 0.008;
    p.y = y;
    vY = y;
    vAngle = atan(position.z, position.x);
    vNormalV = normalize(normalMatrix * vec3(position.x, 0.0, position.z));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const STREAM_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uFade0;
  uniform float uFade1;
  varying float vY;
  varying float vAngle;
  varying vec3 vNormalV;
  varying vec3 vViewPos;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormalV), normalize(-vViewPos))), 1.5);
    vec3 color = mix(vec3(0.94, 0.6, 0.13), vec3(1.0, 0.87, 0.48), fresnel);
    color += 0.035 * (0.5 + 0.5 * sin(vY * 14.0 + uTime * 16.0 + vAngle * 1.5));
    float alpha = (0.8 + 0.18 * fresnel) * (1.0 - smoothstep(uFade0, uFade1, vY));
    gl_FragColor = vec4(color, alpha);
  }
`;

interface BeerMugProps {
  position: [number, number, number];
  scale?: number;
  reducedMotion: boolean;
}

export default function BeerMug({ position, scale = 1, reducedMotion }: BeerMugProps) {
  const { gl, invalidate } = useThree();
  const get = useThree((s) => s.get);
  const visible = useRef(false);

  const assets = useMemo(() => {
    const stream = new THREE.CylinderGeometry(1, 1, 1, 14, 40, true);
    stream.translate(0, 0.5, 0);
    return {
      glass: glassGeometry(),
      handle: handleGeometry(),
      liquid: liquidGeometry(),
      foam: foamGeometry(),
      surface: new THREE.CircleGeometry(1, 64).rotateX(-Math.PI / 2),
      stream,
      bubble: new THREE.SphereGeometry(1, 8, 6),
      droplet: new THREE.SphereGeometry(1, 10, 8),
      shadow: radialTexture([
        [0, "rgba(46,30,12,0.42)"],
        [0.55, "rgba(46,30,12,0.16)"],
        [1, "rgba(46,30,12,0)"],
      ]),
      caustic: radialTexture([
        [0, "rgba(255,176,52,0.75)"],
        [0.45, "rgba(240,140,30,0.28)"],
        [1, "rgba(240,140,30,0)"],
      ]),
    };
  }, []);

  useEffect(
    () => () => {
      for (const asset of Object.values(assets)) asset.dispose();
    },
    [assets],
  );

  const uniforms = useMemo(
    () => ({
      glass: { uLevel: { value: BASE }, uFrost: { value: 0 } },
      liquid: { uLevel: { value: BASE }, uTime: { value: 0 } },
      stream: {
        uBottom: { value: STREAM_TOP },
        uTop: { value: STREAM_TOP },
        uTime: { value: 0 },
        uFade0: { value: RIM + 0.3 },
        uFade1: { value: STREAM_TOP },
      },
    }),
    [],
  );

  const bubbles = useMemo(() => {
    const rand = mulberry32(7);
    // Most bubbles rise in a few nucleation columns, like a real pint; the
    // rest drift up anywhere in the glass.
    const columns = Array.from({ length: 5 }, () => ({ a: rand() * Math.PI * 2, rf: 0.25 + rand() * 0.6 }));
    return Array.from({ length: BUBBLES }, (_, i) => {
      const column = i < 55 ? columns[i % columns.length] : null;
      return {
        a: column ? column.a : rand() * Math.PI * 2,
        rf: column ? column.rf : rand() * 0.9,
        speed: 0.28 + rand() * 0.22,
        phase: rand(),
        size: 0.009 + rand() * 0.011,
        swirl: column ? 0 : rand() * 2 - 1,
      };
    });
  }, []);

  const droplets = useMemo(() => {
    const rand = mulberry32(21);
    return Array.from({ length: DROPLETS }, (_, i) => ({
      a: rand() * Math.PI * 2,
      y: 0.24 + rand() * (LIQUID_FULL + 0.2 - 0.24),
      size: 0.009 + rand() * rand() * 0.02,
      threshold: rand() * 0.85,
      runner: i < 6,
      runSpeed: 0.05 + rand() * 0.06,
    }));
  }, []);

  const glassMaterial = useRef<THREE.ShaderMaterial>(null);
  const liquidMaterial = useRef<THREE.ShaderMaterial>(null);
  const streamMesh = useRef<THREE.Mesh>(null);
  const streamMaterial = useRef<THREE.ShaderMaterial>(null);
  const liquidMesh = useRef<THREE.Mesh>(null);
  const surfaceMesh = useRef<THREE.Mesh>(null);
  const foamMesh = useRef<THREE.Mesh>(null);
  const causticMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const bubbleMesh = useRef<THREE.InstancedMesh>(null);
  const dropletMesh = useRef<THREE.InstancedMesh>(null);

  const state = useRef({
    phase: "empty" as Phase,
    t: 0,
    time: 0,
    level: BASE,
    foam: 0,
    chill: 0,
    agitation: 0,
    bottom: STREAM_TOP,
    top: STREAM_TOP,
    from: { level: BASE, foam: 0, chill: 0 },
  });

  // Pour when the scene scrolls into view; keep rendering only while visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) invalidate();
      },
      { threshold: 0.3 },
    );
    observer.observe(gl.domElement);
    return () => observer.disconnect();
  }, [gl, invalidate]);

  // Reduced motion: a finished, settled pint and no animation.
  useEffect(() => {
    if (!reducedMotion) return;
    Object.assign(state.current, { phase: "full", level: LIQUID_FULL, foam: FOAM_FULL, chill: 1, agitation: 0 });
    invalidate();
  }, [invalidate, reducedMotion]);

  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const quaternion = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const size = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, rawDelta) => {
    const s = state.current;
    const dt = Math.min(rawDelta, 1 / 20);

    if (!reducedMotion) {
      s.time += dt;
      s.t += dt;
      switch (s.phase) {
        case "empty":
          if (visible.current && s.t > 0.6) {
            s.phase = "pour";
            s.t = 0;
          }
          break;
        case "pour": {
          const p = clamp01(s.t / POUR);
          s.level = BASE + (LIQUID_FULL - 0.06 - BASE) * easeOut(p);
          s.foam = FOAM_POURING * smooth(0.06, 0.7, p);
          s.chill = Math.max(s.chill, smooth(0.25, 1, p) * 0.6);
          s.agitation = 1;
          const surface = s.level + s.foam;
          s.bottom = THREE.MathUtils.lerp(STREAM_TOP, surface, easeOut(clamp01(s.t / 0.28)));
          s.top = p < 0.9 ? STREAM_TOP : THREE.MathUtils.lerp(STREAM_TOP, surface, easeInOut((p - 0.9) / 0.1));
          if (p >= 1) {
            s.phase = "settle";
            s.t = 0;
          }
          break;
        }
        case "settle": {
          const q = clamp01(s.t / SETTLE);
          s.level = THREE.MathUtils.lerp(LIQUID_FULL - 0.06, LIQUID_FULL, easeOut(q));
          s.foam = THREE.MathUtils.lerp(FOAM_POURING, FOAM_FULL, easeOut(q));
          s.chill = THREE.MathUtils.lerp(0.6, 1, q);
          s.agitation = 1 - q;
          if (q >= 1) s.phase = "full";
          break;
        }
        case "drain": {
          const q = easeInOut(clamp01(s.t / DRAIN));
          s.level = THREE.MathUtils.lerp(s.from.level, BASE, q);
          s.foam = THREE.MathUtils.lerp(s.from.foam, 0, q);
          s.chill = THREE.MathUtils.lerp(s.from.chill, 0.2, q);
          s.agitation = 0.4;
          if (q >= 1) {
            s.phase = "empty";
            // Refill sooner than the first pour.
            s.t = 0.25;
          }
          break;
        }
        case "full":
          s.agitation = 0;
          break;
      }
    }

    // Glass, beer and foam.
    if (glassMaterial.current) {
      glassMaterial.current.uniforms.uLevel.value = s.level + s.foam * 0.8;
      glassMaterial.current.uniforms.uFrost.value = s.chill;
    }
    if (liquidMaterial.current) {
      liquidMaterial.current.uniforms.uLevel.value = s.level;
      liquidMaterial.current.uniforms.uTime.value = s.time;
    }
    const hasBeer = s.level > BASE + 0.004;
    if (liquidMesh.current) liquidMesh.current.visible = hasBeer;
    if (surfaceMesh.current) {
      surfaceMesh.current.visible = hasBeer;
      surfaceMesh.current.position.y = s.level;
      const r = fitR(s.level) - 0.002;
      surfaceMesh.current.scale.set(r, 1, r);
    }
    if (foamMesh.current) {
      foamMesh.current.visible = s.foam > 0.004;
      foamMesh.current.position.y = s.level - 0.01;
      const r = fitR(s.level + s.foam * 0.5);
      foamMesh.current.scale.set(r, Math.max(s.foam, 0.001) / 1.25, r);
    }
    if (causticMaterial.current) causticMaterial.current.opacity = 0.55 * clamp01((s.level - BASE) / (LIQUID_FULL - BASE));

    // Pour stream.
    if (streamMesh.current) {
      const pouring = s.phase === "pour" && s.top - s.bottom > 0.01;
      streamMesh.current.visible = pouring;
      const u = streamMaterial.current?.uniforms;
      if (u) {
        u.uBottom.value = s.bottom;
        u.uTop.value = s.top;
        u.uTime.value = s.time;
      }
    }

    // Bubbles rise from the base to the surface and loop.
    const bubbleInstances = bubbleMesh.current;
    if (bubbleInstances) {
      const height = s.level - BASE - 0.02;
      bubbles.forEach((b, i) => {
        let scaleValue = 0;
        if (height > 0.03) {
          const speed = b.speed * (1 + s.agitation * 1.4);
          const y = BASE + 0.02 + ((s.time * speed + b.phase * height) % height);
          const a = b.a + s.time * 0.3 * b.swirl;
          const r = (fitR(y) - 0.03) * b.rf;
          vec.set(Math.cos(a) * r + Math.sin(s.time * 4 + b.phase * 20) * 0.006, y, Math.sin(a) * r);
          scaleValue = b.size * (0.55 + 0.45 * ((y - BASE) / (RIM - BASE))) * (1 - smooth(s.level - 0.06, s.level, y));
        }
        size.setScalar(scaleValue);
        matrix.compose(vec, quaternion.identity(), size);
        bubbleInstances.setMatrixAt(i, matrix);
      });
      bubbleInstances.instanceMatrix.needsUpdate = true;
    }

    // Condensation beads form where the glass is cold; a few run down.
    const dropletInstances = dropletMesh.current;
    if (dropletInstances) {
      const coldLine = s.level + s.foam * 0.6 + 0.04;
      droplets.forEach((d, i) => {
        let y = d.y;
        if (d.runner && s.chill > 0.8) {
          const span = d.y - 0.22;
          y = d.y - ((s.time * d.runSpeed) % span);
        }
        const formed = smooth(d.threshold, d.threshold + 0.15, s.chill) * (y < coldLine ? 1 : 0);
        // d.a is a lathe angle; sit each bead flat on its facet.
        const step = (Math.PI * 2) / SIDES;
        const facet = (Math.floor(d.a / step) + 0.5) * step;
        const r = facetR(outerR(y), d.a) + 0.003;
        vec.set(Math.sin(d.a) * r, y, Math.cos(d.a) * r);
        quaternion.setFromEuler(euler.set(0, facet - Math.PI / 2, 0));
        size.set(d.size * 0.45, d.size * (d.runner ? 1.6 : 1.2), d.size).multiplyScalar(formed);
        matrix.compose(vec, quaternion, size);
        dropletInstances.setMatrixAt(i, matrix);
      });
      dropletInstances.instanceMatrix.needsUpdate = true;
    }

    if (!reducedMotion && visible.current) invalidate();
  });

  const refill = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (reducedMotion) return;
    const s = state.current;
    if (s.phase === "full" || s.phase === "settle") {
      s.from = { level: s.level, foam: s.foam, chill: s.chill };
      s.phase = "drain";
      s.t = 0;
      invalidate();
    }
  };

  // Swap the canvas cursor to a pointer over the glass, restoring whatever
  // the canvas had (grab / default) afterwards.
  const setPointer = (over: boolean) => {
    const canvas = get().gl.domElement;
    if (over) {
      canvas.dataset.cursor = canvas.style.cursor;
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = canvas.dataset.cursor ?? "";
    }
  };
  const noRaycast = () => null;

  return (
    <group position={position} scale={scale}>
      {/* Coaster, contact shadow and the amber light the beer throws. */}
      <mesh position={[0, 0.018, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.92, 0.92, 0.036, 64]} />
        <meshStandardMaterial color="#b3301a" roughness={0.9} envMapIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.0365, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.76, 0.8, 72]} />
        <meshBasicMaterial color="#f2ede3" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.02, 0.038, 0.02]} rotation={[-Math.PI / 2, 0, 0]} raycast={noRaycast}>
        <planeGeometry args={[1.7, 1.7]} />
        <meshBasicMaterial map={assets.shadow} transparent depthWrite={false} />
      </mesh>
      <mesh position={[-0.34, 0.039, -0.28]} rotation={[-Math.PI / 2, 0, 0]} raycast={noRaycast}>
        <planeGeometry args={[1.45, 1.45]} />
        <meshBasicMaterial ref={causticMaterial} map={assets.caustic} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <group
        position={[0, 0.036, 0]}
        onClick={refill}
        onPointerOver={(event) => {
          event.stopPropagation();
          setPointer(true);
        }}
        onPointerOut={() => setPointer(false)}
      >
        {/* Opaque foam first, then the translucent layers inside-out. */}
        <mesh ref={foamMesh} geometry={assets.foam} visible={false}>
          <meshStandardMaterial color="#f4e7c9" roughness={0.95} emissive="#3d3322" emissiveIntensity={0.08} />
        </mesh>
        <mesh ref={liquidMesh} geometry={assets.liquid} renderOrder={1} visible={false}>
          <shaderMaterial
            ref={liquidMaterial}
            vertexShader={LIQUID_VERTEX}
            fragmentShader={LIQUID_FRAGMENT}
            uniforms={uniforms.liquid}
            transparent
            depthWrite={false}
          />
        </mesh>
        <mesh ref={surfaceMesh} geometry={assets.surface} renderOrder={1} visible={false} raycast={noRaycast}>
          <meshBasicMaterial color="#f6b44a" transparent opacity={0.92} depthWrite={false} />
        </mesh>
        <instancedMesh ref={bubbleMesh} args={[assets.bubble, undefined, BUBBLES]} renderOrder={2} raycast={noRaycast} frustumCulled={false}>
          <meshBasicMaterial color="#fff3d6" transparent opacity={0.62} depthWrite={false} />
        </instancedMesh>
        <mesh ref={streamMesh} geometry={assets.stream} renderOrder={2} visible={false} raycast={noRaycast} frustumCulled={false}>
          <shaderMaterial
            ref={streamMaterial}
            vertexShader={STREAM_VERTEX}
            fragmentShader={STREAM_FRAGMENT}
            uniforms={uniforms.stream}
            transparent
            depthWrite={false}
          />
        </mesh>
        <mesh geometry={assets.glass} renderOrder={3}>
          <shaderMaterial
            ref={glassMaterial}
            vertexShader={GLASS_VERTEX}
            fragmentShader={GLASS_FRAGMENT}
            uniforms={uniforms.glass}
            transparent
            depthWrite={false}
          />
        </mesh>
        {/* Same uniforms object as the body, so both update together. */}
        <mesh geometry={assets.handle} renderOrder={3}>
          <shaderMaterial
            vertexShader={GLASS_VERTEX}
            fragmentShader={GLASS_FRAGMENT}
            uniforms={uniforms.glass}
            transparent
            depthWrite={false}
          />
        </mesh>
        <instancedMesh ref={dropletMesh} args={[assets.droplet, undefined, DROPLETS]} renderOrder={4} raycast={noRaycast} frustumCulled={false}>
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.38} roughness={0.02} clearcoat={1} envMapIntensity={2.6} depthWrite={false} />
        </instancedMesh>
      </group>
    </group>
  );
}
