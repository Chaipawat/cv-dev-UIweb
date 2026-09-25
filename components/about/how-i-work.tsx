import { Sparkles } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

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
      <h2 className="sr-only">How I work</h2>

      <ol className="m-0 mt-11 grid list-none grid-cols-1 border-t border-border p-0 sm:grid-cols-2 lg:grid-cols-4">
        {FLOW.map((f, i) => (
          <li
            key={f.n}
            className={cn("border-b border-border py-7 sm:pr-6", i % 2 === 1 && "sm:border-l sm:pl-6", i > 0 && "lg:border-l lg:pl-6")}
          >
            {/* Fixed height so the last step, which has no arrow, lines up with the rest. */}
            <div className="mb-6 flex h-4 items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent-text">{f.n}</span>
              <span className="block h-px flex-1 bg-border" aria-hidden="true" />
              <span className="w-4 text-right text-[13px] text-foreground-secondary" aria-hidden="true">
                {f.arrow}
              </span>
            </div>
            <h3 className="m-0 font-display text-[clamp(32px,3.4vw,48px)] uppercase leading-[0.92] tracking-[-0.005em] text-foreground">
              {f.k}
            </h3>
            <p className="m-0 mt-4 max-w-[260px] text-[14px] leading-[1.6] text-foreground-secondary">{f.v}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border py-7">
        <div className="flex max-w-[440px] items-start gap-3.5">
          <Sparkles size={17} strokeWidth={1.6} className="mt-0.5 flex-none text-accent" aria-hidden="true" />
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">AI IN THE LOOP</div>
            <div className="text-[15px] leading-[1.6] text-foreground-secondary">
              AI for research, implementation support, debugging, and iteration.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {portfolio.skills.aiTools.map((tool) => (
            <span
              key={tool}
              className="rounded-[2px] border border-border-strong px-3.5 py-2.5 font-mono text-xs text-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
