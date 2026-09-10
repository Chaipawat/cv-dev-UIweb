import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/shared/section-heading";
import Reveal from "@/components/shared/reveal";
import { APPROACH } from "@/data/experience";

export default function ApproachSection() {
  return (
    <PageContainer className="pt-16 md:pt-20 lg:pt-24">
      <SectionHeading title="Development approach" index="[ 05 ]" />

      <div className="mt-5 flex flex-wrap">
        {APPROACH.map((a) => (
          <Reveal key={a.n}>
            <div className="min-w-[200px] flex-1 basis-[240px] border-t border-border py-7 pr-[30px] md:py-8">
              <div className="font-mono text-xs tracking-[0.14em] text-foreground-faint">
                {a.n}
              </div>
              <div className="mt-3.5 font-display text-[30px] tracking-[-0.025em]">{a.title}</div>
              <div className="mt-4 flex flex-col gap-1.5 font-mono text-xs text-foreground-muted">
                {a.items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageContainer>
  );
}
