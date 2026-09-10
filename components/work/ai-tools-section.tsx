import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function AiToolsSection() {
  return (
    <PageContainer className="py-[130px]">
      <Reveal>
        <div className="flex flex-wrap gap-14 border-t border-border pt-[60px]">
          <div className="min-w-[280px] flex-1 basis-[460px]">
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(28px,3.4vw,46px)] font-normal leading-[1.08] tracking-[-0.035em]">
              AI as a development tool, not a replacement for engineering.
            </h2>
          </div>
          <div className="min-w-[260px] flex-1 basis-[380px]">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              Tools
            </div>
            <div className="mt-3 text-foreground-secondary">ChatGPT · Claude Code · Gemini</div>
            <div className="mt-[30px] font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              Uses
            </div>
            <div className="mt-3 text-foreground-secondary">
              UI implementation · Code generation and modification · Refactoring
            </div>
            <p className="m-0 mt-[30px] max-w-[46ch] border-l border-border pl-[18px] text-foreground-muted">
              AI-generated suggestions are reviewed and adapted before integration into
              production code.
            </p>
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
