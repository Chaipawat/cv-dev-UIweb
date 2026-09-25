import type { Project } from "@/types/portfolio";

/**
 * Feature highlights as editorial rows: serif numeral, display title, and the
 * description with its feature list in the right-hand column. Projects
 * without curated highlights fall back to a typographic run of features.
 */
export default function ProjectHighlights({ project }: { project: Project }) {
  if (project.highlights?.length) {
    return (
      <ol className="m-0 list-none p-0">
        {project.highlights.map((h, i) => (
          <li
            key={h.title}
            className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-t border-border py-[clamp(28px,4vw,52px)] md:grid-cols-12 md:gap-x-8"
          >
            <span className="font-serif text-[clamp(34px,4.4vw,64px)] italic leading-[0.9] text-accent md:col-span-1">
              {i + 1}
            </span>
            <h3 className="m-0 self-end font-display text-[clamp(26px,3.6vw,52px)] font-bold uppercase leading-[0.95] tracking-[-0.045em] text-foreground md:col-span-6">
              {h.title}
            </h3>
            <div className="col-span-2 md:col-span-5">
              <p className="m-0 text-[15px] leading-[1.65] text-foreground-secondary">{h.description}</p>
              <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
                {h.items.map((item) => (
                  <li key={item} className="before:mr-2 before:text-accent before:content-['/']">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (!project.features?.length) return null;
  return (
    <p className="m-0 font-display text-[clamp(26px,4vw,56px)] font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
      {project.features.map((f, i) => (
        <span key={f}>
          {f}
          {i < project.features!.length - 1 ? <span className="px-[0.25em] text-foreground-muted">/</span> : null}
        </span>
      ))}
    </p>
  );
}
