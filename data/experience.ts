import type { ApproachItem, Chapter, TrajectoryItem } from "@/types/experience";

export const CHAPTERS: Chapter[] = [
  {
    n: "01",
    years: "2022 — 2023",
    title: "Broadpang Broadcast",
    desc: "Project handover from outsourced development to internal maintenance and improvement.",
    tech: ["Java", "HTML", "CSS"],
  },
  {
    n: "02",
    years: "2023 — 2024",
    title: "Trading Tools & Babefan",
    desc: "Worked on Forex utilities using C++ / C#, alongside a Laravel / Java live-streaming web project. The project was discontinued before deployment.",
    tech: ["C++", "C#", "Laravel", "Java"],
  },
  {
    n: "03",
    years: "2024 — 2025",
    title: "Zonepang Platform",
    desc: "Developed front-end pages and user workflows across a digital marketing platform and its connected services, including Broadpang and Chatbotpang.",
    tech: ["React", "Next.js", "REST API", "Figma"],
  },
  {
    n: "04",
    years: "2025 — Present",
    title: "AI Zonepang & Mobile Expansion",
    desc: "Integrated AI-generation workflows, payments and real-time status updates, and helped extend services into React Native mobile applications.",
    tech: ["React", "Next.js", "React Native", "TypeScript", "Node.js", "REST API", "AI Integration"],
  },
];

export const TRAJECTORY: TrajectoryItem[] = [
  { year: "2020", text: "Started professional development through cooperative training" },
  { year: "2022", text: "Joined BTY Marketing" },
  { year: "2024", text: "Expanded into product-focused frontend platforms" },
  { year: "2025+", text: "Web → AI products → Mobile applications" },
];

export const APPROACH: ApproachItem[] = [
  { n: "01", title: "Understand", items: ["Figma", "Product requirement", "Existing system"] },
  { n: "02", title: "Build", items: ["React", "Next.js", "React Native"] },
  { n: "03", title: "Connect", items: ["REST API", "Payment", "Socket", "AI"] },
  { n: "04", title: "Ship", items: ["Web", "Android", "iOS"] },
];

export const INTERNSHIP = {
  years: "Dec 2020 — Sep 2021",
  org: "A-HOST / Academy of Advanced Services",
  role: "Assistant Software Professional · Cooperative Training",
  desc: "Worked on an automotive purchasing and sales management system for a major automotive brand under confidentiality requirements.",
  tech: ["Java", "Database", "Git"],
  certification: "Certified Assistant Software Professional · Sep 2021",
};

export const EDUCATION = {
  degree: "B.Sc. Software Engineering",
  school: "Burapha University, Faculty of Informatics",
  years: "2018 — 2022",
  detail: "GPA 3.18 / 4.00",
};

export const LANGUAGES = [
  { name: "Thai", level: "Native" },
  { name: "English", level: "Intermediate" },
];
