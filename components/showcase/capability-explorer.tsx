"use client";

import { useMemo, useState } from "react";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/shared/section-heading";
import { CAPABILITIES, PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function CapabilityExplorer() {
  const [cap, setCap] = useState<(typeof CAPABILITIES)[number]>("React Native");

  const capProjects = useMemo(
    () => PROJECTS.filter((p) => p.caps.some((c) => c === cap)),
    [cap]
  );

  return (
    <PageContainer className="py-16 md:py-20 lg:py-24">
      <SectionHeading title="Explore by capability" index="[ 04 ]" />

      <div className="mt-10 flex flex-wrap gap-10 lg:gap-14">
        <div className="flex min-w-[280px] flex-1 basis-[340px] flex-wrap content-start gap-2.5">
          {CAPABILITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCap(c)}
              className={cn(
                "rounded-full border px-5 py-[11px] font-mono text-[13px] tracking-[0.06em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                cap === c
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-transparent text-foreground-secondary hover:border-foreground/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="min-w-[280px] flex-1 basis-[480px]">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
            Applied in {capProjects.length} {capProjects.length === 1 ? "project" : "projects"}
          </div>
          <div className="mt-3.5">
            {capProjects.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  "flex flex-wrap items-baseline justify-between gap-4 border-b border-border py-[22px]",
                  i === 0 && "border-t"
                )}
              >
                <div className="font-display text-[28px] tracking-[-0.02em]">{p.title}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">
                  {p.cat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
