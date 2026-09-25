import { portfolio } from "@/data/portfolio";
import type { Project, ProjectCategory, ProjectPeriod } from "@/types/portfolio";

export const PROJECTS: Project[] = portfolio.projects;

export const FEATURED_PROJECTS: Project[] = PROJECTS.filter((p) => p.featured);

export const PROJECT_SLUGS: string[] = PROJECTS.map((p) => p.slug);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Project index (1-based) in display order, e.g. for "01 / 08". */
export function getProjectNumber(slug: string): number {
  return PROJECTS.findIndex((p) => p.slug === slug) + 1;
}

/** Following project in display order, wrapping back to the first. */
export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** Projects for one experience entry, oldest first to read as a progression. */
export function getProjectsForExperience(experienceId: string): Project[] {
  return PROJECTS.filter((p) => p.experienceId === experienceId).sort(
    (a, b) => a.period.start - b.period.start || (a.period.end ?? Infinity) - (b.period.end ?? Infinity)
  );
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.categories.includes(category));
}

/** "2025—2026", "2023", or "2026—" for ongoing work. */
export function formatProjectPeriod({ start, end }: ProjectPeriod): string {
  if (end === null) return `${start}—`;
  if (end === start) return String(start);
  return `${start}—${end}`;
}

/** Compact stack line, e.g. "React · Next.js · TypeScript". */
export function formatStack(stack: string[], limit?: number): string {
  return (limit ? stack.slice(0, limit) : stack).join(" · ");
}
