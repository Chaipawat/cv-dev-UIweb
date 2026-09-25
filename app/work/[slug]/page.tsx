import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import CaseStudySection from "@/components/project/case-study/case-study-section";
import NextProject from "@/components/project/case-study/next-project";
import ProjectHero from "@/components/project/case-study/project-hero";
import ProjectHighlights from "@/components/project/case-study/project-highlights";
import ProjectMeta from "@/components/project/case-study/project-meta";
import ProjectScreens from "@/components/project/case-study/project-screens";
import ProjectStack from "@/components/project/case-study/project-stack";
import ProjectSummary from "@/components/project/case-study/project-summary";
import ProjectTeam from "@/components/project/case-study/project-team";
import ProjectWorkList from "@/components/project/case-study/project-work-list";
import { portfolio } from "@/data/portfolio";
import { PROJECT_SLUGS, formatProjectPeriod, getProjectBySlug } from "@/data/projects";
import { getCaseStudyMedia } from "@/lib/project-media";

// Only slugs from data/portfolio.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${portfolio.profile.fullName}`;
  const description = `${project.type}, ${formatProjectPeriod(project.period)}. ${project.role}. ${project.description}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(project.images.cover ? { images: [{ url: project.images.cover }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Every screenshot appears once: the hero leads, the rest fill SCREENS.
  const media = getCaseStudyMedia(project);

  // Sections are numbered after optional ones are dropped, so the index never skips.
  type Section = { label: string; content: ReactNode };
  const candidates: (Section | null)[] = [
    { label: "OVERVIEW", content: <ProjectMeta project={project} /> },
    { label: "SUMMARY", content: <ProjectSummary project={project} /> },
    project.team ? { label: "ROLE / SMALL TEAM", content: <ProjectTeam project={project} /> } : null,
    { label: "WHAT I WORKED ON", content: <ProjectWorkList items={project.responsibilities} /> },
    project.highlights?.length || project.features?.length
      ? { label: "FEATURE HIGHLIGHTS", content: <ProjectHighlights project={project} /> }
      : null,
    media.rest.length ? { label: "SCREENS", content: <ProjectScreens images={media.rest} /> } : null,
    { label: "STACK", content: <ProjectStack project={project} /> },
  ];
  const sections = candidates.filter((s): s is Section => s !== null);

  return (
    <main>
      <ProjectHero project={project} media={media.hero} />
      <div className="pt-[clamp(72px,10vw,140px)]">
        {sections.map((s, i) => (
          <CaseStudySection key={s.label} index={String(i + 1).padStart(2, "0")} label={s.label}>
            {s.content}
          </CaseStudySection>
        ))}
      </div>
      <NextProject current={project} />
    </main>
  );
}
