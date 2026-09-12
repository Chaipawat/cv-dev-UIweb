import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function ShowcaseHero() {
  return (
    <PageContainer className="pt-[132px]">
      <Reveal as="section">
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
          <span>PAGE 02 — SHOWCASE</span>
          <span>SKILL → INTERACTION → EVIDENCE</span>
        </div>

        <h1 className="m-0 mt-12 font-display text-[clamp(50px,9.6vw,142px)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em] text-foreground">
          Showcase
        </h1>

        <div className="mt-9 grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-2">
          <p className="m-0 font-serif text-[26px] italic leading-[1.3] text-foreground">
            Skills turned into real interfaces.
          </p>
          <p className="m-0 text-[15px] leading-[1.65] text-foreground-secondary">
            Explore how I apply frontend, mobile, integration, and development tools.
          </p>
        </div>
      </Reveal>
    </PageContainer>
  );
}
