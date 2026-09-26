import { GalleryVerticalEnd } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import PageIcon from "@/components/shared/page-icon";
import Reveal from "@/components/shared/reveal";
import type { Project } from "@/types/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

/** Facts are computed from the projects actually shown, so the counts always match the grid. */
export default function ShowcaseHero({ projects }: { projects: Project[] }) {
  const years = projects.flatMap((p) => [p.period.start, p.period.end ?? p.period.start]);
  const RANGE = `${Math.min(...years)}—${Math.max(...years)}`;
  const company = projects.filter((p) => p.experienceId).length;
  const facts = [
    { k: "PROJECTS", v: pad(projects.length) },
    { k: "PERIOD", v: RANGE },
    { k: "PRODUCT WORK", v: `${pad(company)} company · ${pad(projects.length - company)} personal` },
  ];

  return (
    <PageContainer className="pt-[132px]">
      <Reveal as="section" hero>
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
          <span className="inline-flex items-center gap-3">
            <PageIcon icon={GalleryVerticalEnd} />
            PAGE 02 — SHOWCASE
          </span>
          <span>SELECTED PROJECTS {RANGE}</span>
        </div>

        <h1 className="m-0 mt-12 font-display text-[clamp(50px,9.6vw,142px)] uppercase leading-[0.88] tracking-[-0.01em] text-foreground">
          Showcase
        </h1>

        <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
          <p className="m-0 font-serif text-[clamp(24px,2.4vw,32px)] italic leading-[1.2] text-accent md:col-span-5">
            Real products, built and shipped.
          </p>
          <div className="md:col-span-6 md:col-start-7">
            <p className="m-0 max-w-[520px] text-[15.5px] leading-[1.65] text-foreground-secondary">
              Web platforms, mobile apps, LINE LIFF booking and admin systems — each with the role I played, the
              team around it and the stack it ran on. Open any project for the full case study.
            </p>
            <dl className="m-0 mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.k} className="last:col-span-2 sm:last:col-span-1">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{f.k}</dt>
                  <dd className="m-0 mt-1.5 text-[14px] leading-snug text-foreground">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
