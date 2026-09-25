import BrowserFrame from "@/components/project/media/browser-frame";
import LayeredProjectScreens from "@/components/project/media/layered-project-screens";
import PhoneFrame from "@/components/project/media/phone-frame";
import { getAvailableImages } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export type CoverComposition = "layered" | "browser" | "phones";

interface ProjectCoverProps {
  project: Project;
  composition: CoverComposition;
  /** Max phone screens for the "phones" composition. */
  phones?: number;
  className?: string;
}

/**
 * Real-screenshot cover for a project in the chosen composition. Falls back
 * to the closest composition the available screens allow, and renders
 * nothing when a project has no screenshots yet — never a mock.
 */
export default function ProjectCover({ project, composition, phones = 3, className }: ProjectCoverProps) {
  const images = getAvailableImages(project);
  const desktop = images.find((i) => i.treatment === "browser" || i.treatment === "layered");
  const mobile = images.filter((i) => i.treatment === "phone");

  if (composition === "layered" && desktop) {
    return <LayeredProjectScreens base={desktop} layers={mobile.slice(0, 2)} label={project.shortType} className={className} />;
  }

  if ((composition === "phones" || !desktop) && mobile.length) {
    return (
      <div className={cn("flex items-start gap-[clamp(10px,2vw,28px)]", className)}>
        {mobile.slice(0, phones).map((img, i) => (
          <PhoneFrame
            key={img.src}
            image={img}
            bare
            sizes="(min-width: 768px) 16vw, 30vw"
            className={cn("min-w-0 flex-1", i % 2 === 1 && "mt-[12%]")}
          />
        ))}
      </div>
    );
  }

  if (desktop) {
    return <BrowserFrame image={desktop} label={project.shortType} className={className} />;
  }

  return null;
}

/** True when a project has at least one screenshot on disk. */
export function hasProjectCover(project: Project) {
  return getAvailableImages(project).length > 0;
}
