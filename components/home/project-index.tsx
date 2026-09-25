import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import SectionLabel from "@/components/shared/section-label";
import ProjectHoverPreview, { type PreviewItem } from "@/components/home/project-hover-preview";
import { PROJECTS, formatProjectPeriod, formatStack } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

const previews: PreviewItem[] = PROJECTS.map((p, i) => ({
  slug: p.slug,
  number: pad(i + 1),
  title: p.shortTitle ?? p.title,
  type: p.shortType,
  period: formatProjectPeriod(p.period),
  stack: formatStack(p.stack, 4),
  focus: p.focus ?? [],
}));

/**
 * Text-only archive of every project. Rows slide and pick up the accent on
 * hover/focus; on desktop a preview plate trails the cursor over them.
 */
export default function ProjectIndex() {
  return (
    <section aria-labelledby="project-index-heading">
      <PageContainer className="pb-[clamp(96px,12vw,180px)]">
        <SectionLabel index="02" label="PROJECT INDEX" trailing={`${pad(PROJECTS.length)} PROJECTS`} />
        <h2 id="project-index-heading" className="sr-only">
          Project index
        </h2>

        <div
          aria-hidden="true"
          className="hidden grid-cols-[56px_1fr_180px_120px_32px] gap-6 pt-6 pb-3 font-mono text-[10px] tracking-[0.2em] text-foreground-muted md:grid"
        >
          <span>NO.</span>
          <span>PROJECT</span>
          <span>TYPE</span>
          <span>YEAR</span>
          <span />
        </div>

        <MotionScope effect="index">
        <ProjectHoverPreview items={previews}>
        <ol className="m-0 list-none border-t border-border p-0 md:border-t-0">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} data-m="index-row" data-preview={p.slug} data-reveal="fade" className="border-b border-border md:first:border-t">
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[36px_1fr_auto] items-baseline gap-x-4 gap-y-1 py-[clamp(14px,1.8vw,22px)] md:grid-cols-[56px_1fr_180px_120px_32px] md:gap-6"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-foreground-muted transition-colors duration-[180ms] group-hover:text-accent">
                  {pad(i + 1)}
                </span>
                <span className="col-span-2 min-w-0 font-display text-[clamp(22px,3.2vw,44px)] md:col-span-1 font-semibold uppercase leading-[1] tracking-[-0.04em] text-foreground transition-[color,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-hover:text-accent">
                  {p.title}
                </span>
                <span className="col-start-2 row-start-2 font-mono text-[11px] uppercase md:row-start-auto tracking-[0.16em] text-foreground-secondary md:col-start-auto">
                  {p.shortType}
                </span>
                <span className="col-start-3 row-start-2 text-right font-mono text-[11px] tracking-[0.12em] text-foreground-muted md:col-start-auto md:row-start-auto md:text-left">
                  {formatProjectPeriod(p.period)}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-right text-lg text-foreground-muted transition-[color,transform] duration-[320ms] group-hover:translate-x-1 group-hover:text-accent md:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        </ProjectHoverPreview>
        </MotionScope>
      </PageContainer>
    </section>
  );
}
