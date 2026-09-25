import Link from "next/link";
import type { CSSProperties } from "react";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import SectionLabel from "@/components/shared/section-label";
import { portfolio } from "@/data/portfolio";
import { getProjectBySlug } from "@/data/projects";

const { progression, experience } = portfolio;
const current = experience[0];

/**
 * Career progression as a staircase: each step moves further right and its
 * title grows, so scope reads as increasing without a chart. With motion on
 * desktop, a sticky year counter tracks the step being read and a rail fills
 * alongside — the list itself stays in normal flow so it never traps scroll.
 */
export default function ExperienceProgression() {
  const steps = progression.length;
  const first = progression[0];
  return (
    <section aria-labelledby="progression-heading">
      <PageContainer className="pb-[clamp(96px,12vw,180px)]">
        <SectionLabel
          index="03"
          label="EXPERIENCE PROGRESSION"
          trailing={`${current.company?.toUpperCase()} — ${current.periodLabel.toUpperCase()}`}
        />
        <h2 id="progression-heading" className="sr-only">
          Experience progression
        </h2>

        <MotionScope effect="progression" className="mt-[clamp(32px,5vw,64px)]">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <ol data-m="steps" className="m-0 list-none p-0 lg:col-span-12 lg:[.motion_&]:col-span-9">
              {progression.map((step, i) => {
                const projects = step.projectSlugs.map(getProjectBySlug).filter((p) => p !== undefined);
                // A step that is exactly one project (e.g. "Broadpang Extension") links its title instead of repeating the name.
                const titleProject = projects.length === 1 && projects[0].title === step.title ? projects[0] : null;
                const subLinks = titleProject ? [] : projects;
                // 0 → 1 across the steps; drives indent and type size.
                const t = steps > 1 ? i / (steps - 1) : 1;
                return (
                  <li
                    key={step.year + step.title}
                    data-m="step"
                    data-year={step.year}
                    data-shift={step.shift}
                    className="group/step border-t border-border py-[clamp(18px,2.4vw,32px)] first:border-t-0 first:pt-0 md:pl-[calc(var(--t)*30%)]"
                    style={{ "--t": t } as CSSProperties}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[11px] tracking-[0.2em]">
                      <span className="text-accent-text">{step.year}</span>
                      <span className="text-foreground-secondary">{step.shift.toUpperCase()}</span>
                      {i < steps - 1 ? (
                        <span className="text-foreground-muted" aria-hidden="true">
                          →
                        </span>
                      ) : null}
                    </div>
                    <div
                      className="mt-2 break-words font-display uppercase leading-[0.9] tracking-[-0.01em] text-foreground transition-colors duration-[550ms] group-data-[active]/step:text-accent"
                      style={{ fontSize: `clamp(${30 + t * 10}px, ${4.6 + t * 3.4}vw, ${64 + t * 64}px)` }}
                    >
                      {titleProject ? (
                        <Link href={`/work/${titleProject.slug}`} className="transition-colors duration-[320ms] hover:text-accent">
                          {step.title}
                        </Link>
                      ) : (
                        step.title
                      )}
                    </div>
                    {subLinks.length ? (
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] tracking-[0.14em]">
                        {subLinks.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/work/${p.slug}`}
                            className="text-foreground-secondary underline decoration-border-strong underline-offset-4 transition-colors duration-[180ms] hover:text-accent-text hover:decoration-accent"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {/* Sticky reading counter — an enhancement, so only shown once motion is running. */}
            <aside aria-hidden="true" className="hidden lg:col-span-3 lg:[.motion_&]:block">
              <div className="sticky top-[120px] flex gap-5">
                <div className="relative w-px self-stretch bg-border">
                  <span data-m="step-rail" className="absolute inset-0 block bg-accent" />
                </div>
                <div className="min-w-0 py-1">
                  <div data-m="step-count" className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">
                    01 / {String(steps).padStart(2, "0")}
                  </div>
                  <div className="overflow-hidden">
                    <div
                      data-m="step-year"
                      className="mt-3 font-display text-[clamp(40px,4vw,64px)] leading-[0.9] tracking-[-0.01em] text-foreground"
                    >
                      {first.year}
                    </div>
                  </div>
                  <div data-m="step-shift" className="mt-4 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.16em] text-foreground-secondary">
                    {first.shift}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </MotionScope>
      </PageContainer>
    </section>
  );
}
