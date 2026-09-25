import type { Metadata } from "next";
import AboutPreview from "@/components/home/about-preview";
import Capabilities from "@/components/home/capabilities";
import ContactCta from "@/components/home/contact-cta";
import ExperienceProgression from "@/components/home/experience-progression";
import HomeHero from "@/components/home/home-hero";
import KineticStatement from "@/components/home/kinetic-statement";
import ProjectIndex from "@/components/home/project-index";
import SelectedWork from "@/components/home/selected-work";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.positioning}`,
  description: `${profile.summary} ${profile.statement}`,
  openGraph: {
    title: `${profile.displayName} — ${profile.positioning}`,
    description: profile.statement,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <KineticStatement />
      <SelectedWork />
      <ProjectIndex />
      <ExperienceProgression />
      <Capabilities />
      <AboutPreview />
      <ContactCta />
    </main>
  );
}
