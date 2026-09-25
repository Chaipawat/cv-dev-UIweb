import { existsSync } from "node:fs";
import path from "node:path";
import type { Project, ProjectImage, ProjectMediaGroup } from "@/types/portfolio";

// Server-only: reads the filesystem at render/build time. Import from Server
// Components only.

const PUBLIC_DIR = path.join(process.cwd(), "public");

function fileExists(src: string) {
  return existsSync(path.join(PUBLIC_DIR, src.replace(/^\//, "")));
}

/**
 * Gallery entries whose file actually exists in /public. Lets the manifest in
 * data/portfolio.ts be filled before every screenshot is exported, without
 * ever rendering a broken image.
 */
export function getAvailableImages(project: Project): ProjectImage[] {
  return project.images.gallery.filter((img) => fileExists(img.src));
}

export interface ResolvedMediaGroup extends ProjectMediaGroup {
  images: ProjectImage[];
}

/** Curated groups with their available screens, empty groups dropped. */
export function getProjectMediaGroups(project: Project): ResolvedMediaGroup[] {
  const images = getAvailableImages(project);
  return (project.images.groups ?? [])
    .map((group) => ({ ...group, images: images.filter((img) => img.group === group.id) }))
    .filter((group) => group.images.length > 0);
}

/** Primary desktop/admin screen plus up to `maxLayers` phone screens for a layered composition. */
export function getLayeredComposition(project: Project, maxLayers = 2) {
  const images = getAvailableImages(project);
  const base = images.find((img) => img.treatment === "browser" || img.treatment === "layered");
  const layers = images.filter((img) => img.treatment === "phone").slice(0, maxLayers);
  return base ? { base, layers } : null;
}
