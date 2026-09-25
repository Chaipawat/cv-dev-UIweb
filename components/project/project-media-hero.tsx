import LayeredProjectScreens from "@/components/project/media/layered-project-screens";
import PhoneRow from "@/components/project/media/phone-row";
import type { CaseStudyHero } from "@/lib/project-media";

/**
 * Lead visual for a case study (see getCaseStudyMedia): the main desktop
 * screen with phones or a detail layered over it, or — for mobile-only
 * products — a row of phone screens. Its first image is the page's LCP.
 */
export default function ProjectMediaHero({ hero, className }: { hero: CaseStudyHero | null; className?: string }) {
  if (!hero) return null;
  if (hero.kind === "phones") {
    return <PhoneRow phones={hero.phones} preload className={className} />;
  }
  return <LayeredProjectScreens base={hero.base} layers={hero.layers} inset={hero.inset} preload className={className} />;
}
