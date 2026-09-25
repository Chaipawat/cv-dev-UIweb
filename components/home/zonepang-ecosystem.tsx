import ZonepangSlider from "@/components/home/zonepang-slider";
import { getAvailableImages } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";

/** Resolve approved assets on the server; only the small slider needs JS. */
export default function ZonepangEcosystem({ project }: { project: Project }) {
  const images = getAvailableImages(project).slice(0, 4);
  if (images.length !== 4) return null;

  return <ZonepangSlider images={images} />;
}
