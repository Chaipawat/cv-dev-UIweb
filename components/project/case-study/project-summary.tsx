import type { Project } from "@/types/portfolio";

/** Large display summary, with context and confidentiality notes set in the margin. */
export default function ProjectSummary({ project }: { project: Project }) {
  const notes = [
    project.context,
    ...(project.notes ?? []),
    project.confidentiality?.publicDetails === false ? project.confidentiality.note : undefined,
  ].filter((x): x is string => Boolean(x));

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      <p className="m-0 font-body text-[clamp(24px,3.4vw,46px)] font-medium leading-[1.14] tracking-[-0.035em] text-foreground md:col-span-9">
        {project.description}
      </p>
      {notes.length ? (
        <ul className="m-0 flex list-none flex-col gap-4 p-0 md:col-span-3 md:mt-2">
          {notes.map((note) => (
            <li key={note} className="border-l border-accent-border pl-4 text-[13px] leading-[1.6] text-foreground-secondary">
              {note}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
