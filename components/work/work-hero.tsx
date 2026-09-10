import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function WorkHero() {
  return (
    <PageContainer className="pt-20">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">
          03 / Work
        </div>
      </Reveal>
      <Reveal delay={0.07}>
        <h1 className="m-0 mt-[26px] max-w-[14ch] font-display text-[clamp(44px,7vw,100px)] font-normal leading-[0.96] tracking-[-0.045em]">
          Experience built through products.
        </h1>
      </Reveal>
      <Reveal delay={0.14}>
        <p className="m-0 mt-6 max-w-[50ch] text-lg text-foreground-secondary">
          From maintaining inherited systems to building modern web, AI and mobile
          experiences.
        </p>
      </Reveal>
    </PageContainer>
  );
}
