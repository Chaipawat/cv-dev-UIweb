import type { Metadata } from "next";
import ProfileSection from "@/components/about/profile-section";
import HowIWork from "@/components/about/how-i-work";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export const metadata: Metadata = {
  title: `About — ${profile.fullName}`,
  description: `${profile.positioning} based in ${profile.location}.`,
};

export default function AboutPage() {
  return (
    <main>
      <ProfileSection />
      <HowIWork />
    </main>
  );
}
