"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/shared/section-heading";
import Tag from "@/components/shared/tag";
import Reveal from "@/components/shared/reveal";
import { BUILD_ROWS } from "@/data/skills";
import { cn } from "@/lib/utils";

export default function BuildSection() {
  const [hoverRow, setHoverRow] = useState<number | null>(null);

  return (
    <PageContainer className="pb-10 pt-[120px]">
      <SectionHeading title="What I build" index="[ 01 ]" />

      {BUILD_ROWS.map((row, i) => {
        const on = hoverRow === i;
        return (
          <Reveal key={row.n}>
            <div
              onMouseEnter={() => setHoverRow(i)}
              onMouseLeave={() => setHoverRow(null)}
              className={cn(
                "flex flex-wrap items-start gap-6 border-b border-border py-[38px] pl-1 pr-5 transition-[padding,background] duration-[400ms]",
                on && "bg-surface pl-6"
              )}
            >
              <div className="flex-none basis-16 pt-2 font-mono text-xs text-foreground-faint">
                {row.n}
              </div>
              <div className="min-w-[240px] flex-1 basis-[280px]">
                <div
                  className={cn(
                    "font-display text-[clamp(26px,3vw,38px)] leading-[1.05] tracking-[-0.03em] transition-colors duration-300",
                    on ? "text-accent" : "text-foreground"
                  )}
                >
                  {row.title}
                </div>
                <div className="mt-2.5 text-base text-foreground-muted">{row.desc}</div>
              </div>
              <div className="flex flex-1 basis-[240px] flex-wrap content-start gap-2 pt-1.5">
                {row.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
              <div
                className={cn(
                  "flex h-24 flex-none items-center justify-center overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(135deg,#EEECE5_0px,#EEECE5_8px,#F5F3ED_8px,#F5F3ED_16px)] opacity-0 transition-[flex-basis,opacity] duration-[450ms]",
                  on ? "basis-[220px] opacity-100" : "basis-0"
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-subtle">
                  {row.preview}
                </span>
              </div>
            </div>
          </Reveal>
        );
      })}
    </PageContainer>
  );
}
