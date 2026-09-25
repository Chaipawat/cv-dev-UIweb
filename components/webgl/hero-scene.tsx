"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, type RefObject } from "react";
import { NoToneMapping, getConsoleFunction, setConsoleFunction } from "three";
import DistortedImage, { type PointerInput } from "@/components/webgl/distorted-image";
import { MOTION_QUERIES } from "@/lib/motion/gsap";

// R3F 9.x (latest stable) still builds `new THREE.Clock()` in every Canvas
// store, which three r183+ flags as deprecated. Our frame loop uses its own
// THREE.Timer, so drop exactly that one message and pass everything else
// through. Remove once R3F ships with Timer (v10).
const CLOCK_DEPRECATION = "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.";
if (typeof window !== "undefined") {
  const previous = getConsoleFunction();
  setConsoleFunction((type: "log" | "warn" | "error", message: string, ...params: unknown[]) => {
    if (type === "warn" && message === CLOCK_DEPRECATION) return;
    if (previous) return previous(type, message, ...params);
    const trace = params[0] as { isStackTrace?: boolean; getError?: (m: string) => Error } | undefined;
    if (trace?.isStackTrace && trace.getError) console[type](trace.getError(message));
    else console[type](message, ...params);
  });
}

export interface HeroSceneProps {
  source: HTMLImageElement;
  /** Element whose box the image fills; pointer coordinates are mapped to it. */
  frame: HTMLElement;
  focus?: [number, number];
  intensity?: number;
  onReady: () => void;
  onFail: () => void;
}

/**
 * Wakes the demand-driven frame loop on scroll and pointer movement, but
 * only while the frame is on screen. Pointer is tracked on window so text
 * overlapping the image (the hero title) doesn't block the interaction.
 */
function Drivers({ frame, pointer }: { frame: HTMLElement; pointer: RefObject<PointerInput> }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) pointer.current.inside = false;
    });
    io.observe(frame);

    const onScroll = () => {
      if (visible) invalidate();
    };

    const finePointer = window.matchMedia(MOTION_QUERIES.finePointer).matches;
    const onMove = (e: PointerEvent) => {
      if (!visible || e.pointerType !== "mouse") return;
      const r = frame.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      if (!inside && !pointer.current.inside) return;
      pointer.current = { x, y, inside };
      invalidate();
    };
    const onLeave = () => {
      pointer.current.inside = false;
      invalidate();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [frame, pointer, invalidate]);

  return null;
}

/**
 * The one WebGL visual on the site: the hero portrait as a distorted plane.
 * Loaded lazily by WebGLImage; renders on demand only, with DPR capped.
 */
export default function HeroScene({ source, frame, focus, intensity, onReady, onFail }: HeroSceneProps) {
  const pointer = useRef<PointerInput>({ x: 0.5, y: 0.5, inside: false });
  // Same condition as the CSS `.ink-duotone`: without hover there is no way
  // to reveal colour, so touch devices get true colour at rest.
  const [restColor] = useState(() => (window.matchMedia("(hover: hover)").matches ? 0 : 1));

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      flat
      camera={{ fov: 35, position: [0, 0, 5] }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power", toneMapping: NoToneMapping }}
      resize={{ scroll: false }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFail, { once: true });
        // Wait one painted frame so the canvas never shows empty over the image.
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
    >
      <Drivers frame={frame} pointer={pointer} />
      <DistortedImage source={source} pointer={pointer} focus={focus} intensity={intensity} restColor={restColor} />
    </Canvas>
  );
}
