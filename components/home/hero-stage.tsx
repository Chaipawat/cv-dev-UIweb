"use client";

import { useRef } from "react";
import PageContainer from "@/components/layout/page-container";
import ShotPlaceholder from "@/components/shared/shot-placeholder";

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    stage.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const k = parseFloat(el.getAttribute("data-parallax") || "0");
      el.style.translate = `${(dx * k).toFixed(1)}px ${(dy * k).toFixed(1)}px`;
    });
  };

  const onMouseLeave = () => {
    stageRef.current?.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      el.style.translate = "0px 0px";
    });
  };

  return (
    <PageContainer className="pb-10 pt-[46px]">
      <div
        ref={stageRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative flex flex-wrap items-end gap-7"
      >
        <div
          data-parallax="0.02"
          className="animate-float min-w-[300px] flex-1 basis-[620px] overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
        >
          <div className="flex h-[38px] items-center gap-2 border-b border-border-soft px-3.5">
            <span className="h-[9px] w-[9px] rounded-full bg-border" />
            <span className="h-[9px] w-[9px] rounded-full bg-border" />
            <span className="h-[9px] w-[9px] rounded-full bg-border" />
            <span className="ml-3 font-mono text-[11px] text-foreground-faint">
              zonepang / dashboard
            </span>
          </div>
          <ShotPlaceholder label="Zonepang Screenshot" className="h-[340px]" />
        </div>

        <div
          data-parallax="0.05"
          className="animate-float-b flex-none basis-[232px] rounded-[30px] border border-border bg-surface p-[9px] shadow-card-sm"
        >
          <ShotPlaceholder label="Kumtone Mobile UI" className="h-[420px] rounded-[22px]" />
        </div>

        <div
          data-parallax="0.09"
          className="absolute bottom-[-24px] right-[210px] hidden rounded-xl bg-foreground px-[18px] py-3.5 font-mono text-[11px] leading-[1.7] text-cream shadow-card-sm sm:block"
        >
          <div className="text-foreground-subtle">POST /api/generate</div>
          <div>
            <span className="text-accent-glow">200</span> socket:{" "}
            <span className="text-accent-glow">status:done</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
