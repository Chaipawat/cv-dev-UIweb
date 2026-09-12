import { portfolioData } from "@/data/portfolio";

export interface TimelineRecord {
  tag: string;
  name: string;
  tech: string;
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

const { education, experience, projects } = portfolioData;
const [primaryEducation] = education;
const internship = experience.find((e) => e.id === "internship")!;
const developerRole = experience.find((e) => e.id === "bty-marketing")!;

const internshipProject = projects.find((p) => p.id === "purchasing-order-management")!;

export const TIMELINE: TimelineNode[] = [
  {
    kind: "EDUCATION",
    // No graduation year is confirmed in the source CV — do not display one.
    time: "UNIVERSITY",
    title: primaryEducation.university,
    org: primaryEducation.degree,
    note: primaryEducation.faculty,
    stage: "University",
    records: [{ tag: "FOCUS", name: "Software Engineering foundations", tech: "Programming · Databases · Systems" }],
  },
  {
    kind: "INTERNSHIP",
    time: internship.periodLabel.toUpperCase(),
    title: internship.role,
    org: "Cooperative training",
    stage: "Internship",
    records: [{ tag: "PROJECT", name: internshipProject.name, tech: internshipProject.stack.join(" · ") }],
  },
  {
    kind: "SOFTWARE DEVELOPER",
    time: developerRole.periodLabel.toUpperCase(),
    title: developerRole.role,
    org: developerRole.company!,
    stage: "Software Developer",
    // Matches the approved design reference exactly (per product-owner decision).
    records: [
      { tag: "PROJECT RECORD", name: "Web & Mobile Applications", tech: "React · Next.js · React Native · TypeScript" },
      { tag: "PROJECT RECORD", name: "Broadcast UI Extension", tech: "JavaScript · Socket · REST API" },
      { tag: "PROJECT RECORD", name: "Trading Tools & Automation", tech: "TypeScript · API Integration · Automation" },
    ],
  },
];
