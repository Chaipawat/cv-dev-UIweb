import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function HomeHero() {
  return (
    <PageContainer className="pb-10 pt-[72px]">
      <Reveal>
        <div className="mb-[34px] font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">
          Software Developer / Thailand
        </div>
      </Reveal>

      <Reveal delay={0.07}>
        <h1 className="m-0 max-w-[15ch] text-balance font-display text-[clamp(48px,7.6vw,108px)] font-normal leading-[0.94] tracking-[-0.045em]">
          Building interfaces for <span className="text-accent">real products.</span>
        </h1>
      </Reveal>

      <div className="mt-11 flex flex-wrap items-end justify-between gap-10">
        <Reveal delay={0.14} className="max-w-[46ch]">
          <p className="m-0 text-lg leading-[1.6] text-foreground-secondary">
            Software Developer focused on web and mobile experiences, from interface
            implementation to production integrations.
          </p>
        </Reveal>

        <Reveal delay={0.21}>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href="/showcase"
              className="group flex items-center gap-2.5 rounded-full bg-foreground px-[26px] py-[15px] text-[15px] font-medium text-cream transition-[background,gap] duration-[250ms] hover:gap-4 hover:bg-accent"
            >
              <span>View Showcase</span>
              <span>→</span>
            </Link>
            <a
              href="https://github.com/Chaipawat"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 rounded-full border border-border bg-surface px-[26px] py-[15px] text-[15px] font-medium text-foreground transition-[border-color,gap] duration-[250ms] hover:gap-3.5 hover:border-foreground"
            >
              <span>GitHub</span>
              <span className="text-[13px]">↗</span>
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.28}>
        <div className="mt-14 flex flex-wrap border-y border-border">
          <div className="flex-1 basis-[200px] border-r border-border py-5 pr-6 font-mono text-xs uppercase tracking-[0.16em] text-foreground-muted last:border-r-0">
            4+ Years Experience
          </div>
          <div className="flex-1 basis-[200px] border-r border-border px-6 py-5 font-mono text-xs uppercase tracking-[0.16em] text-foreground-muted last:border-r-0">
            Web / Mobile
          </div>
          <div className="flex-1 basis-[200px] px-6 py-5 font-mono text-xs uppercase tracking-[0.16em] text-foreground-muted">
            Front-end / Product UI
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
