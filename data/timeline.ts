import { portfolio } from "@/data/portfolio";
import { FEATURED_PROJECTS, formatProjectPeriod, formatStack } from "@/data/projects";
import type { ProjectImage } from "@/types/portfolio";

export interface TimelineRecord {
  tag: string;
  name: string;
  tech: string;
  /** Case-study route when the record is a portfolio project. */
  href?: `/work/${string}`;
}

export interface TimelineEvidence {
  src: string;
  alt: string;
  label: string;
  title: string;
  issuer: string;
  date: string;
}

export interface TimelineProjectEvidence {
  image: ProjectImage;
  href: `/work/${string}`;
  title: string;
  caption: string;
}

export interface TimelineNode {
  id: "education" | "internship" | "professional" | "project";
  kind: string;
  time: string;
  title: string;
  org: string;
  note?: string;
  stage: string;
  records: TimelineRecord[];
  evidence?: TimelineEvidence;
  projectEvidence?: TimelineProjectEvidence;
}

const { education, experience } = portfolio;

const educationNodes: TimelineNode[] = education.map((e) => ({
  id: "education",
  kind: "EDUCATION",
  time: e.graduationYear ? String(e.graduationYear) : "UNIVERSITY",
  title: e.university,
  org: e.degree,
  note: e.faculty,
  stage: "University",
  records: [{ tag: "FOCUS", name: "Software Engineering foundations", tech: "Programming · Databases · Systems" }],
  evidence: {
    src: "/certificate/burapha-certi.png",
    alt: "Burapha University bachelor degree certificate awarded to Chaipawat Jatuphattaranun",
    label: "DEGREE EVIDENCE",
    title: "Bachelor’s Degree Certificate",
    issuer: "Burapha University — Faculty of Informatics",
    date: "19 APR 2022",
  },
}));

// Experience is stored newest first; the timeline reads oldest first.
const experienceNodes: TimelineNode[] = [...experience].reverse().map((e) => {
  const isInternship = e.id === "internship";
  const records: TimelineRecord[] = e.project
    ? [{ tag: "PROJECT", name: e.project.name, tech: formatStack(e.project.stack) }]
    : [];
  return {
    id: isInternship ? ("internship" as const) : ("professional" as const),
    kind: isInternship ? "INTERNSHIP" : e.role.toUpperCase(),
    time: e.periodLabel.toUpperCase(),
    title: e.role,
    org: e.company ?? "Cooperative training",
    stage: isInternship ? "Internship" : e.role,
    records,
    ...(isInternship
      ? {
          evidence: {
            src: "/certificate/intern-certi.png",
            alt: "Assistant Software Professional cooperative training certificate awarded to Chaipawat Jatuphattaranun",
            label: "TRAINING EVIDENCE",
            title: "Assistant Software Professional",
            issuer: "AI-HOST — Academy of Advanced Services",
            date: "21 SEP 2021",
          },
        }
      : {}),
  };
});

// Each selected project is its own readable step. Only one lead image is used
// so the career timeline stays editorial instead of becoming another gallery.
const projectNodes: TimelineNode[] = FEATURED_PROJECTS.flatMap((project) => {
  const image =
    project.images.gallery.find((candidate) => candidate.src === project.images.cover) ??
    project.images.gallery[0];
  if (!image) return [];

  const owner = project.experienceId
    ? experience.find((entry) => entry.id === project.experienceId)?.company ?? "Company Project"
    : "Personal Project";

  return [
    {
      id: "project",
      kind: `PROJECT / ${project.shortType.toUpperCase()}`,
      time: formatProjectPeriod(project.period),
      title: project.title,
      org: owner,
      note: project.role,
      stage: project.shortTitle ?? project.title,
      records: [
        {
          tag: "STACK",
          name: project.description,
          tech: formatStack(project.stack, 5),
        },
      ],
      projectEvidence: {
        image,
        href: `/work/${project.slug}` as const,
        title: project.title,
        caption: image.caption ?? project.type,
      },
    },
  ];
});

export const TIMELINE: TimelineNode[] = [...educationNodes, ...experienceNodes, ...projectNodes];
