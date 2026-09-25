import { portfolio } from "@/data/portfolio";
import { formatProjectPeriod, formatStack, getProjectsForExperience } from "@/data/projects";

export interface TimelineRecord {
  tag: string;
  name: string;
  tech: string;
  /** Case-study route when the record is a portfolio project. */
  href?: `/work/${string}`;
}

export interface TimelineNode {
  kind: string;
  time: string;
  title: string;
  org: string;
  note?: string;
  stage: string;
  records: TimelineRecord[];
}

const { education, experience } = portfolio;

const educationNodes: TimelineNode[] = education.map((e) => ({
  kind: "EDUCATION",
  // No graduation year is confirmed in the source CV — do not display one.
  time: e.graduationYear ? String(e.graduationYear) : "UNIVERSITY",
  title: e.university,
  org: e.degree,
  note: e.faculty,
  stage: "University",
  records: [{ tag: "FOCUS", name: "Software Engineering foundations", tech: "Programming · Databases · Systems" }],
}));

// Experience is stored newest first; the timeline reads oldest first.
const experienceNodes: TimelineNode[] = [...experience].reverse().map((e) => {
  const projects = getProjectsForExperience(e.id);
  const records: TimelineRecord[] = projects.length
    ? projects.map((p) => ({
        tag: `PROJECT — ${formatProjectPeriod(p.period)}`,
        name: p.title,
        tech: formatStack(p.stack, 4),
        href: `/work/${p.slug}` as const,
      }))
    : e.project
      ? [{ tag: "PROJECT", name: e.project.name, tech: formatStack(e.project.stack) }]
      : [];

  const isInternship = e.id === "internship";
  return {
    kind: isInternship ? "INTERNSHIP" : e.role.toUpperCase(),
    time: e.periodLabel.toUpperCase(),
    title: e.role,
    org: e.company ?? "Cooperative training",
    stage: isInternship ? "Internship" : e.role,
    records,
  };
});

export const TIMELINE: TimelineNode[] = [...educationNodes, ...experienceNodes];
