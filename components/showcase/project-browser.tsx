"use client";

import { useMemo, useState } from "react";
import PageContainer from "@/components/layout/page-container";
import ShotPlaceholder from "@/components/shared/shot-placeholder";
import { PROJECTS, PROJECT_FILTERS } from "@/data/projects";
import { cn } from "@/lib/utils";

const PROJECT_HEIGHT: Record<string, number> = {
  zonepang: 420,
  aiz: 420,
  kumtone: 520,
  tidmu: 520,
  booking: 520,
  mini: 380,
};

const PROJECT_BASIS: Record<string, number> = {
  zonepang: 760,
  aiz: 440,
  kumtone: 380,
  tidmu: 380,
  booking: 380,
  mini: 1200,
};

export default function ProjectBrowser() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const [hoverCard, setHoverCard] = useState<string | null>(null);

  const list = useMemo(
    () =>
      filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.some((t) => t === filter)),
    [filter]
  );

  return (
    <>
      <PageContainer className="mt-[52px] flex flex-wrap gap-2 border-b border-border pb-[18px]">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-[18px] py-[9px] font-mono text-xs tracking-[0.1em] transition-colors duration-300",
              filter === f
                ? "border-foreground bg-foreground text-cream"
                : "border-border bg-transparent text-foreground-secondary hover:border-foreground/40"
            )}
          >
            {f}
          </button>
        ))}
      </PageContainer>

      <PageContainer className="mt-10">
        <div className="flex flex-wrap gap-7">
          {list.map((p) => {
            const on = hoverCard === p.id;
            const basis = filter === "All" ? PROJECT_BASIS[p.id] : list.length === 1 ? 1200 : 560;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoverCard(p.id)}
                onMouseLeave={() => setHoverCard(null)}
                className="min-w-[280px] flex-1 cursor-pointer"
                style={{ flexBasis: `${basis}px` }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-border transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    on && "scale-[1.015]"
                  )}
                  style={{ height: PROJECT_HEIGHT[p.id] }}
                >
                  <ShotPlaceholder label={p.shot} className="h-full w-full" />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[3px] bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      on ? "w-full" : "w-0"
                    )}
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div
                    className={cn(
                      "font-display text-[clamp(24px,2.4vw,32px)] tracking-[-0.03em] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      on && "translate-x-1.5"
                    )}
                  >
                    {p.title}
                  </div>
                  <div className="font-mono text-xs text-foreground-faint">{p.n}</div>
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                  {p.cat} · {p.years}
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity,margin-top] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    on ? "mt-3.5 max-h-40 opacity-100" : "mt-0 max-h-0 opacity-0"
                  )}
                >
                  <div className="max-w-[52ch] text-base text-foreground-secondary">{p.desc}</div>
                  <div className="mt-3 font-mono text-[11px] tracking-[0.06em] text-foreground-muted">
                    {p.tech.join(" / ")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </>
  );
}
