import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import { BEYOND_ENGINEERING, BEYOND_SOFT_SKILLS } from "@/data/showcase";

export default function BeyondCode() {
  return (
    <PageContainer className="pb-[120px]">
      <SectionLabel index="03" label="BEYOND CODE" />
      <div className="mt-9 grid grid-cols-1 gap-[clamp(28px,5vw,72px)] sm:grid-cols-2">
        <div>
          <h2 className="m-0 mb-[18px] font-display text-xl font-medium tracking-[-0.02em] text-foreground">
            Engineering
          </h2>
          <div className="flex flex-wrap gap-2">
            {BEYOND_ENGINEERING.map((x) => (
              <span
                key={x}
                className="rounded-md border border-border px-[13px] py-2 font-mono text-xs text-foreground-secondary"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="m-0 mb-[18px] font-display text-xl font-medium tracking-[-0.02em] text-foreground">
            Soft Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {BEYOND_SOFT_SKILLS.map((x) => (
              <span
                key={x}
                className="rounded-md border border-accent-border px-[13px] py-2 font-mono text-xs text-accent"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
