import PageContainer from "@/components/layout/page-container";
import Tag from "@/components/shared/tag";
import Reveal from "@/components/shared/reveal";
import { INTERNSHIP } from "@/data/experience";

export default function InternshipCard() {
  return (
    <PageContainer className="pt-10 md:pt-12 lg:pt-14">
      <Reveal>
        <div className="flex flex-wrap gap-10 rounded-2xl border border-border bg-surface p-8 md:p-9">
          <div className="flex-none basis-[200px]">
            <div className="font-mono text-[11px] tracking-[0.18em] text-foreground-faint">
              INTERNSHIP
            </div>
            <div className="mt-2 font-mono text-[13px] tracking-[0.1em] text-foreground-muted">
              {INTERNSHIP.years}
            </div>
          </div>
          <div className="min-w-[260px] flex-1 basis-[420px]">
            <div className="font-display text-[26px] tracking-[-0.025em]">{INTERNSHIP.org}</div>
            <div className="mt-1.5 text-[15px] text-foreground-muted">{INTERNSHIP.role}</div>
            <p className="m-0 mt-3.5 max-w-[54ch] text-foreground-secondary">{INTERNSHIP.desc}</p>
            <div className="mt-3.5 font-mono text-[11px] tracking-[0.08em] text-foreground-subtle">
              {INTERNSHIP.certification}
            </div>
          </div>
          <div className="flex flex-1 basis-[200px] flex-wrap content-start gap-2">
            {INTERNSHIP.tech.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
