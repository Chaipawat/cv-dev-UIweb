import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function LetsConnect() {
  return (
    <PageContainer className="pt-[132px]">
      <Reveal as="section">
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
          <span>PAGE 05 — CONTACT</span>
          <span>FRONTEND ENGINEER / CHONBURI, TH</span>
        </div>

        <h1 className="m-0 mt-12 font-display text-[clamp(50px,9.6vw,142px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-foreground">
          Let&apos;s <span className="font-serif italic font-normal normal-case text-accent">Connect</span>
        </h1>
        <p className="m-0 mt-8 max-w-[420px] text-base leading-[1.65] text-foreground-secondary">
          Open to frontend opportunities, interesting projects, and collaborations.
        </p>
      </Reveal>
    </PageContainer>
  );
}
