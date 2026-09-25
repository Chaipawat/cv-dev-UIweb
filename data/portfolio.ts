import type { Education, Experience, ProgressionStep, Project, SkillGroup, SkillGroupKey } from "@/types/portfolio";

/**
 * Canonical source of truth for every piece of portfolio content.
 * Other data files (timeline, contact, projects) and components
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

  /** Product surfaces named in the statement copy. */
  domains: ["Web", "Mobile", "LINE LIFF", "Admin Systems", "Booking Flows", "Payments", "Product Interfaces"],

  /** What Ryu is available for. */
  availableFor: ["Frontend", "Software Development", "Product Work"],

  /** How Ryu works inside the usual 1 Frontend / 1 Backend / 1 Manager team. */
  teamScope:
    "I handled the front-end side of the product — discussing requirements, implementing UI and responsive layouts, integrating APIs, giving UI/UX feedback, handling application states, testing user flows and fixing bugs.",
  backendBoundary:
    "Backend services were built by the backend developer. Backend development is not my primary responsibility.",

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
 * Company screenshots are listed only once an approved asset exists under
 * /public/projects/<slug>/ (see docs/context.md — IMAGE ASSET SYSTEM).
 */
const projects: Project[] = [
  {
    slug: "badminton-booking",
    title: "Badminton Booking",
    shortTitle: "Badminton",
    period: { start: 2025, end: 2026 },
    type: "LINE LIFF / Web Application / Admin",
    shortType: "LINE LIFF",
    categories: ["liff", "web", "admin"],
    platforms: ["LINE LIFF", "Admin Web"],
    description:
      "Customer-facing LINE LIFF booking app and admin interface covering court and time-slot booking, membership packages, QR payment and booking history.",
    role: "Frontend Developer",
    experienceId: "bty-marketing",
    team: { frontend: 1, backend: 1, manager: 1 },
    focus: ["Booking", "Membership", "Payment", "Admin"],
    contribution: ["UI Implementation", "Responsive Design", "API Integration", "UX Feedback", "Testing", "Bug Fixing"],
    highlights: [
      {
        title: "LINE LIFF booking flow",
        description:
          "A mobile-first booking flow that runs inside LINE: pick a court, choose a time slot, confirm the booking.",
        items: ["Court selection", "Time-slot selection", "Booking confirmation"],
      },
      {
        title: "Membership & packages",
        description: "Membership and package flows so players can buy and use packages as part of booking.",
        items: ["Membership", "Package flow"],
      },
      {
        title: "QR payment & status",
        description:
          "Payment-related UI with QR payment, plus clear booking and payment status states driven by the API.",
        items: ["QR payment", "Booking status", "Payment status"],
      },
      {
        title: "Booking history",
        description: "A history view so customers can look back at past and upcoming bookings.",
        items: ["Booking history"],
      },
      {
        title: "Admin interface",
        description: "The admin side of the same product, for staff working with bookings, members and payments.",
        items: ["Dashboard", "Bookings", "Members", "Payments"],
      },
    ],
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
      // Exact approved source files supplied for this project. Intrinsic
      // dimensions prevent layout shift when rendered through next/image.
      cover: "/projects/badminton-booking/badminton-admin-dashboard.png",
      gallery: [
        {
          src: "/projects/badminton-booking/badminton-admin-dashboard.png",
          alt: "Badminton booking admin dashboard",
          width: 1897,
          height: 910,
          category: "admin",
          treatment: "browser",
          group: "admin",
          caption: "Admin dashboard",
          urlLabel: "admin / dashboard",
          focus: "53% 48%",
        },
        {
          src: "/projects/badminton-booking/lineliff.jpg",
          alt: "Badminton booking LINE LIFF home and booking interface",
          width: 449,
          height: 910,
          category: "mobile",
          treatment: "phone",
          group: "booking",
          caption: "LINE LIFF home / booking",
        },
        {
          src: "/projects/badminton-booking/badminton-liff-booking.png",
          alt: "Badminton booking LINE LIFF calendar and booking flow",
          width: 870,
          height: 1882,
          category: "mobile",
          treatment: "phone",
          group: "membership",
          caption: "LINE LIFF calendar / booking flow",
        },
      ],
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
    shortType: "Web Platform",
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
    backendFamiliarity: "Node.js code reading to understand API flow",
    featured: true,
    confidentiality: COMPANY_CONFIDENTIALITY,
    images: {
      cover: "/projects/zonepang/zonepang-home.png",
      gallery: [
        {
          src: "/projects/zonepang/zonepang-home.png",
          alt: "Zonepang platform home showing its connected product modules",
          width: 1905,
          height: 914,
          category: "web",
          treatment: "browser",
          caption: "Zonepang Home",
        },
        {
          src: "/projects/zonepang/broadpang-platform.png",
          alt: "Broadpang broadcast interface within the Zonepang platform",
          width: 1718,
          height: 912,
          category: "web",
          treatment: "full",
          caption: "Broadpang",
        },
        {
          src: "/projects/zonepang/pumpang-platform.png",
          alt: "Pumpang service interface within the Zonepang platform",
          width: 1919,
          height: 912,
          category: "web",
          treatment: "full",
          caption: "Pumpang",
        },
        {
          src: "/projects/zonepang/ai-zonepang-platform.png",
          alt: "AI Zonepang creation interface within the platform",
          width: 1907,
          height: 908,
          category: "web",
          treatment: "full",
          caption: "AI Zonepang",
        },
      ],
    },
  },
  {
    slug: "zonepang-admin",
    title: "Zonepang Admin",
    period: { start: 2024, end: 2026 },
    type: "Admin / Back-office",
    shortType: "Admin",
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
    shortType: "Mobile App",
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
    images: {
      cover: "/projects/kumtone/kumtone-tones.jpg",
      gallery: [
        {
          src: "/projects/kumtone/kumtone-tones.jpg",
          alt: "Kumtone mobile tone library with favorite film filters and photographic tone previews",
          width: 870,
          height: 1882,
          category: "mobile",
          caption: "TONE LIBRARY",
          treatment: "phone",
        },
        {
          src: "/projects/kumtone/kumtone-camera-selection.jpg",
          alt: "Kumtone mobile camera selection with favorite cameras and film-camera styles",
          width: 870,
          height: 1882,
          category: "mobile",
          caption: "CAMERA SELECTION",
          treatment: "phone",
        },
        {
          src: "/projects/kumtone/kumtone-app-store.jpg",
          alt: "Kumtone listing on the Apple App Store with app icon and product previews",
          width: 870,
          height: 1882,
          category: "detail",
          caption: "APP STORE",
          treatment: "full",
        },
      ],
    },
  },
  {
    slug: "broadpang-extension",
    title: "Broadpang Extension",
    period: { start: 2022, end: 2023 },
    type: "Chrome Extension",
    shortType: "Extension",
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
    images: {
      cover: "/projects/broadpang-extension/broadpang-system.png",
      gallery: [
        {
          src: "/projects/broadpang-extension/broadpang-system.png",
          alt: "Legacy Broadpang working interface with broadcast editor and LINE message preview",
          width: 1917,
          height: 1033,
          category: "web",
          caption: "BROADPANG SYSTEM",
          treatment: "browser",
        },
        {
          src: "/projects/broadpang-extension/broadpang-chrome-extension.png",
          alt: "Installed Broadpang Chrome Extension version 3.0.8 in Chrome extension management",
          width: 417,
          height: 233,
          category: "extension",
          caption: "CHROME EXTENSION",
          treatment: "full",
        },
      ],
    },
  },
  {
    slug: "mini-game",
    title: "Offline Mini Game App",
    shortTitle: "Mini Game",
    period: { start: 2025, end: 2026 },
    type: "Offline Mobile Application",
    shortType: "Mobile App",
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
    images: {
      cover: "/projects/mini-game/minigame-home.jpg",
      gallery: [
        {
          src: "/projects/mini-game/minigame-home.jpg",
          alt: "PartyPlay offline game hub with party-game selection cards",
          width: 720,
          height: 1600,
          category: "mobile",
          caption: "GAME HUB",
          treatment: "phone",
        },
        {
          src: "/projects/mini-game/minigame-card.jpg",
          alt: "PartyPlay Bottle Spin game with an interactive bottle and colorful game pieces",
          width: 720,
          height: 1600,
          category: "mobile",
          caption: "BOTTLE SPIN",
          treatment: "phone",
        },
      ],
    },
  },
  {
    slug: "broadpang-web",
    title: "Broadpang Web",
    period: { start: 2023, end: 2023 },
    type: "Web Application",
    shortType: "Web App",
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
    shortType: "Personal",
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
    images: {
      cover: "/projects/devpath/devpath-home.png",
      gallery: [
        {
          src: "/projects/devpath/devpath-home.png",
          alt: "DevPath learning platform homepage with Understand, not memorize headline and the 3D Latte coding scene",
          width: 1911,
          height: 910,
          category: "web",
          caption: "DEVPATH HOME",
          treatment: "full",
        },
        {
          src: "/projects/devpath/devpath-learning-paths.png",
          alt: "DevPath structured learning paths for Foundation, Frontend, Backend, and Infrastructure and Delivery",
          width: 1916,
          height: 908,
          category: "web",
          caption: "LEARNING PATHS",
          treatment: "full",
        },
        {
          src: "/projects/devpath/devpath-content.png",
          alt: "DevPath Software Engineering Big Picture chapter with topic sidebar and table of contents",
          width: 1901,
          height: 904,
          category: "web",
          caption: "CHAPTER & NAVIGATION",
          treatment: "full",
        },
      ],
    },
  },
];

/** Condensed growth in scope and technology, oldest first. */
const progression: ProgressionStep[] = [
  { year: "2022", title: "Broadpang Extension", shift: "Legacy extension", projectSlugs: ["broadpang-extension"] },
  { year: "2023", title: "React Web", shift: "Component-based web", projectSlugs: ["broadpang-web"] },
  { year: "2024", title: "Zonepang", shift: "Next.js platform + admin", projectSlugs: ["zonepang-platform", "zonepang-admin"] },
  { year: "2025", title: "React Native", shift: "Mobile apps + in-app purchase", projectSlugs: ["kumtone", "mini-game"] },
  {
    year: "2025—2026",
    title: "LINE LIFF / Product Systems",
    shift: "Booking, membership, payment",
    projectSlugs: ["badminton-booking"],
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
  progression,
  contact,
};
