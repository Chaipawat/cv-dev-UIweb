import { portfolio } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const { profile } = portfolio;

/**
 * Small-team context: giant headcount figures with the front-end seat marked
 * as Ryu's, followed by the scope he owned and the backend boundary.
 */
export default function ProjectTeam({ project }: { project: Project }) {
  const team = project.team;
  if (!team) return null;

  const seats = [
    { n: team.frontend, label: "FRONTEND", me: true },
    { n: team.backend, label: "BACKEND", me: false },
    { n: team.manager, label: "MANAGER", me: false },
  ].filter((s): s is { n: number; label: string; me: boolean } => Boolean(s.n));

  return (
    <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="grid grid-cols-3 border-t border-border lg:col-span-6">
        {seats.map((seat, i) => (
          <div key={seat.label} className={cn("pt-5", i > 0 && "border-l border-border pl-[clamp(12px,2vw,24px)]")}>
            <div
              className={cn(
                "font-display text-[clamp(64px,11vw,156px)] leading-[0.8] tracking-[-0.01em]",
                seat.me ? "text-accent" : "text-foreground-muted"
              )}
            >
              {seat.n}
            </div>
            <div className="mt-4 font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">
              {seat.label}
              {seat.me ? <span className="text-accent-text"> — ME</span> : null}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8">
        <p className="m-0 text-[17px] leading-[1.6] text-foreground">{profile.teamScope}</p>
        <p className="m-0 text-[14px] leading-[1.6] text-foreground-secondary">{profile.backendBoundary}</p>
      </div>
    </div>
  );
}
