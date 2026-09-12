import type { Metadata } from "next";
import ProfileSection from "@/components/about/profile-section";
import HowIWork from "@/components/about/how-i-work";

export const metadata: Metadata = {
  title: "About — Chaipawat Jatuphattaranun",
  description: "Frontend Engineer / Software Developer based in Chonburi, Thailand.",
};

export default function AboutPage() {
  return (
    <main>
      <ProfileSection />
      <HowIWork />
    </main>
  );
}
