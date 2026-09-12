import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import ProjectPreview from "@/components/shared/project-preview";
import Reveal from "@/components/shared/reveal";

// Matches the approved design reference exactly (per product-owner decision).
const webProject = { name: "Broadcast UI Web Extension", tech: "React · Next.js · TypeScript · REST API" };
const mobileProject = { name: "Cross-platform Mobile App", tech: "React Native · Vision Camera · REST API" };

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
        <Reveal>
          <Link href="/work" className="group block">
            <ProjectPreview
              variant="panel"
              className="aspect-[16/11] h-auto transition-colors duration-[320ms] group-hover:border-border-strong"
            >
              <span className="absolute left-4 top-4 rounded-full border border-border bg-background px-[9px] py-[5px] font-mono text-[10px] tracking-[0.16em] text-foreground-muted">
                RECONSTRUCTED UI
              </span>
            </ProjectPreview>
            <div className="mt-[22px] flex items-baseline justify-between gap-4 border-b border-border pb-3.5">
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent">WEB APP</span>
              <span className="font-mono text-xs text-foreground-muted">01 / 02</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h2 className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em] text-foreground">
                {webProject.name}
              </h2>
              <span className="text-lg text-foreground-secondary" aria-hidden="true">
                →
              </span>
            </div>
            <div className="mt-2.5 font-mono text-xs text-foreground-muted">{webProject.tech}</div>
          </Link>
        </Reveal>

        <Reveal delay={0.07}>
          <Link href="/work" className="group block">
            <ProjectPreview
              variant="device"
              className="aspect-[16/11] h-auto transition-colors duration-[320ms] group-hover:border-border-strong"
            >
              <span className="absolute left-4 top-4 rounded-full border border-border bg-background px-[9px] py-[5px] font-mono text-[10px] tracking-[0.16em] text-foreground-muted">
                DEVICE MOCKUP
              </span>
            </ProjectPreview>
            <div className="mt-[22px] flex items-baseline justify-between gap-4 border-b border-border pb-3.5">
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent">MOBILE APP</span>
              <span className="font-mono text-xs text-foreground-muted">02 / 02</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <h2 className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-medium tracking-[-0.03em] text-foreground">
                {mobileProject.name}
              </h2>
              <span className="text-lg text-foreground-secondary" aria-hidden="true">
                →
              </span>
            </div>
            <div className="mt-2.5 font-mono text-xs text-foreground-muted">{mobileProject.tech}</div>
          </Link>
        </Reveal>
      </div>
    </PageContainer>
  );
}
