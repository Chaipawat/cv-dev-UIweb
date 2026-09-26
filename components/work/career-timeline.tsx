"use client";

import Link from "next/link";
import { BriefcaseBusiness, CodeXml, GraduationCap, PanelsTopLeft, type LucideIcon } from "lucide-react";
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
import CertificateEvidence from "@/components/work/certificate-evidence";
import ProjectTimelineEvidence from "@/components/work/project-timeline-evidence";
import { TIMELINE, type TimelineNode } from "@/data/timeline";
import { cn } from "@/lib/utils";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const STAGE_ICONS: Record<TimelineNode["id"], LucideIcon> = {
  education: GraduationCap,
  internship: BriefcaseBusiness,
  professional: CodeXml,
  project: PanelsTopLeft,
};

export default function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeNode = TIMELINE[Math.min(active, TIMELINE.length - 1)];
  const ActiveIcon = STAGE_ICONS[activeNode.id];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  // Reduced motion: track scroll position directly instead of smoothing it
  // with a spring, so the rail never lags behind the user's own scrolling.
  const spring = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const progress = prefersReducedMotion ? scrollYProgress : spring;
  // Rails scale instead of resizing (no layout per frame); the percentage is
  // a motion value rendered straight into the DOM, so scrolling never
  // re-renders the timeline.
  const railScale = useTransform(progress, clamp01);
  const pctText = useTransform(progress, (v) => `${Math.round(clamp01(v) * 100)}%`);

  // Active stage = the last node whose top has crossed the viewport centre.
  // Derived from positions, so fast scrolls and jumps never leave it stale.
  useMotionValueEvent(scrollYProgress, "change", () => {
    const mid = window.innerHeight / 2;
    let next = 0;
    nodeRefs.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top < mid) next = i;
    });
    setActive(next);
  });

  return (
    <PageContainer className="pb-[110px]">
      <div ref={containerRef} className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr] md:gap-10">
        <div>
          <div className="sticky top-[112px]">
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">STAGE</div>
            <motion.div
              key={activeNode.id}
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: -8, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-accent-border bg-accent-soft text-accent-text"
            >
              <ActiveIcon size={20} strokeWidth={1.5} aria-hidden="true" />
            </motion.div>
            <div className="font-body text-[clamp(18px,2vw,24px)] font-medium leading-[1.15] tracking-[-0.025em] text-foreground">
              {activeNode.stage}
            </div>
            <div className="mt-5 h-px overflow-hidden bg-border">
              <motion.div className="h-px origin-left bg-accent" style={{ scaleX: railScale }} />
            </div>
            <div className="mt-3 font-mono text-[10px] tracking-[0.18em] text-foreground-secondary">
              <motion.span>{pctText}</motion.span> — {active + 1} / {TIMELINE.length}
            </div>
          </div>
        </div>

        <div className="relative pl-[34px]">
          <div className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-border" />
          <motion.div
            className="absolute bottom-1.5 left-[5px] top-1.5 w-px origin-top bg-accent"
            style={{ scaleY: railScale }}
          />

          {TIMELINE.map((node, i) => {
            const StageIcon = STAGE_ICONS[node.id];
            return (
              <motion.div
              key={node.title}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="relative pb-[88px]"
              animate={{ opacity: i <= active ? 1 : 0.6, y: i <= active ? 0 : 12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[45px] -top-1 inline-flex h-8 w-8 items-center justify-center border bg-background transition-colors duration-[320ms]",
                  i <= active ? "border-accent" : "border-border",
                  i === active ? "text-accent-text shadow-[0_0_0_4px_rgba(229,72,42,0.12)]" : "text-foreground-secondary"
                )}
              >
                <StageIcon size={14} strokeWidth={1.6} />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                <div className="flex flex-wrap items-center gap-3.5">
                  <span
                    className={cn(
                      "rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] transition-colors duration-[320ms]",
                      i === active ? "border-accent-border text-accent-text" : "border-border text-foreground-secondary"
                    )}
                  >
                    {node.time}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{node.kind}</span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-foreground-secondary">
                  STEP {String(i + 1).padStart(2, "0")} / {String(TIMELINE.length).padStart(2, "0")}
                </span>
              </div>

              <h2 className="m-0 mt-5 font-body text-[clamp(26px,4vw,54px)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground">
                {node.title}
              </h2>
              <div className="mt-3 text-base text-foreground-secondary">{node.org}</div>
              {node.note ? (
                <div className="mt-1.5 font-mono text-xs text-foreground-secondary">{node.note}</div>
              ) : null}

              {node.evidence ? <CertificateEvidence evidence={node.evidence} /> : null}
              {node.projectEvidence ? <ProjectTimelineEvidence evidence={node.projectEvidence} /> : null}

              {node.records.length ? (
                <div
                  className={cn(
                    "grid grid-cols-1 border-t border-border",
                    node.records.length > 1 && "sm:grid-cols-2",
                    node.evidence || node.projectEvidence ? "mt-8" : "mt-[34px]",
                  )}
                >
                  {node.records.map((r) => {
                  const body = (
                    <>
                      <div className="mb-3 font-mono text-[10px] tracking-[0.18em] text-foreground-secondary">
                        {r.tag}
                      </div>
                      <div className="flex items-baseline justify-between gap-3 font-body text-base font-medium leading-[1.35] text-foreground">
                        {r.name}
                        {r.href ? (
                          <span
                            aria-hidden="true"
                            className="text-foreground-secondary transition-colors duration-[180ms] group-hover:text-accent-text"
                          >
                            →
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 font-mono text-[11.5px] text-accent-text">{r.tech}</div>
                    </>
                  );
                  const cellClass =
                    "group block border-b border-border py-5 pr-5 transition-colors duration-[180ms] hover:bg-surface";
                  return r.href ? (
                    <Link key={r.name} href={r.href} className={cellClass}>
                      {body}
                    </Link>
                  ) : (
                    <div key={r.name} className={cellClass}>
                      {body}
                    </div>
                  );
                  })}
                </div>
              ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
