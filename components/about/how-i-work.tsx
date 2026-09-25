import { Sparkles } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import { portfolio } from "@/data/portfolio";

const FLOW = portfolio.workflow.map((w, i) => ({
  n: String(i + 1).padStart(2, "0"),
  arrow: i < portfolio.workflow.length - 1 ? "→" : "",
  k: w.step,
  v: w.description,
}));

export default function HowIWork() {
  return (
    <PageContainer className="pb-[120px]">
      <SectionLabel index="02" label="HOW I WORK" />

      <div className="mt-11 grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {FLOW.map((f) => (
          <div key={f.n} className="border-b border-border py-7 pr-6 transition-colors duration-[180ms] hover:bg-surface">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{f.n}</span>
              <span className="block h-px flex-1 bg-border" aria-hidden="true" />
              <span className="text-[13px] text-foreground-muted" aria-hidden="true">
                {f.arrow}
              </span>
            </div>
            <h2 className="m-0 font-display text-[clamp(20px,2.2vw,26px)] font-medium tracking-[-0.03em] text-foreground">
              {f.k}
            </h2>
            <p className="m-0 mt-3 max-w-[240px] text-[13.5px] leading-[1.6] text-foreground-secondary">{f.v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border py-7">
        <div className="flex max-w-[440px] items-start gap-3.5">
          <Sparkles size={17} strokeWidth={1.6} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">AI IN THE LOOP</div>
            <div className="text-[15px] leading-[1.6] text-foreground-secondary">
              AI for research, implementation support, debugging, and iteration.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {portfolio.skills.aiTools.map((tool) => (
            <span
              key={tool}
              className="rounded-md border border-border px-3.5 py-2.5 font-mono text-xs text-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
