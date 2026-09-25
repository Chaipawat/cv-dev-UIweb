import Link from "next/link";
import type { ComponentType } from "react";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import SectionLabel from "@/components/shared/section-label";
import {
  AsymmetricComposition,
  CompactComposition,
  ExtensionComposition,
  FullWidthComposition,
  MobileComposition,
  PersonalComposition,
  type CompositionProps,
} from "@/components/home/work-compositions";
import { FEATURED_PROJECTS } from "@/data/projects";

// Layout rhythm follows featured order: hero → asymmetric → mobile →
// extension → compact → personal. Each project reads differently while the
// kicker / title / meta vocabulary stays constant.
const RHYTHM: ComponentType<CompositionProps>[] = [
  FullWidthComposition,
  AsymmetricComposition,
  MobileComposition,
  ExtensionComposition,
  CompactComposition,
  PersonalComposition,
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function SelectedWork() {
  return (
    <section id="selected-work" aria-labelledby="selected-work-heading" className="scroll-mt-[80px]">
      <PageContainer className="pb-[clamp(96px,12vw,180px)]">
        <SectionLabel
          index="01"
          label="SELECTED WORK"
          trailing={
            <Link href="/showcase" className="transition-colors duration-[180ms] hover:text-accent-text">
              ALL WORK →
            </Link>
          }
        />
        <h2 id="selected-work-heading" className="sr-only">
          Selected work
        </h2>

        <MotionScope effect="work">
        <div className="mt-[clamp(40px,6vw,80px)] flex flex-col gap-[clamp(96px,13vw,200px)]">
          {FEATURED_PROJECTS.map((project, i) => {
            const Composition = RHYTHM[i % RHYTHM.length];
            return (
              <Composition
                key={project.slug}
                project={project}
                position={`${pad(i + 1)} / ${pad(FEATURED_PROJECTS.length)}`}
              />
            );
          })}
        </div>
        </MotionScope>
      </PageContainer>
    </section>
  );
}
