import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import ProjectPreview from "@/components/shared/project-preview";
import Reveal from "@/components/shared/reveal";
import { FEATURED_PROJECTS, formatStack } from "@/data/projects";
import type { Project } from "@/types/portfolio";

// Current two-up layout shows the lead web and lead mobile project; the full
// editorial selected-work section replaces this in the homepage redesign.
const webProject = FEATURED_PROJECTS.find((p) => !p.categories.includes("mobile"));
const mobileProject = FEATURED_PROJECTS.find((p) => p.categories.includes("mobile"));

const SELECTED = [
  webProject && { project: webProject, variant: "panel" as const, badge: "RECONSTRUCTED UI" },
  mobileProject && { project: mobileProject, variant: "device" as const, badge: "DEVICE MOCKUP" },
].filter((x): x is { project: Project; variant: "panel" | "device"; badge: string } => Boolean(x));

export default function SelectedWork() {
  return (
    <PageContainer className="pb-[110px]">
      <SectionLabel
        index="01"
        label="SELECTED WORK"
        trailing={
          <Link href="/work" className="transition-colors duration-[180ms] hover:text-accent">
            VIEW ALL WORK →
          </Link>
        }
      />
      <div className="mt-12 grid grid-cols-1 gap-[clamp(24px,4vw,56px)] md:grid-cols-2">
        {SELECTED.map(({ project, variant, badge }, i) => (
          <Reveal key={project.slug} delay={i * 0.07}>
            <Link href="/work" className="group block">
              <ProjectPreview
                variant={variant}
                className="aspect-[16/11] h-auto transition-colors duration-[320ms] group-hover:border-border-strong"
              >
                <span className="absolute left-4 top-4 rounded-full border border-border bg-background px-[9px] py-[5px] font-mono text-[10px] tracking-[0.16em] text-foreground-muted">
                  {badge}
                </span>
              </ProjectPreview>
              <div className="mt-[22px] flex items-baseline justify-between gap-4 border-b border-border pb-3.5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{project.type.toUpperCase()}</span>
                <span className="font-mono text-xs text-foreground-muted">
                  {String(i + 1).padStart(2, "0")} / {String(SELECTED.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <h2 className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em] text-foreground">
                  {project.title}
                </h2>
                <span className="text-lg text-foreground-secondary" aria-hidden="true">
                  →
                </span>
              </div>
              <div className="mt-2.5 font-mono text-xs text-foreground-muted">{formatStack(project.stack, 4)}</div>
            </Link>
          </Reveal>
        ))}
      </div>
    </PageContainer>
  );
}
