"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { getVelocity } from "@/lib/motion/velocity";
import { distortFragment, distortVertex } from "@/components/webgl/shaders/distort";

/** Live cursor state written by the scene's listeners, read every frame. */
export interface PointerInput {
  /** 0..1 within the image, origin bottom-left. */
  x: number;
  y: number;
  inside: boolean;
}

interface DistortedImageProps {
  /** Already-decoded image to use as the texture (no second download). */
  source: HTMLImageElement;
  pointer: RefObject<PointerInput>;
  /** object-position equivalent in CSS terms (0..1 from top-left). */
  focus?: [number, number];
  /** Scales every deformation — lower on touch / small screens. */
  intensity?: number;
}

/** Plane is drawn slightly larger than its box so bend and tilt never expose an edge. */
const OVERSCAN = 1.08;
const MAX_TILT = 0.08;
const SETTLE = 0.0005;
const MAX_TEXTURE = 1024;
// Scratch vector reused every frame.
const scratch = new THREE.Vector2();

/**
 * Image plane with cursor bulge, depth tilt and scroll-velocity bend. All
 * inputs are eased toward their targets and the frame loop only keeps
 * requesting frames while something is still moving, so at rest it costs
 * nothing.
 */
export default function DistortedImage({ source, pointer, focus = [0.5, 0.5], intensity = 1 }: DistortedImageProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { viewport, invalidate } = useThree();

  // Uploading the <img> directly can fail (INVALID_VALUE) when its decoded
  // pixel size differs from naturalWidth/Height, so copy it into a canvas of
  // explicit size first — which also caps the texture resolution.
  const texture = useMemo(() => {
    const scale = Math.min(1, MAX_TEXTURE / Math.max(source.naturalWidth, source.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
    canvas.getContext("2d")?.drawImage(source, 0, 0, canvas.width, canvas.height);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  }, [source]);

  useEffect(() => () => texture.dispose(), [texture]);

  // Created once; every later change goes through the material ref.
  const [initialUniforms] = useState(() => ({
    uTexture: { value: null as THREE.Texture | null },
    uCover: { value: new THREE.Vector2(1, 1) },
    uFocus: { value: new THREE.Vector2(0.5, 0.5) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uVelocity: { value: 0 },
    uTime: { value: 0 },
  }));

  const [fx, fy] = focus;
  // Inputs are applied in the frame loop; just request one when they change.
  useEffect(() => invalidate(), [texture, fx, fy, invalidate]);

  useFrame((state, delta) => {
    const m = mesh.current;
    const u = material.current?.uniforms;
    if (!m || !u) return;
    const p = pointer.current;
    const k = 1 - Math.exp(-delta * 7); // frame-rate independent easing

    u.uTexture.value = texture;
    u.uFocus.value.set(fx, 1 - fy);

    // Cover-fit, then shrink by the overscan so the resting frame matches
    // the static <img> exactly.
    const planeAspect = state.viewport.width / state.viewport.height;
    const imageAspect = source.naturalWidth / source.naturalHeight || 1;
    if (planeAspect > imageAspect) u.uCover.value.set(1 / OVERSCAN, imageAspect / planeAspect / OVERSCAN);
    else u.uCover.value.set(planeAspect / imageAspect / OVERSCAN, 1 / OVERSCAN);

    const hoverTarget = p.inside ? intensity : 0;
    const velocityTarget = gsap.utils.clamp(-1, 1, getVelocity() / 45) * intensity;

    const dh = hoverTarget - u.uHover.value;
    const dv = velocityTarget - u.uVelocity.value;
    u.uHover.value += dh * k;
    u.uVelocity.value += dv * k;
    if (p.inside) u.uMouse.value.lerp(scratch.set(p.x, p.y), k);
    u.uTime.value = state.clock.elapsedTime;

    const hover: number = u.uHover.value;
    const mouse: THREE.Vector2 = u.uMouse.value;
    m.rotation.y += ((mouse.x - 0.5) * MAX_TILT * 2 * hover - m.rotation.y) * k;
    m.rotation.x += (-(mouse.y - 0.5) * MAX_TILT * 2 * hover - m.rotation.x) * k;

    const moving =
      Math.abs(dh) > SETTLE ||
      Math.abs(dv) > SETTLE ||
      Math.abs(u.uVelocity.value) > SETTLE ||
      Math.abs(m.rotation.x) + Math.abs(m.rotation.y) > SETTLE ||
      (p.inside && hover > SETTLE);
    if (moving) invalidate();
  });

  return (
    <mesh ref={mesh} scale={[viewport.width * OVERSCAN, viewport.height * OVERSCAN, 1]}>
      <planeGeometry args={[1, 1, 48, 48]} />
      <shaderMaterial
        ref={material}
        uniforms={initialUniforms}
        vertexShader={distortVertex}
        fragmentShader={distortFragment}
      />
    </mesh>
  );
}
