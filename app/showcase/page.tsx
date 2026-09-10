import type { Metadata } from "next";
import ShowcaseHero from "@/components/showcase/showcase-hero";
import ProjectBrowser from "@/components/showcase/project-browser";
import CapabilityExplorer from "@/components/showcase/capability-explorer";

export const metadata: Metadata = {
  title: "Showcase — Chaipawat Jatuphattaranun",
  description: "Interfaces, mobile experiences and product workflows built across real-world projects.",
};

export default function ShowcasePage() {
  return (
    <main>
      <ShowcaseHero />
      <ProjectBrowser />
      <CapabilityExplorer />
    </main>
  );
}
