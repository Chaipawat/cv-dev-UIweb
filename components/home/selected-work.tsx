import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/shared/section-heading";
import ShotPlaceholder from "@/components/shared/shot-placeholder";
import Reveal from "@/components/shared/reveal";
import { PROJECTS } from "@/data/projects";

const zonepang = PROJECTS.find((p) => p.id === "zonepang")!;
const kumtone = PROJECTS.find((p) => p.id === "kumtone")!;

export default function SelectedWork() {
  return (
    <PageContainer className="pt-16 md:pt-20 lg:pt-24">
      <SectionHeading title="Selected work" index="[ 02 ]" />

      <Reveal>
        <div className="flex flex-wrap items-center gap-10 py-12 md:py-14 lg:py-16">
          <div className="min-w-[280px] flex-1 basis-[380px]">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              {zonepang.meta}
            </div>
            <h3 className="mt-[18px] font-display text-[clamp(30px,3.4vw,46px)] font-normal tracking-[-0.03em]">
              {zonepang.title}
            </h3>
            <p className="mt-4 max-w-[42ch] text-foreground-secondary">{zonepang.desc}</p>
            <div className="mt-[22px] font-mono text-xs tracking-[0.06em] text-foreground-muted">
              {zonepang.tech.join(" / ")}
            </div>
            <Link
              href="/showcase"
              className="group mt-[30px] inline-flex items-center gap-2.5 border-b border-accent-soft pb-[5px] text-[15px] font-medium text-accent transition-[gap,border-color] duration-[250ms] hover:gap-4 hover:border-accent"
            >
              <span>View Project</span>
              <span>→</span>
            </Link>
          </div>
          <div className="group min-w-[280px] flex-1 basis-[520px] overflow-hidden rounded-2xl border border-border">
            <ShotPlaceholder
              label={zonepang.shot}
              className="h-[420px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap-reverse items-center gap-10 border-t border-border py-12 md:py-14 lg:py-16">
          <div className="group min-w-[280px] flex-1 basis-[520px] overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex h-[460px] items-center gap-5 p-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
              <div className="h-full w-[190px] rounded-[26px] border border-border bg-background p-2">
                <ShotPlaceholder label="Camera Screen" className="h-full rounded-[19px]" />
              </div>
              <ShotPlaceholder label="Film Selector Detail" className="h-[78%] flex-1 rounded-xl" />
            </div>
          </div>
          <div className="min-w-[280px] flex-1 basis-[380px]">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              {kumtone.meta}
            </div>
            <h3 className="mt-[18px] font-display text-[clamp(30px,3.4vw,46px)] font-normal tracking-[-0.03em]">
              {kumtone.title}
            </h3>
            <p className="mt-4 max-w-[42ch] text-foreground-secondary">{kumtone.desc}</p>
            <div className="mt-[22px] font-mono text-xs tracking-[0.06em] text-foreground-muted">
              {kumtone.tech.join(" / ")}
            </div>
            <Link
              href="/showcase"
              className="group mt-[30px] inline-flex items-center gap-2.5 border-b border-accent-soft pb-[5px] text-[15px] font-medium text-accent transition-[gap,border-color] duration-[250ms] hover:gap-4 hover:border-accent"
            >
              <span>View Project</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
