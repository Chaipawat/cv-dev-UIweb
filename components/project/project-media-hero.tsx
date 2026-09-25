import LayeredProjectScreens from "@/components/project/media/layered-project-screens";
import { getLayeredComposition } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";

/**
 * Lead visual for a project: its main desktop/admin screen with phone
 * screens layered over it (e.g. Badminton Booking admin + LINE LIFF).
 * Returns null until a real desktop screenshot is available.
 */
export default function ProjectMediaHero({ project, className }: { project: Project; className?: string }) {
  const composition = getLayeredComposition(project);
  if (!composition) return null;
  return (
    <LayeredProjectScreens
      {...composition}
      label={project.platforms?.join(" + ") ?? project.type}
      priority
      className={className}
    />
  );
}
