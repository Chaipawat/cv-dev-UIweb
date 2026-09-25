import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import SectionLabel from "@/components/shared/section-label";
import ProjectGallery, { type GalleryItem } from "@/components/showcase/project-gallery";
import ShowcaseHero from "@/components/showcase/showcase-hero";
import ShowcaseProject from "@/components/showcase/showcase-project";
import { CATEGORY_LABELS, PROJECTS } from "@/data/projects";
import { getAvailableImages } from "@/lib/project-media";
import type { ProjectCategory } from "@/types/portfolio";

export const metadata: Metadata = {
  title: "Showcase — Chaipawat Jatuphattaranun",
  description:
    "Selected projects: web platforms, mobile apps, LINE LIFF booking and admin systems, with role, team and stack for each.",
};

const pad = (n: number) => String(n).padStart(2, "0");

// The showcase is visual: only projects with real screenshots appear here.
// Projects without them keep their case study (reachable from Work and the
// home project index) until screenshots are added.
const SHOWN = PROJECTS.filter((p) => getAvailableImages(p).length > 0);

// Only categories that actually have shown projects become filters.
const FILTERS = (Object.keys(CATEGORY_LABELS) as ProjectCategory[])
  .filter((id) => SHOWN.some((p) => p.categories.includes(id)))
  .map((id) => ({ id, label: CATEGORY_LABELS[id] }));

export default function ShowcasePage() {
  const items: GalleryItem[] = SHOWN.map((project, i) => ({
    slug: project.slug,
    categories: project.categories,
    node: <ShowcaseProject project={project} number={pad(i + 1)} />,
  }));

  return (
    <main>
      <ShowcaseHero projects={SHOWN} />
      <section aria-label="Projects">
        <PageContainer className="pb-[clamp(96px,12vw,180px)] pt-[clamp(64px,8vw,112px)]">
          <SectionLabel index="01" label="PROJECTS" trailing={`${pad(SHOWN.length)} TOTAL`} className="mb-6" />
          <ProjectGallery items={items} filters={FILTERS} />
        </PageContainer>
      </section>
    </main>
  );
}
