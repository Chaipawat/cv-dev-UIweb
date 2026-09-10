import HomeHero from "@/components/home/home-hero";
import HeroStage from "@/components/home/hero-stage";
import BuildSection from "@/components/home/build-section";
import SelectedWork from "@/components/home/selected-work";
import TidmuBanner from "@/components/home/tidmu-banner";
import TechTicker from "@/components/shared/tech-ticker";
import TrajectorySection from "@/components/home/trajectory-section";
import ContactCta from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HeroStage />
      <BuildSection />
      <SelectedWork />
      <TidmuBanner />
      <TechTicker />
      <TrajectorySection />
      <ContactCta />
    </main>
  );
}
