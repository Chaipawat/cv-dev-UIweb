import type { Metadata } from "next";
import ShowcaseHero from "@/components/showcase/showcase-hero";
import SkillEvidence from "@/components/showcase/skill-evidence";
import BeyondCode from "@/components/showcase/beyond-code";

export const metadata: Metadata = {
  title: "Showcase — Chaipawat Jatuphattaranun",
  description: "Skill turned into evidence: interfaces, mobile experiences and product workflows.",
};

export default function ShowcasePage() {
  return (
    <main>
      <ShowcaseHero />
      <SkillEvidence />
      <BeyondCode />
    </main>
  );
}
