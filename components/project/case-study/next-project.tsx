import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import { PROJECTS, formatProjectPeriod, getNextProject, getProjectNumber } from "@/data/projects";
import type { Project } from "@/types/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

/** Full-width typographic link to the following case study. */
export default function NextProject({ current }: { current: Project }) {
  const next = getNextProject(current.slug);

  return (
    <MotionScope effect="nextProject">
    <nav aria-label="Next project" className="border-t border-border">
      <Link href={`/work/${next.slug}`} className="group block py-[clamp(48px,8vw,112px)]">
        <PageContainer>
          <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
            <span>NEXT PROJECT</span>
            <span>
              {pad(getProjectNumber(next.slug))} / {pad(PROJECTS.length)}
            </span>
          </div>
          <div className="mt-[clamp(20px,3vw,36px)] flex items-end justify-between gap-6">
            <span data-m="next-title" className="min-w-0 break-words font-display text-[clamp(40px,9vw,136px)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] text-foreground transition-colors duration-[320ms] group-hover:text-accent">
              {next.title}
            </span>
            <span
              aria-hidden="true"
              className="flex-none font-display text-[clamp(32px,6vw,88px)] leading-none text-foreground-muted transition-[color,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-accent"
            >
              →
            </span>
          </div>
          <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-secondary">
            {next.type} — {formatProjectPeriod(next.period)}
          </div>
        </PageContainer>
      </Link>
    </nav>
    </MotionScope>
  );
}
