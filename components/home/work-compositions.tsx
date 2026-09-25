import Link from "next/link";
import ProjectCover, { hasProjectCover } from "@/components/project/project-cover";
import { formatProjectPeriod, formatStack } from "@/data/projects";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export interface CompositionProps {
  project: Project;
  /** "01 / 06" position within the selected set. */
  position: string;
}

const href = (p: Project) => `/work/${p.slug}` as const;

function focusOf(p: Project) {
  return p.focus ?? (p.features ?? p.responsibilities).slice(0, 3);
}

/* ---------- shared pieces ---------- */

function Kicker({ project, position, className, rule }: CompositionProps & { className?: string; rule?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary",
        className
      )}
    >
      <span>
        {position} <span className="text-accent-text">— {project.shortType.toUpperCase()}</span>
      </span>
      <span>{formatProjectPeriod(project.period)}</span>
      {rule ? <span data-m="rule" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-border" /> : null}
    </div>
  );
}

function Title({ project, className }: { project: Project; className?: string }) {
  const words = project.title.split(" ");
  const last = words.pop();
  return (
    <h3 data-reveal="clip" className={cn("m-0 font-display uppercase tracking-[-0.01em] text-foreground", className)}>
      <Link href={href(project)} className="group inline transition-colors duration-[320ms] hover:text-accent">
        {words.length ? `${words.join(" ")} ` : null}
        {/* Last word and arrow never split across lines. */}
        <span className="whitespace-nowrap">
          {last}
          <span
            aria-hidden="true"
            className="ml-[0.2em] inline-block text-[0.5em] align-middle text-foreground-muted transition-[color,transform] duration-[320ms] group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        </span>
      </Link>
    </h3>
  );
}

