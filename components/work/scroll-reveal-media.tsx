"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion/use-media-query";

interface ScrollRevealMediaProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reserves the media's full layout, then uncovers it as it crosses the lower
 * viewport. The title/date above remain readable first; reduced motion gets
 * the final static state immediately.
 */
export default function ScrollRevealMedia({ children, className }: ScrollRevealMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 54%"],
  });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.35, 0.72, 1]);
  const ruleScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={prefersReducedMotion ? undefined : { clipPath, y, scale, opacity }}
        className="origin-top will-change-[clip-path,transform,opacity]"
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden="true"
        style={prefersReducedMotion ? { scaleX: 1 } : { scaleX: ruleScale }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
      />
    </div>
  );
}
