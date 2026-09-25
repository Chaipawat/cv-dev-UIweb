import type { Education, Experience, Project, SkillGroup, SkillGroupKey } from "@/types/portfolio";

/**
 * Canonical source of truth for every piece of portfolio content.
 * Other data files (timeline, contact, showcase, projects) and components
 * must derive from this object instead of re-declaring names or stacks.
 */

const COMPANY_CONFIDENTIALITY = {
  publicDetails: false,
  note: "Company project — screenshots are sanitized and some details are omitted.",
};

const profile = {
  fullName: "Chaipawat Jatuphattaranun",
  displayName: "Chaipawat Jatuphattaranun (Ryu)",
  nickname: "Ryu",

  title: "Software Developer",
  positioning: "Frontend-focused Software Developer",

  location: "Chonburi, Thailand",

  experienceLabel: "4+ Years",

  summary:
    "Software Developer with 4+ years of professional experience developing web and mobile applications, primarily focused on front-end development.",

  statement:
    "Frontend-focused Software Developer working across web, mobile, LINE LIFF, admin systems, booking flows, payments, and product interfaces.",

  focusAreas: ["Web", "Mobile", "Product Interfaces"],

  availability: {
    openToWork: true,
    text: "Available for opportunities",
  },

  portraits: {
    primary: { src: "/src/images/profile_page1.jpg", alt: "Portrait of Chaipawat Jatuphattaranun" },
    secondary: { src: "/src/images/profile_page4.jpg", alt: "Portrait of Chaipawat Jatuphattaranun" },
  },
};

const education: Education[] = [
  {
    degree: "Bachelor’s Degree in Computer Software Engineering",
    university: "Burapha University",
    faculty: "Faculty of Informatics",

    // Do not show graduation year unless verified from CV.
    graduationYear: null,
  },
];

const experience: Experience[] = [
  {
    id: "bty-marketing",
    company: "BTY Marketing",
    role: "Software Developer",
    startDate: "2022-05",
    endDate: null,
    periodLabel: "May 2022 — Present",
    location: "Chonburi, Thailand",
    summary:
      "Front-end side of web, mobile, LINE LIFF, admin and extension products in a small team (1 Frontend, 1 Backend, 1 Manager) — from requirement discussions and UI implementation to API integration, testing and production bug fixing.",
    highlights: [
      "Requirement discussions",
      "UI implementation",
      "Responsive layouts",
      "REST API integration",
      "UI/UX feedback",
      "Application states",
      "Testing user flows",
      "Bug fixing",
      "Feature improvements",
    ],
  },
  {
    id: "internship",
    company: null,
    role: "Software Development Internship",
    startDate: "2020-12",
    endDate: "2021-09",
    periodLabel: "Dec 2020 — Sep 2021",
    summary:
      "Worked with Java, front-end, database, Git, and a purchasing / order-management system for an automotive project.",
    highlights: ["Java", "Front-end", "Database", "Git", "Purchasing / Order Management System"],
    project: {
      name: "Purchasing / Order Management System",
      stack: ["Java", "Front-end", "Database", "Git"],
    },
  },
];

const skills: Record<SkillGroupKey, SkillGroup> & { languages: string[]; aiTools: string[]; platforms: string[] } = {
  frontend: {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Responsive UI"],
  },
  mobile: {
    label: "Mobile",
    items: [
      "React Native",
      "Android Studio",
      "RevenueCat",
      "App Store / Google Play",
      "react-native-vision-camera",
      "AdMob",
    ],
  },
  integration: {
    label: "Integration",
    items: ["REST API", "LINE LIFF", "Payments", "QR Payment", "Socket Status"],
  },
  workflow: {
    label: "Workflow",
    items: ["Figma", "UI/UX Feedback", "Testing", "Debugging", "Bug Fixing", "Postman", "Git", "GitHub"],
  },
  backendFamiliarity: {
    label: "Backend Familiarity",
    items: ["Node.js", "API flow", "Request / response", "Integration debugging"],
  },

  languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Java", "C++", "C#"],
  platforms: ["Web", "Android", "iOS", "LINE LIFF", "Chrome Extension"],
  aiTools: ["ChatGPT", "Claude Code", "Gemini"],
};

const softSkills = [
  { name: "Communication", shortDescription: "Clear ideas. Clear collaboration." },
  { name: "Problem Solving", shortDescription: "Break complexity into practical steps." },
  { name: "Collaboration", shortDescription: "Work effectively across teams." },
  { name: "Adaptability", shortDescription: "Learn and adjust quickly." },
];

