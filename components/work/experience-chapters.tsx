import PageContainer from "@/components/layout/page-container";
import Tag from "@/components/shared/tag";
import Reveal from "@/components/shared/reveal";
import { CHAPTERS } from "@/data/experience";

export default function ExperienceChapters() {
  return (
    <PageContainer className="pt-12 md:pt-14 lg:pt-16">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-foreground pt-[22px]">
          <div className="font-display text-[clamp(28px,3vw,40px)] tracking-[-0.03em]">
            BTY Marketing
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-muted">
            Software Developer · May 2022 — Present
          </div>
        </div>
      </Reveal>

      {CHAPTERS.map((c) => (
        <Reveal key={c.n}>
          <div className="flex flex-wrap gap-10 border-b border-border py-8 md:py-9 lg:py-10">
            <div className="flex-none basis-[200px]">
              <div className="font-mono text-[11px] tracking-[0.18em] text-foreground-faint">
                CHAPTER {c.n}
              </div>
              <div className="mt-2 font-mono text-[13px] tracking-[0.1em] text-accent">
                {c.years}
              </div>
            </div>
            <div className="min-w-[260px] flex-1 basis-[420px]">
              <div className="font-display text-[clamp(24px,2.4vw,32px)] tracking-[-0.025em]">
                {c.title}
              </div>
              <p className="m-0 mt-3 max-w-[54ch] text-foreground-secondary">{c.desc}</p>
            </div>
            <div className="flex flex-1 basis-[220px] flex-wrap content-start gap-2">
              {c.tech.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </PageContainer>
  );
}
