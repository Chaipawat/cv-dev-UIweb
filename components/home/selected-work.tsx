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
  ProjectChapter,
  type CompositionProps,
} from "@/components/home/work-compositions";
import { FEATURED_PROJECTS } from "@/data/projects";

type Layout = { Composition: ComponentType<CompositionProps>; variant: string };

// Projects appear in timeline order; each keeps the composition that suits
// its media, so the layout is tied to the project rather than its position.
const LAYOUTS: Record<string, Layout> = {
  "broadpang-extension": { Composition: ExtensionComposition, variant: "extension" },
  "zonepang-platform": { Composition: AsymmetricComposition, variant: "asymmetric" },
  kumtone: { Composition: MobileComposition, variant: "mobile" },
  "mini-game": { Composition: CompactComposition, variant: "compact" },
  "badminton-booking": { Composition: FullWidthComposition, variant: "full" },
  devpath: { Composition: PersonalComposition, variant: "personal" },
};
const FALLBACK: Layout = { Composition: AsymmetricComposition, variant: "asymmetric" };

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
            const { Composition, variant } = LAYOUTS[project.slug] ?? FALLBACK;
            return (
              <div key={project.slug} data-m="project" data-variant={variant}>
                <ProjectChapter project={project} index={i + 1} total={FEATURED_PROJECTS.length} />
                <Composition project={project} />
              </div>
            );
          })}
        </div>
        </MotionScope>
      </PageContainer>
    </section>
  );
}
