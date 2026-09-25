import { existsSync } from "node:fs";
import path from "node:path";
import type { Project, ProjectImage } from "@/types/portfolio";

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

export interface ProjectMedia {
  /** Landscape product screens — shown in a browser frame. */
  desktops: ProjectImage[];
  /** Portrait product screens — shown in a phone frame. */
  phones: ProjectImage[];
  /** Supporting evidence (store listing, extension card) — never the lead screen. */
  details: ProjectImage[];
}

/**
 * Available screens sorted by how they should be framed. Framing follows the
 * file's real orientation, so a new screenshot only needs correct
 * width/height in the manifest to land in the right frame.
 */
export function getProjectMedia(project: Project): ProjectMedia {
  const media: ProjectMedia = { desktops: [], phones: [], details: [] };
  for (const img of getAvailableImages(project)) {
    if (img.category === "detail" || img.category === "extension") media.details.push(img);
    else if (img.width > img.height) media.desktops.push(img);
    else media.phones.push(img);
  }
  return media;
}

export type CaseStudyHero =
  | { kind: "desktop"; base: ProjectImage; layers: ProjectImage[]; inset?: ProjectImage }
  | { kind: "phones"; phones: ProjectImage[] };

const MAX_HERO_PHONES = 4;

/**
 * Splits a project's screens into the case-study lead composition and the
 * rest, so every screenshot appears exactly once on the page:
 *   desktop + phones → main screen with up to two phones layered over it
 *   desktop only     → main screen, with a landscape detail inset if there is one
 *   phones only      → a row of phone screens, portrait evidence included
 */
export function getCaseStudyMedia(project: Project): { hero: CaseStudyHero | null; rest: ProjectImage[] } {
  const { desktops, phones, details } = getProjectMedia(project);
  const [base, ...moreDesktops] = desktops;

  if (base) {
    const layers = phones.slice(0, 2);
    const inset = layers.length ? undefined : details.find((d) => d.width > d.height);
    return {
      hero: { kind: "desktop", base, layers, inset },
      rest: [...moreDesktops, ...phones.slice(2), ...details.filter((d) => d !== inset)],
    };
  }

  const lead = [...phones, ...details.filter((d) => d.height > d.width)];
  if (!lead.length) return { hero: null, rest: details };
  const shown = lead.slice(0, MAX_HERO_PHONES);
  return {
    hero: { kind: "phones", phones: shown },
    rest: [...lead.slice(MAX_HERO_PHONES), ...details.filter((d) => !shown.includes(d))],
  };
}
