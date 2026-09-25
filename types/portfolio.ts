export type ProjectCategory = "web" | "mobile" | "liff" | "admin" | "extension" | "personal";

export interface ProjectImage {
  /** Path under /public, e.g. "/projects/badminton-booking/admin/dashboard.webp". */
  src: string;
  alt: string;
  /**
   * Intrinsic pixel size of the file — keeps the real aspect ratio, prevents
   * layout shift, and decides the framing (see lib/project-media.ts).
   */
  width: number;
  height: number;
  /** "detail" and "extension" mark supporting evidence (store listing, extension card), never the lead screen. */
  category: "web" | "mobile" | "admin" | "extension" | "flow" | "detail";
  caption?: string;
  /** CSS object-position used when a browser frame crops to 2:1, e.g. "30% 20%". */
  focus?: string;
  /** Label shown in a browser frame's address bar (sanitized, never a real private URL). */
  urlLabel?: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
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
  /** Compact type for index rows, e.g. "LINE LIFF" or "Mobile App". */
  shortType: string;
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

  /** Short product-focus tags for metadata, e.g. ["Booking", "Payment"]. */
  focus?: string[];
  /** Short contribution tags for metadata, e.g. ["UI Implementation", "Testing"]. */
  contribution?: string[];

  responsibilities: string[];
  features?: string[];
  /** Curated feature narratives for the case-study page. */
  highlights?: ProjectHighlight[];
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

/** One step of the condensed career progression (Legacy Extension → … → LINE LIFF). */
export interface ProgressionStep {
  year: string;
  title: string;
  /** What changed at this step, e.g. "Legacy extension maintenance". */
  shift: string;
  projectSlugs: string[];
}

export type SkillGroupKey = "frontend" | "mobile" | "integration" | "workflow" | "backendFamiliarity";

export interface SkillGroup {
  label: string;
  items: string[];
}
