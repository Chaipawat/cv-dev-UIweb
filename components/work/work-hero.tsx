import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function WorkHero() {
  return (
    <PageContainer className="pb-[72px] pt-[132px]">
      <Reveal as="section">
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
          <span>PAGE 03 — WORK</span>
          <span>2020 — PRESENT</span>
        </div>

        <h1 className="m-0 mt-12 font-display text-[clamp(44px,8.4vw,124px)] uppercase leading-[0.9] tracking-[-0.01em] text-foreground">
          Work
          <br />
          Timeline
        </h1>
        <p className="m-0 mt-[30px] max-w-[460px] text-base leading-[1.6] text-foreground-secondary">
          A timeline of work, learning, and projects.
        </p>
      </Reveal>
    </PageContainer>
  );
}
