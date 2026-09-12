import type { Metadata } from "next";
import WorkHero from "@/components/work/work-hero";
import CareerTimeline from "@/components/work/career-timeline";

export const metadata: Metadata = {
  title: "Work — Chaipawat Jatuphattaranun",
  description: "Professional timeline: education, internship and software development work.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <CareerTimeline />
    </main>
  );
}
