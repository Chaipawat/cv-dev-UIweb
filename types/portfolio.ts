export type ProjectCategory = "web" | "mobile" | "liff" | "admin" | "extension" | "personal";

export type ProjectImageTreatment = "full" | "browser" | "phone" | "crop" | "layered";

export interface ProjectImage {
  /** Path under /public, e.g. "/projects/badminton-booking/admin/dashboard.webp". */
  src: string;
  alt: string;
  /** Intrinsic pixel size of the file — keeps the real aspect ratio and prevents layout shift. */
  width: number;
  height: number;
  category: "web" | "mobile" | "admin" | "extension" | "flow" | "detail";
  caption?: string;
  /** How the screenshot should be framed when rendered. */
  treatment?: ProjectImageTreatment;
  /** ProjectMediaGroup id this screen belongs to. */
  group?: string;
  /** CSS object-position used by cropped treatments, e.g. "30% 20%". */
  focus?: string;
  /** Label shown in a browser frame's address bar (sanitized, never a real private URL). */
  urlLabel?: string;
}

/** Curated screenshot group for a project's visual story, e.g. "Booking Flow". */
export interface ProjectMediaGroup {
  id: string;
  title: string;
  /** Short list of screens/features the group covers. */
  items: string[];
}

export interface ProjectPeriod {
  start: number;
  /** null = ongoing. Equal to start for single-year projects. */
  end: number | null;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle?: string;

  period: ProjectPeriod;
  type: string;
  categories: ProjectCategory[];
  platforms?: string[];

  description: string;
  context?: string;

  role: string;
  /** Experience entry this project belongs to; omitted for personal projects. */
  experienceId?: string;

  team?: {
    frontend?: number;
    backend?: number;
    manager?: number;
  };

  responsibilities: string[];
  features?: string[];
  notes?: string[];

  stack: string[];
  backendFamiliarity?: string;

  featured: boolean;

  confidentiality?: {
    publicDetails: boolean;
    note?: string;
  };

  images: {
    cover?: string;
    gallery: ProjectImage[];
    groups?: ProjectMediaGroup[];
  };
}

export interface Experience {
  id: string;
  company: string | null;
  role: string;
  startDate: string;
  endDate: string | null;
  periodLabel: string;
  location?: string;
  summary: string;
  highlights: string[];
  /** Non-portfolio project worked on during this role (e.g. internship work). */
  project?: {
    name: string;
    stack: string[];
  };
}

export interface Education {
  degree: string;
  university: string;
  faculty: string;
  graduationYear: number | null;
}

export type SkillGroupKey = "frontend" | "mobile" | "integration" | "workflow" | "backendFamiliarity";

export interface SkillGroup {
  label: string;
  items: string[];
}
