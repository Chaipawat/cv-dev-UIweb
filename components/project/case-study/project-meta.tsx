import type { Project } from "@/types/portfolio";

function teamLines(team: NonNullable<Project["team"]>) {
  return [
    team.frontend ? `${team.frontend} Frontend` : null,
    team.backend ? `${team.backend} Backend` : null,
    team.manager ? `${team.manager} Manager` : null,
  ].filter((x): x is string => Boolean(x));
}

/** Hairline metadata strip: Team / Platform / Focus / Contribution / Category. */
export default function ProjectMeta({ project }: { project: Project }) {
  // Role and year already lead the hero, so the strip starts with team context.
  const rows = [
    project.team ? { k: "TEAM", v: teamLines(project.team) } : null,
    project.platforms?.length ? { k: "PLATFORM", v: project.platforms } : null,
    project.focus?.length ? { k: "FOCUS", v: project.focus } : null,
    project.contribution?.length ? { k: "CONTRIBUTION", v: project.contribution } : null,
    { k: "CATEGORY", v: project.categories.map((c) => (c === "liff" ? "LIFF" : c[0].toUpperCase() + c.slice(1))) },
  ].filter((x): x is { k: string; v: string[] } => Boolean(x));

  return (
    <dl className="m-0 grid grid-cols-1 gap-x-6 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      {rows.map((row) => (
        <div key={row.k} className="min-w-0 border-b border-border py-6 pr-4">
          <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{row.k}</dt>
          <dd className="m-0 mt-3 flex flex-col gap-1">
            {row.v.map((line) => (
              <span key={line} className="text-[14.5px] leading-[1.45] text-foreground">
                {line}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
