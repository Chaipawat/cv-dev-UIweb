export type ProjectCategory = "Web" | "Mobile" | "AI" | "Integration" | "UI";

export type Capability =
  | "React"
  | "Next.js"
  | "React Native"
  | "TypeScript"
  | "REST API"
  | "Payment"
  | "Socket"
  | "AI Integration"
  | "Figma";

export interface Project {
  id: string;
  n: string;
  title: string;
  years: string;
  /** Eyebrow label reused by the home page featured rows, e.g. "01 / 2024 — Present / Web" */
  meta: string;
  desc: string;
  tech: string[];
  cat: string;
  tags: ProjectCategory[];
  shot: string;
  caps: Capability[];
}
