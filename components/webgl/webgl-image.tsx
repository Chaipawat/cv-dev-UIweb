"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { MOTION_QUERIES } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

// three + R3F live in their own chunk and are only fetched when the
// enhancement actually runs.
const HeroScene = dynamic(() => import("@/components/webgl/hero-scene"), { ssr: false });

interface WebGLImageProps {
  /** object-position equivalent of the static image (0..1 from top-left). */
  focus?: [number, number];
  /**
   * Extra classes for the layer. The shader already renders the ink/paper
   * duotone, so an `.ink-duotone` image needs none.
   */
  className?: string;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Progressive WebGL layer for a next/image. Place it next to the <Image>
 * inside the same positioned box: it reuses the image the browser already
 * loaded as its texture, and the static image is only hidden (CSS `:has()`
 * in globals.css) once the first WebGL frame is on screen. Nothing runs
 * when reduced motion is requested
 * or WebGL is unavailable, and a lost context falls back to the image.
 */
export default function WebGLImage({ focus, className }: WebGLImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<{ source: HTMLImageElement; frame: HTMLElement; intensity: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const frame = ref.current?.parentElement;
    const source = frame?.querySelector("img");
    if (!frame || !source || failed) return;

    const motion = window.matchMedia(MOTION_QUERIES.motion);
    const desktop = window.matchMedia(MOTION_QUERIES.desktop);
    let cancelled = false;

    const start = () => {
      if (!motion.matches || !supportsWebGL()) return;
      source
        .decode()
        .then(() => {
          if (!cancelled && motion.matches) setScene({ source, frame, intensity: desktop.matches ? 1 : 0.55 });
        })
        .catch(() => {});
    };
    const stop = () => {
      setReady(false);
      setScene(null);
    };
    const onMotionChange = () => (motion.matches ? start() : stop());

    start();
    motion.addEventListener("change", onMotionChange);
    return () => {
      cancelled = true;
      motion.removeEventListener("change", onMotionChange);
      stop();
    };
  }, [failed]);

  const onReady = useCallback(() => setReady(true), []);
  const onFail = useCallback(() => {
    setFailed(true);
    setReady(false);
    setScene(null);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-webgl-layer={ready ? "on" : "off"}
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {scene ? (
        <HeroScene
          source={scene.source}
          frame={scene.frame}
          focus={focus}
          intensity={scene.intensity}
          onReady={onReady}
          onFail={onFail}
        />
      ) : null}
    </div>
  );
}