function Meta({ project, layout = "row", className }: { project: Project; layout?: "row" | "stack"; className?: string }) {
  const rows = [
    { k: "ROLE", v: project.role },
    { k: "FOCUS", v: focusOf(project).join(" · ") },
    { k: "STACK", v: formatStack(project.stack, 5) },
  ];
  return (
    <dl
      className={cn(
        "m-0 grid gap-x-8",
        layout === "row" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1",
        className
      )}
    >
      {rows.map((r) => (
        <div key={r.k} data-reveal="fade" className="border-t border-border py-3.5">
          <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{r.k}</dt>
          <dd className="m-0 mt-1.5 text-[14px] leading-[1.5] text-foreground-secondary">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Cover linked to the case study; hidden from the tab order (the title is the link). */
function CoverLink({ project, children, className }: { project: Project; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href(project)} tabIndex={-1} aria-hidden="true" data-reveal="wipe" className={cn("block", className)}>
      {children}
    </Link>
  );
}

/* ---------- 01: full-width hero composition ---------- */

export function FullWidthComposition({ project, position }: CompositionProps) {
  const [first, ...rest] = project.title.split(" ");
  return (
    <article data-m="project" data-variant="full">
      <Kicker project={project} position={position} rule className="pb-4" />
      <h3 className="m-0 mt-[clamp(20px,3vw,40px)] font-display text-[clamp(38px,11.5vw,176px)] uppercase leading-[0.84] tracking-[-0.01em] text-foreground">
        <Link href={href(project)} className="group block transition-colors duration-[320ms] hover:text-accent">
          <span data-reveal="clip" className="block origin-left">{first}</span>
          <span data-reveal="clip" className="block origin-left pl-[clamp(20px,14vw,260px)]">
            {rest.join(" ")}
            <span
              aria-hidden="true"
              className="ml-[0.15em] inline-block text-[0.4em] align-middle text-foreground-muted transition-[color,transform] duration-[320ms] group-hover:translate-x-2 group-hover:text-accent"
            >
              →
            </span>
          </span>
        </Link>
      </h3>
      {hasProjectCover(project) ? (
        <CoverLink project={project} className="mt-[clamp(32px,5vw,64px)]">
          <ProjectCover project={project} composition="layered" />
        </CoverLink>
      ) : null}
      <div className="mt-[clamp(28px,4vw,48px)] grid grid-cols-1 gap-8 lg:grid-cols-12">
        <p data-reveal="fade" className="m-0 max-w-[460px] text-[16px] leading-[1.6] text-foreground-secondary lg:col-span-4">
          {project.description}
        </p>
        <Meta project={project} className="lg:col-span-7 lg:col-start-6" />
      </div>
    </article>
  );
}

/* ---------- 02: large asymmetric composition ---------- */

export function AsymmetricComposition({ project, position }: CompositionProps) {
  const cover = hasProjectCover(project);
  return (
    <article data-m="project" data-variant="asymmetric" className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] lg:grid-cols-12 lg:gap-8">
      {cover ? (
        <CoverLink project={project} className="lg:col-span-8">
          <ProjectCover project={project} composition="browser" />
        </CoverLink>
      ) : project.features?.length ? (
        // No screenshot yet: the feature inventory holds the left edge as a mono column.
        <ul className="order-last m-0 hidden list-none flex-col justify-end border-l border-border p-0 pl-5 lg:order-none lg:col-span-3 lg:flex">
          {project.features.map((f) => (
            <li key={f} className="py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-secondary">
              {f}
            </li>
          ))}
        </ul>
      ) : null}
      <div className={cn("flex flex-col", cover ? "lg:col-span-4" : "lg:col-span-9 lg:col-start-4")}>
        <Kicker project={project} position={position} />
        <Title
          project={project}
          className={cn(
            "mt-5 leading-[0.88]",
            cover ? "text-[clamp(40px,5.6vw,84px)]" : "text-[clamp(44px,9vw,140px)] lg:text-right"
          )}
        />
        <p data-reveal="fade" className="m-0 mt-6 max-w-[460px] text-[15.5px] leading-[1.6] text-foreground-secondary lg:self-end">
          {project.description}
        </p>
        <Meta project={project} layout="stack" className={cn("mt-8", !cover && "lg:w-[60%] lg:self-end")} />
      </div>
    </article>
  );
}

/* ---------- 03: mobile-focused composition ---------- */

export function MobileComposition({ project, position }: CompositionProps) {
  const cover = hasProjectCover(project);
  const features = (project.features ?? []).slice(0, 5);
  return (
    <article data-m="project" data-variant="mobile" className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <Kicker project={project} position={position} />
        <Title project={project} className="mt-5 text-[clamp(44px,6.4vw,96px)] leading-[0.86]" />
        <p data-reveal="fade" className="m-0 mt-6 max-w-[420px] text-[15.5px] leading-[1.6] text-foreground-secondary">
          {project.description}
        </p>
        <Meta project={project} layout="stack" className="mt-8" />
      </div>
      <div className="md:col-span-6 md:col-start-7">
        {cover ? (
          <CoverLink project={project}>
            <ProjectCover project={project} composition="phones" />
          </CoverLink>
        ) : (
          <ul className="m-0 list-none border-t border-border p-0 md:mt-[clamp(40px,8vw,120px)]">
            {features.map((f, i) => (
              <li
                key={f}
                data-reveal="fade" className="flex items-baseline gap-4 border-b border-border py-[clamp(10px,1.4vw,18px)] font-serif text-[clamp(26px,3.4vw,48px)] italic leading-[1.05] text-foreground"
              >
                <span className="font-mono text-[10px] not-italic tracking-[0.2em] text-foreground-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/* ---------- 04: browser / extension composition ---------- */

export function ExtensionComposition({ project, position }: CompositionProps) {
  const cover = hasProjectCover(project);
  return (
    <article data-m="project" data-variant="extension">
      <div className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Kicker project={project} position={position} />
          <Title project={project} className="mt-5 text-[clamp(40px,7vw,104px)] leading-[0.86]" />
        </div>
        {project.context ? (
          <blockquote data-reveal="fade" className="m-0 border-l border-accent-border pl-6 font-serif text-[clamp(22px,2.6vw,36px)] italic leading-[1.2] text-foreground-secondary lg:col-span-5 lg:col-start-8 lg:mt-12">
            {project.context}
          </blockquote>
        ) : null}
      </div>

      {cover ? (
        <CoverLink project={project} className="mt-[clamp(32px,5vw,64px)] lg:ml-[16%]">
          <ProjectCover project={project} composition="browser" />
        </CoverLink>
      ) : null}

      <div className="mt-[clamp(28px,4vw,48px)] grid grid-cols-1 gap-8 lg:grid-cols-12">
        <p data-reveal="clip" className="m-0 font-mono text-[clamp(20px,2.8vw,40px)] font-medium uppercase leading-[1.1] tracking-[-0.02em] text-accent-text lg:col-span-5">
          {project.stack.join(" / ")}
        </p>
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-reveal="fade" className="m-0 text-[15.5px] leading-[1.6] text-foreground-secondary">{project.description}</p>
          <Meta project={project} layout="stack" className="mt-6" />
        </div>
      </div>
    </article>
  );
}

/* ---------- 05: small visual composition ---------- */

export function CompactComposition({ project, position }: CompositionProps) {
  const cover = hasProjectCover(project);
  return (
    <article data-m="project" data-variant="compact" className="grid grid-cols-1 gap-8 border-y border-border py-[clamp(28px,4vw,48px)] md:grid-cols-12">
      <div className="md:col-span-2">
        <Kicker project={project} position={position} className="md:flex-col md:gap-2" />
      </div>
      <div className="md:col-span-5">
        <Title project={project} className="text-[clamp(32px,4.4vw,64px)] leading-[0.92]" />
        <p data-reveal="fade" className="m-0 mt-5 max-w-[440px] text-[15px] leading-[1.6] text-foreground-secondary">{project.description}</p>
      </div>
      <div className="md:col-span-4 md:col-start-9">
        {cover ? (
          <CoverLink project={project}>
            <ProjectCover project={project} composition="phones" phones={2} />
          </CoverLink>
        ) : (
          <Meta project={project} layout="stack" />
        )}
      </div>
    </article>
  );
}

/* ---------- 06: personal project composition ---------- */

export function PersonalComposition({ project, position }: CompositionProps) {
  const cover = hasProjectCover(project);
  return (
    <article data-m="project" data-variant="personal" className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <Kicker project={project} position={position} />
        <p className="m-0 mt-5 font-mono text-[11px] tracking-[0.2em] text-accent-2">
          PERSONAL PROJECT{project.period.end === null ? " — ONGOING" : ""}
        </p>
        <p data-reveal="fade" className="m-0 mt-6 max-w-[380px] text-[15.5px] leading-[1.6] text-foreground-secondary">
          {project.description}
        </p>
        <Meta project={project} layout="stack" className="mt-8" />
      </div>
      <div className="order-first lg:order-none lg:col-span-7 lg:col-start-6">
        <h3 data-reveal="clip" className="m-0 font-serif text-[clamp(56px,14vw,216px)] font-normal italic leading-[0.85] tracking-[-0.02em] text-foreground lg:text-right">
          <Link href={href(project)} className="transition-colors duration-[320ms] hover:text-accent">
            {project.title}
            <span aria-hidden="true" className="ml-[0.1em] font-display text-[0.3em] not-italic text-foreground-muted">
              →
            </span>
          </Link>
        </h3>
        {cover ? (
          <CoverLink project={project} className="mt-[clamp(28px,4vw,48px)]">
            <ProjectCover project={project} composition="browser" />
          </CoverLink>
        ) : null}
      </div>
    </article>
  );
}
