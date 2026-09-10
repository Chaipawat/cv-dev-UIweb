import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";
import { EDUCATION, LANGUAGES } from "@/data/experience";

export default function EducationSection() {
  return (
    <PageContainer className="pt-6 md:pt-7">
      <Reveal>
        <div className="flex flex-wrap gap-10 rounded-2xl border border-border bg-surface p-8 md:p-9">
          <div className="flex-none basis-[200px]">
            <div className="font-mono text-[11px] tracking-[0.18em] text-foreground-faint">
              EDUCATION
            </div>
            <div className="mt-2 font-mono text-[13px] tracking-[0.1em] text-foreground-muted">
              {EDUCATION.years}
            </div>
          </div>
          <div className="min-w-[260px] flex-1 basis-[420px]">
            <div className="font-display text-[26px] tracking-[-0.025em]">{EDUCATION.degree}</div>
            <div className="mt-1.5 text-[15px] text-foreground-muted">{EDUCATION.school}</div>
            <p className="m-0 mt-3.5 text-foreground-secondary">{EDUCATION.detail}</p>
          </div>
          <div className="flex flex-1 basis-[200px] flex-col gap-1.5">
            <div className="font-mono text-[11px] tracking-[0.18em] text-foreground-faint">
              LANGUAGES
            </div>
            {LANGUAGES.map((l) => (
              <div key={l.name} className="text-[15px] text-foreground-secondary">
                {l.name} — {l.level}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
