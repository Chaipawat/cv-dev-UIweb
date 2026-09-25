"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Single place where prefers-reduced-motion is honored for every Framer
 * Motion animation in the app (Reveal, Showcase gallery, Work timeline).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
