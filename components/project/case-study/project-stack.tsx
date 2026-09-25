import type { Project } from "@/types/portfolio";

/** Stack as a large typographic run; backend familiarity kept visibly separate from it. */
export default function ProjectStack({ project }: { project: Project }) {
  return (
    <div>
      <ul className="m-0 flex list-none flex-wrap items-baseline gap-x-[0.35em] gap-y-1 p-0 font-display text-[clamp(30px,5.4vw,80px)] uppercase leading-[1] tracking-[-0.01em] text-foreground">
        {project.stack.map((tech, i) => (
          <li key={tech} className="min-w-0 max-w-full [overflow-wrap:anywhere]">
            {tech}
            {i < project.stack.length - 1 ? (
              <span className="ml-[0.35em] font-serif font-normal normal-case italic text-foreground-muted" aria-hidden="true">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      {project.backendFamiliarity ? (
        <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-2 border-t border-border pt-5 md:grid-cols-12 md:gap-8">
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary md:col-span-3">
            BACKEND FAMILIARITY
          </span>
          <span className="text-[14.5px] leading-[1.6] text-foreground-secondary md:col-span-9">
            {project.backendFamiliarity} — not backend ownership.
          </span>
        </div>
      ) : null}
    </div>
  );
}
