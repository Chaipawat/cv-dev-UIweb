import type { Metadata } from "next";
import WorkHero from "@/components/work/work-hero";
import ExperienceChapters from "@/components/work/experience-chapters";
import InternshipCard from "@/components/work/internship-card";
import EducationSection from "@/components/work/education-section";
import ApproachSection from "@/components/work/approach-section";
import AiToolsSection from "@/components/work/ai-tools-section";

export const metadata: Metadata = {
  title: "Work — Chaipawat Jatuphattaranun",
  description: "Professional timeline: from maintaining inherited systems to building modern web, AI and mobile experiences.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <ExperienceChapters />
      <InternshipCard />
      <EducationSection />
      <ApproachSection />
      <AiToolsSection />
    </main>
  );
}
