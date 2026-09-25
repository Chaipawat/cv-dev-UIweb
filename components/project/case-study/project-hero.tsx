import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import ProjectMediaHero from "@/components/project/project-media-hero";
import Reveal from "@/components/shared/reveal";
import { PROJECTS, formatProjectPeriod, getProjectNumber } from "@/data/projects";
import type { CSSProperties } from "react";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

// Alternate lines step inward so the title reads as an asymmetric block, not a centered headline.
const LINE_INDENT = ["", "pl-[clamp(20px,9vw,150px)]", "pl-[clamp(8px,3vw,48px)]", "pl-[clamp(28px,13vw,220px)]"];

export default function ProjectHero({ project }: { project: Project }) {
  const words = project.title.split(" ");
  const years = formatProjectPeriod(project.period);

  return (
    <header>
      <PageContainer className="pt-[132px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-border pb-[22px] font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
          <Link href="/work" className="transition-colors duration-[180ms] hover:text-accent">
            ← WORK
          </Link>
          <span>
            CASE STUDY {pad(getProjectNumber(project.slug))} / {pad(PROJECTS.length)}
          </span>
        </div>

        <MotionScope effect="caseHero">
          <h1 className="m-0 mt-[clamp(36px,6vw,72px)] break-words font-display text-[clamp(44px,12.5vw,184px)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-foreground">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} data-m="case-line" className="block will-change-transform">
                <span data-intro="clip" style={{ "--i": i } as CSSProperties} className={cn("block", LINE_INDENT[i % LINE_INDENT.length])}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </MotionScope>

        <Reveal delay={0.07}>
          <div className="mt-[clamp(32px,5vw,64px)] grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <p className="m-0 font-mono text-[12px] uppercase leading-[1.7] tracking-[0.18em] text-accent md:col-span-5">
              {project.type}
            </p>
            <dl className="m-0 grid grid-cols-2 gap-6 md:col-span-6 md:col-start-7 md:grid-cols-3">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">YEAR</dt>
                <dd className="m-0 mt-2 font-display text-[clamp(18px,1.8vw,24px)] font-medium tracking-[-0.02em] text-foreground">
                  {years}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">ROLE</dt>
                <dd className="m-0 mt-2 font-display text-[clamp(18px,1.8vw,24px)] font-medium tracking-[-0.02em] text-foreground">
                  {project.role}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </PageContainer>

      <PageContainer className="mt-[clamp(48px,7vw,96px)]">
        <ProjectMediaHero project={project} />
      </PageContainer>
    </header>
  );
}
