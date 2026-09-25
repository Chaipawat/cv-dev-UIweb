"use client";

import { useRef, type CSSProperties } from "react";
import { MOTION_QUERIES, ScrollTrigger, gsap, useGSAP } from "@/lib/motion/gsap";
import { getVelocity } from "@/lib/motion/velocity";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Seconds per loop at rest. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * Marquee with a CSS loop as the no-JS baseline. With motion allowed, GSAP
 * takes over: scroll velocity speeds it up and scroll direction flips it,
 * easing back to its resting speed. Paused while off-screen; static under
 * prefers-reduced-motion. The phrase list is announced once via sr-only text.
 */
export default function Marquee({ items, duration = 48, reverse, className, itemClassName }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // Repeat enough that one half of the track is always wider than the viewport.
  const run = [...items, ...items, ...items];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const el = track.current;
        if (!el || !root.current) return;
        el.style.animation = "none";
        // Position integrated by hand (xPercent in [-50, 0)) so direction can
        // flip freely without fighting a repeating tween.
        const setX = gsap.quickSetter(el, "xPercent");
        const wrap = gsap.utils.wrap(-50, 0);
        const base = reverse ? 1 : -1; // -1 moves content left
        const restRate = 50 / duration; // xPercent per second at rest
        let x = reverse ? -50 : 0;
        let speed = 1;
        const tick = (_t: number, deltaMs: number) => {
          const v = getVelocity();
          const dir = v < -0.5 ? -1 : 1;
          const target = dir * (1 + Math.min(Math.abs(v) * 0.09, 5));
          speed += (target - speed) * 0.08;
          x = wrap(x + base * speed * restRate * (deltaMs / 1000));
          setX(x);
        };
        let on = false;
        const toggle = (active: boolean) => {
          if (active === on) return;
          on = active;
          if (active) gsap.ticker.add(tick);
          else gsap.ticker.remove(tick);
        };
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => toggle(self.isActive),
        });
        toggle(st.isActive);
        return () => {
          toggle(false);
          st.kill();
          el.style.animation = "";
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <span className="sr-only">{items.join(", ")}</span>
      <div
        ref={track}
        aria-hidden="true"
        className="marquee-track flex w-max will-change-transform"
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-none items-center">
            {run.map((item, i) => (
              <span key={`${copy}-${i}`} className={cn("flex flex-none items-center whitespace-nowrap", itemClassName)}>
                {item}
                <span className="px-[0.6em] text-accent">—</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
