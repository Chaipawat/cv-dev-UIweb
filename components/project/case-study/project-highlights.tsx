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
            <h3 className="m-0 self-end font-display text-[clamp(26px,3.6vw,52px)] uppercase leading-[0.95] tracking-[-0.005em] text-foreground md:col-span-6">
              {h.title}
            </h3>
            <div className="col-span-2 md:col-span-5">
              <p className="m-0 text-[15px] leading-[1.65] text-foreground-secondary">{h.description}</p>
              <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-secondary">
                {h.items.map((item) => (
                  <li key={item} className="before:mr-2 before:text-accent-text before:content-['/']">
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

  const features = project.features;
  if (!features?.length) return null;
  // A wrapping list, not inline spans: each feature is its own line box, so
  // the run breaks between features instead of overflowing the page.
  return (
    <ul className="m-0 flex list-none flex-wrap items-baseline gap-x-[0.3em] gap-y-1 p-0 font-body text-[clamp(26px,4vw,56px)] font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
      {features.map((f, i) => (
        <li key={f} className="min-w-0 max-w-full [overflow-wrap:anywhere]">
          {f}
          {i < features.length - 1 ? (
            <span className="ml-[0.3em] text-foreground-muted" aria-hidden="true">
              /
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
