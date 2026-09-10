import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function ContactHero() {
  return (
    <PageContainer className="pt-20">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">
          04 / Contact
        </div>
      </Reveal>
      <Reveal delay={0.07}>
        <h1 className="m-0 mt-[26px] max-w-[11ch] font-display text-[clamp(48px,8.4vw,128px)] font-normal leading-[0.92] tracking-[-0.05em]">
          Let&apos;s build something useful.
        </h1>
      </Reveal>
      <Reveal delay={0.14}>
        <div className="mt-11 flex flex-wrap items-end justify-between gap-10">
          <p className="m-0 max-w-[44ch] text-lg text-foreground-secondary">
            Open to Front-end, Mobile and Full-stack opportunities.
          </p>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-subtle">
            Chonburi, Thailand
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
