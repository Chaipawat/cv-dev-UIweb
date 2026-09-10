import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function ShowcaseHero() {
  return (
    <PageContainer className="pt-20">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">
          02 / Showcase
        </div>
      </Reveal>
      <Reveal delay={0.07}>
        <h1 className="m-0 mt-[26px] font-display text-[clamp(44px,7vw,100px)] font-normal leading-[0.96] tracking-[-0.045em]">
          Selected showcase
        </h1>
      </Reveal>
      <Reveal delay={0.14}>
        <p className="m-0 mt-6 max-w-[52ch] text-lg text-foreground-secondary">
          Interfaces, mobile experiences and product workflows built across real-world
          projects.
        </p>
      </Reveal>
    </PageContainer>
  );
}
