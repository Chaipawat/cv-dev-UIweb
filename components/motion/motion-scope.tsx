"use client";

import { useRef, type ReactNode } from "react";
import { MOTION_QUERIES, gsap, useGSAP, type MotionConditions } from "@/lib/motion/gsap";
import { EFFECTS, type EffectName } from "@/lib/motion/effects";
import { cn } from "@/lib/utils";

interface MotionScopeProps {
  effect: EffectName;
  children: ReactNode;
  className?: string;
}

/**
 * Client boundary that attaches one kinetic effect to server-rendered markup.
 * Targets are found by data attributes inside the scope. Effects only run
 * when reduced motion is not requested; everything is reverted on unmount
 * or when the media conditions change.
 *
 * `overflow-x: clip` keeps stretched/translated type from ever creating
 * horizontal scroll while leaving vertical sticky/pin behaviour intact.
 */
export default function MotionScope({ effect, children, className }: MotionScopeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES, (ctx) => {
        const conditions = ctx.conditions as MotionConditions;
        if (!conditions.motion) return;
        return EFFECTS[effect](root, conditions);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("overflow-x-clip", className)}>
      {children}
    </div>
  );
}
