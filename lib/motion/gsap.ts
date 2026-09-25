import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Client-only module: import from "use client" components.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const EASE = "power3.out";
/** Matches --ease-editorial, cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE_EDITORIAL = "expo.out";

/** Media conditions every kinetic effect is evaluated against. */
export const MOTION_QUERIES = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

export type MotionConditions = { [K in keyof typeof MOTION_QUERIES]: boolean };

export { gsap, ScrollTrigger, useGSAP };
