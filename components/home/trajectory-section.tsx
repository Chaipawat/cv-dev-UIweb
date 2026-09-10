import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/shared/section-heading";
import Reveal from "@/components/shared/reveal";
import { TRAJECTORY } from "@/data/experience";

export default function TrajectorySection() {
  return (
    <PageContainer className="py-16 md:py-20 lg:py-24">
      <SectionHeading title="Trajectory" index="[ 03 ]" />

      <div className="mt-2.5 flex flex-wrap">
        {TRAJECTORY.map((t) => (
          <Reveal key={t.year}>
            <div className="min-w-[200px] flex-1 basis-[240px] border-t border-border py-[34px] pr-7">
              <div className="font-display text-[30px] tracking-[-0.02em] text-accent">
                {t.year}
              </div>
              <div className="mt-3 max-w-[26ch] text-base text-foreground-secondary">
                {t.text}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link
          href="/work"
          className="group mt-11 inline-flex items-center gap-2.5 border-b border-border-soft pb-[5px] text-[15px] font-medium text-foreground transition-[gap,border-color] duration-[250ms] hover:gap-4 hover:border-foreground"
        >
          <span>Explore work history</span>
          <span>→</span>
        </Link>
      </Reveal>
    </PageContainer>
  );
}
