import type { ReactNode } from "react";
import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import Reveal from "@/components/shared/reveal";

interface CaseStudySectionProps {
  index: string;
  label: string;
  children: ReactNode;
}

export default function CaseStudySection({ index, label, children }: CaseStudySectionProps) {
  return (
    <PageContainer className="pb-[clamp(88px,11vw,160px)]">
      <section aria-label={label}>
        <SectionLabel index={index} label={label} />
        <Reveal className="mt-[clamp(28px,4vw,56px)]">{children}</Reveal>
      </section>
    </PageContainer>
  );
}