const workflow = [
  { step: "Understand", description: "Clarify the problem, the constraints and what success looks like." },
  { step: "Design", description: "Structure the interface and its states before writing components." },
  { step: "Build", description: "Implement with reusable components and real data paths." },
  { step: "Refine", description: "Test, debug, adjust motion and detail until it feels right." },
];

/**
 * Array order is the featured display order (Badminton → Zonepang → Kumtone →
 * Broadpang Extension → Mini Game → DevPath); non-featured projects sit
 * between them without affecting that sequence.
 *
 * Image galleries are empty until sanitized screenshots are added under
 * /public/projects/<slug>/ (see docs/context.md — IMAGE ASSET SYSTEM).
 */
const projects: Project[] = [
  {
    slug: "badminton-booking",
    title: "Badminton Booking",
    shortTitle: "Badminton",
    period: { start: 2025, end: 2026 },
    type: "LINE LIFF / Web Application / Admin",
    categories: ["liff", "web", "admin"],
    platforms: ["LINE LIFF", "Admin Web"],
    description:
      "Customer-facing LINE LIFF booking app and admin interface covering court and time-slot booking, membership packages, QR payment and booking history.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    team: { frontend: 1, backend: 1, manager: 1 },
    responsibilities: [
      "Customer-facing LINE LIFF interface",
      "Admin interface",
      "Responsive mobile-first booking flow",
      "API integration",
      "UI/UX feedback",
      "Testing",
      "Frontend bug fixing",
      "Integration debugging",
    ],
    features: [
      "Court selection",
      "Time-slot selection",
      "Booking flow",
      "Membership",
      "Package flow",
      "Payment-related UI",
      "QR payment",
      "Booking status",
      "Payment status",
      "Booking history",
    ],
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "REST API", "LINE LIFF", "Figma", "AI-assisted development"],
    backendFamiliarity: "Node.js code reading for API/integration debugging",
    featured: true,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: {
      // Add sanitized screenshots here once they are copied into
      // /public/projects/badminton-booking/{liff,admin,details}/. Entries whose
      // file is missing are skipped at build time (lib/project-media.ts). Example:
      // {
      //   src: "/projects/badminton-booking/liff/court-selection.webp",
      //   alt: "LINE LIFF court selection screen",
      //   width: 1170, height: 2532,
      //   category: "mobile", treatment: "phone", group: "booking",
      //   caption: "Court selection",
      // },
      gallery: [],
      groups: [
        { id: "booking", title: "Booking Flow", items: ["Court Selection", "Time Slot", "Confirmation"] },
        { id: "membership", title: "Membership + Payment", items: ["Package", "Membership", "QR Payment", "Status"] },
        { id: "admin", title: "Admin", items: ["Dashboard", "Bookings", "Members", "Payments"] },
      ],
    },
  },
  {
    slug: "zonepang-platform",
    title: "Zonepang Platform",
    shortTitle: "Zonepang",
    period: { start: 2024, end: 2026 },
    type: "Web Platform",
    categories: ["web"],
    platforms: ["Web"],
    description:
      "Major user-facing interfaces of a responsive web platform — forms, tables, dashboards, filters and flow-based interactive UI built from Figma designs.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    responsibilities: [
      "Major user-facing interfaces",
      "Responsive web",
      "Figma implementation",
      "UI structure",
      "UX feedback",
      "REST API integration",
      "Testing",
      "Frontend bug fixing",
    ],
    features: [
      "Forms",
      "Tables",
      "Dashboards",
      "Cards",
      "Filters",
      "Pagination",
      "Management UI",
      "Loading, empty and error states",
      "Validation",
      "Complex interactive UI",
      "Flow-based interfaces",
    ],
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "REST API", "Postman", "Figma"],
    backendFamiliarity: "Node.js",
    featured: true,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: { gallery: [] },
  },
  {
    slug: "zonepang-admin",
    title: "Zonepang Admin",
    period: { start: 2024, end: 2026 },
    type: "Admin / Back-office",
    categories: ["admin", "web"],
    platforms: ["Admin Web"],
    description:
      "Back-office dashboards, tables, forms and management screens for internal users, iterated on through their feedback.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    responsibilities: [
      "Responsive layouts",
      "REST API integration",
      "UI/UX discussion",
      "Bug fixing",
      "Internal user feedback iteration",
    ],
    features: ["Dashboards", "Tables", "Forms", "Filters", "Management screens", "Loading, error and empty states"],
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "REST API"],
    featured: false,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: { gallery: [] },
  },
  {
    slug: "kumtone",
    title: "Kumtone",
    period: { start: 2025, end: 2026 },
    type: "Mobile Photography Application",
    categories: ["mobile"],
    platforms: ["Android", "iOS"],
    description:
      "React Native photography app with film-style camera selection, camera-related interfaces, and subscription / in-app purchase flows on Android and iOS.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    responsibilities: [
      "React Native UI",
      "Mobile user flows",
      "REST API integration",
      "Mobile testing",
      "UI bug fixing",
      "Android/iOS release support",
    ],
    features: [
      "Camera-related interfaces",
      "Film-style camera selection",
      "Subscription flows",
      "In-app purchase flows",
      "RevenueCat",
      "Google Play Billing",
      "Apple App Store purchase flow",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "REST API",
      "Android Studio",
      "react-native-vision-camera",
      "RevenueCat",
      "Google Play Billing",
      "Apple App Store",
    ],
    featured: true,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: { gallery: [] },
  },
  {
    slug: "broadpang-extension",
    title: "Broadpang Extension",
    period: { start: 2022, end: 2023 },
    type: "Chrome Extension",
    categories: ["extension"],
    platforms: ["Chrome Extension"],
    description:
      "Maintenance and continued development of a legacy Chrome extension — tracing minified code, fixing UI bugs and reorganizing parts of the frontend.",
    context: "Originally developed by an outsourced team and later transferred to the internal team.",
    role: "Frontend Developer / Maintenance",
    experienceId: "bty-marketing",
    responsibilities: [
      "Studying an existing legacy codebase",
      "Tracing existing functions",
      "Understanding application flow",
      "Working with minified/protected legacy code",
      "UI maintenance",
      "Bug fixing",
      "Reorganizing parts of frontend code",
      "Continued internal development",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Chrome Extension"],
    featured: true,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: { gallery: [] },
  },
  {
    slug: "mini-game",
    title: "Offline Mini Game App",
    shortTitle: "Mini Game",
    period: { start: 2025, end: 2026 },
    type: "Offline Mobile Application",
    categories: ["mobile"],
    description:
      "Offline React Native party-game app with card drawing, bottle spinning and randomized mechanics, monetized with AdMob.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    responsibilities: [
      "React Native UI",
      "Game screens",
      "User interactions",
      "Responsive mobile layout",
      "Testing",
      "UI/interaction bug fixing",
      "AdMob integration",
      "Application build/release preparation",
    ],
    features: ["Card drawing mechanics", "Bottle spinning", "Randomized game mechanics"],
    notes: ["Core game does not use external APIs or backend services."],
    stack: ["React Native", "TypeScript", "Android Studio", "AdMob"],
    featured: true,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: { gallery: [] },
  },
  {
    slug: "broadpang-web",
    title: "Broadpang Web",
    period: { start: 2023, end: 2023 },
    type: "Web Application",
    categories: ["web"],
    platforms: ["Web"],
    description:
      "Main user-facing interfaces of a web application — early React work with reusable components, responsive layouts and REST API integration.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    responsibilities: [
      "Main user-facing interfaces",
      "Early React work",
      "Reusable components",
      "Responsive layouts",
      "REST API integration",
      "UI/product discussions",
      "Bug fixing",
      "Iterative improvements",
    ],
    stack: ["React", "JavaScript", "HTML", "CSS", "REST API"],
    featured: false,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: { gallery: [] },
  },
  {
    slug: "devpath",
    title: "DevPath",
    period: { start: 2026, end: null },
    type: "Personal Learning Web Application",
    categories: ["personal", "web"],
    platforms: ["Web"],
    description:
      "Personal learning web app for technical content — information architecture, responsive navigation and React/Next.js development with AI-assisted research.",
    role: "Personal Project",
    responsibilities: [
      "Web UI",
      "Information architecture",
      "Technical learning content",
      "Responsive navigation",
      "React/Next.js development",
      "AI-assisted research",
      "Implementation support",
      "Debugging",
      "Refactoring",
    ],
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "AI-assisted development"],
    featured: true,
    confidentiality: { publicDetails: true },
    images: { gallery: [] },
  },
];

const contact = {
  email: "chaipawat22247@gmail.com",
  phone: "0979405571",
  phoneMode: "show-number" as "show-number" | "available-on-cv",
  linkedin: "https://www.linkedin.com/in/chaipawat-jatuphattaranun-151429434",
  github: "https://github.com/Chaipawat",
  cvUrl: null as string | null,
};

export const portfolio = {
  profile,
  experience,
  education,
  skills,
  softSkills,
  workflow,
  projects,
  contact,
};
