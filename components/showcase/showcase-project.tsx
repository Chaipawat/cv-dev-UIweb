import Link from "next/link";
import ProjectCover, { hasProjectCover } from "@/components/project/project-cover";
import { CATEGORY_LABELS, formatProjectPeriod, formatStack } from "@/data/projects";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ShowcaseProjectProps {
  project: Project;
  number: string;
}

/**
 * Typographic plate used until a project has sanitized screenshots: the
 * project's own name, focus and platforms set as a cover rather than a mock UI.
 */
function TypeCover({ project, number }: ShowcaseProjectProps) {
  const name = project.shortTitle ?? project.title;
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-[clamp(18px,2.4vw,32px)]">
      {/* Hairline grid gives the plate structure without imitating an interface. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-[0.2em] -right-[0.04em] font-display text-[clamp(140px,20vw,300px)] font-extrabold leading-none tracking-[-0.07em] text-accent/10 transition-colors duration-[550ms] group-hover:text-accent/20"
      >
        {number}
      </span>

      <div className="relative flex flex-wrap gap-2">
        {(project.platforms ?? [project.shortType]).map((p) => (
          <span
            key={p}
            className="border border-border-strong bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-secondary"
          >
            {p}
          </span>
        ))}
      </div>

      <div className="relative">
        <p className="m-0 font-display text-[clamp(34px,5vw,76px)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-foreground transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
          {name}
        </p>
        {project.focus?.length ? (
          <p className="m-0 mt-3 font-serif text-[clamp(18px,1.8vw,24px)] italic leading-tight text-accent">
            {project.focus.slice(0, 3).join(" / ")}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** One project in the showcase: cover plate, metadata and a link to its case study. */
export default function ShowcaseProject({ project, number }: ShowcaseProjectProps) {
  const hasScreens = hasProjectCover(project);
  return (
    <article aria-labelledby={`sp-${project.slug}`}>
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          className={cn(
            "relative aspect-[16/11] overflow-hidden border border-border bg-surface transition-colors duration-[320ms] group-hover:border-accent-border",
            hasScreens && "flex items-center justify-center p-[6%]"
          )}
        >
          {hasScreens ? <ProjectCover project={project} composition="layered" /> : <TypeCover project={project} number={number} />}
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[10.5px] tracking-[0.2em] text-foreground-muted">
          <span>
            <span className="text-accent">{number}</span> — {project.categories.map((c) => CATEGORY_LABELS[c]).join(" / ").toUpperCase()}
          </span>
          <span>{formatProjectPeriod(project.period)}</span>
        </div>

        <h2
          id={`sp-${project.slug}`}
          className="m-0 mt-3 font-display text-[clamp(24px,2.6vw,36px)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground transition-colors duration-[180ms] group-hover:text-accent"
        >
          {project.title}
        </h2>
        <p className="m-0 mt-3 line-clamp-3 max-w-[560px] text-[15px] leading-[1.6] text-foreground-secondary">
          {project.description}
        </p>

        <dl className="m-0 mt-5 grid grid-cols-[88px_1fr] gap-x-4 gap-y-2 border-t border-border pt-4 text-[13.5px] leading-snug">
          <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">ROLE</dt>
          <dd className="m-0 text-foreground">{project.role}</dd>
          <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">STACK</dt>
          <dd className="m-0 text-foreground-secondary">{formatStack(project.stack, 5)}</dd>
        </dl>

        <span className="mt-5 inline-block border-b border-border-strong pb-1 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary transition-colors duration-[180ms] group-hover:border-accent group-hover:text-accent">
          VIEW CASE STUDY →
        </span>
      </Link>
    </article>
  );
}
