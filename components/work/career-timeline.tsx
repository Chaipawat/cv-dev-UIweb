"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import PageContainer from "@/components/layout/page-container";
import EditorialButton from "@/components/shared/editorial-button";
import { TIMELINE } from "@/data/timeline";
import { CONTACT_CV_URL } from "@/data/contact";
import { cn } from "@/lib/utils";

export default function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  // Reduced motion: track scroll position directly instead of smoothing it
  // with a spring, so the rail never lags behind the user's own scrolling.
  const spring = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const progress = prefersReducedMotion ? scrollYProgress : spring;
  const railWidth = useTransform(progress, (v) => `${Math.round(Math.max(0, Math.min(1, v)) * 100)}%`);
  const lineHeight = useTransform(progress, (v) => `calc(${Math.round(Math.max(0, Math.min(1, v)) * 100)}% - 12px)`);

  const [pct, setPct] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setPct(Math.round(Math.max(0, Math.min(1, v)) * 100)));

  return (
    <PageContainer className="pb-[110px]">
      <div ref={containerRef} className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr] md:gap-10">
        <div>
          <div className="sticky top-[112px]">
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">STAGE</div>
            <div className="font-display text-[clamp(18px,2vw,24px)] font-medium leading-[1.15] tracking-[-0.025em] text-foreground">
              {TIMELINE[Math.min(active, TIMELINE.length - 1)].stage}
            </div>
            <div className="mt-5 h-px overflow-hidden bg-border">
              <motion.div className="h-px bg-accent" style={{ width: railWidth }} />
            </div>
            <div className="mt-3 font-mono text-[10px] tracking-[0.18em] text-foreground-muted">
              {pct}% — {active + 1} / {TIMELINE.length}
            </div>
          </div>
        </div>

        <div className="relative pl-[34px]">
          <div className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-border" />
          <motion.div className="absolute left-[5px] top-1.5 w-px bg-accent" style={{ height: lineHeight }} />

          {TIMELINE.map((node, i) => (
            <motion.div
              key={node.title}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              className="relative pb-[88px]"
              animate={{ opacity: i <= active ? 1 : 0.6, y: i <= active ? 0 : 12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={cn(
                  "absolute -left-[34px] top-1.5 h-[11px] w-[11px] rounded-full border transition-colors duration-[320ms]",
                  i <= active ? "border-accent" : "border-border",
                  i === active ? "bg-accent shadow-[0_0_0_4px_rgba(124,156,255,0.16)]" : "bg-background"
                )}
              />
              <div className="flex flex-wrap items-center gap-3.5">
                <span
                  className={cn(
                    "rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] transition-colors duration-[320ms]",
                    i === active ? "border-accent-border text-accent" : "border-border text-foreground-secondary"
                  )}
                >
                  {node.time}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">{node.kind}</span>
              </div>

              <h2 className="m-0 mt-5 font-display text-[clamp(26px,4vw,54px)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground">
                {node.title}
              </h2>
              <div className="mt-3 text-base text-foreground-secondary">{node.org}</div>
              {node.note ? (
                <div className="mt-1.5 font-mono text-xs text-foreground-muted">{node.note}</div>
              ) : null}

              <div className="mt-[34px] grid grid-cols-1 border-t border-border sm:grid-cols-2">
                {node.records.map((r) => (
                  <div
                    key={r.name}
                    className="border-b border-border py-5 pr-5 transition-colors duration-[180ms] hover:bg-surface"
                  >
                    <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-foreground-muted">
                      {r.tag}
                    </div>
                    <div className="font-display text-base font-medium leading-[1.35] text-foreground">
                      {r.name}
                    </div>
                    <div className="mt-3 font-mono text-[11.5px] text-accent">{r.tech}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-[30px]">
            <div>
              <div className="font-display text-[17px] font-medium text-foreground">Full professional details</div>
              <div className="mt-1.5 text-[13.5px] text-foreground-muted">
                Responsibilities, references and dates live in the CV.
              </div>
            </div>
            <EditorialButton
              as="a"
              href={CONTACT_CV_URL || "/contact"}
              {...(CONTACT_CV_URL ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {CONTACT_CV_URL ? "View CV" : "Request CV"} <span aria-hidden="true">→</span>
            </EditorialButton>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
