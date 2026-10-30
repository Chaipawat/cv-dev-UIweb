import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/site/icons";
import { CaseStudyStage } from "@/components/site/project-scene";
import { Chips, Eyebrow, Glow, pad, Phone, Shot, Win } from "@/components/site/primitives";
import { portfolio } from "@/data/portfolio";
import { PROJECT_SLUGS, PROJECTS, formatProjectPeriod, getNextProject, getProjectBySlug, getProjectNumber } from "@/data/projects";
import { getCaseStudyMedia } from "@/lib/project-media";
import type { Project, ProjectImage } from "@/types/portfolio";

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
      siteName: portfolio.profile.fullName,
      // This object replaces the root openGraph, so projects without
      // screenshots point back at the site-wide card (app/opengraph-image).
      images: [{ url: project.images.cover ?? "/opengraph-image" }],
    },
  };
}

function overview(project: Project): [string, string[]][] {
  const rows: [string, string[] | undefined][] = [
    [
      "Team",
      project.team
        ? [
            project.team.frontend && `${project.team.frontend} Frontend`,
            project.team.backend && `${project.team.backend} Backend`,
            project.team.manager && `${project.team.manager} Manager`,
          ].filter((x): x is string => Boolean(x))
        : undefined,
    ],
    ["Platform", project.platforms],
    ["Focus", project.focus],
    ["Contribution", project.contribution],
    ["Category", project.categories.map((c) => ({ liff: "LIFF", web: "Web", mobile: "Mobile", admin: "Admin", extension: "Extension", personal: "Personal" })[c])],
  ];
  return rows.filter((r): r is [string, string[]] => Boolean(r[1]?.length));
}

function Screens({ images }: { images: ProjectImage[] }) {
  const phones = images.filter((i) => i.height > i.width);
  const cls = phones.length === images.length ? "screens screens--phones" : phones.length ? "screens screens--mixed" : "screens";
  return (
    <div className={cls}>
      {images.map((img) => (
        <figure key={img.src}>
          {img.height > img.width ? (
            <Phone img={img} sizes="(max-width: 600px) 45vw, 220px" />
          ) : img.category === "extension" || img.category === "detail" ? (
            <div className="win">
              <Shot img={img} sizes="(max-width: 600px) 90vw, 460px" />
            </div>
          ) : (
            <Win img={img} sizes="(max-width: 600px) 90vw, 560px" />
          )}
          {img.caption ? <figcaption>{img.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const number = getProjectNumber(project.slug);
  const { hero, rest } = getCaseStudyMedia(project);
  // The stage shows at most one layered phone; any other lead layer joins SCREENS.
  const screens = [...(hero?.kind === "desktop" ? hero.layers.slice(1) : []), ...rest];
  const notes = [project.context, ...(project.notes ?? []), project.confidentiality?.note].filter((n): n is string => Boolean(n));
  const features = project.features ?? [];

  // Sections are numbered after optional ones are dropped, so the index never skips.
  type Section = { label: string; content: ReactNode };
  const candidates: (Section | null)[] = [
    {
      label: "Overview",
      content: (
        <div className="ov-grid">
          {overview(project).map(([k, v]) => (
            <div key={k} className="meta">
              <div className="meta__k">{k}</div>
              <Chips items={v} />
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Summary",
      content: (
        <>
          <p className="cs-summary">{project.description}</p>
          {notes.length ? (
            <div className="cs-notes">
              {notes.map((n) => (
                <span key={n} className="cs-note">
                  {n}
                </span>
              ))}
            </div>
          ) : null}
        </>
      ),
    },
    project.team
      ? {
          label: "Role / small team",
          content: (
            <>
              <div className="team">
                <div className="team__m team__m--me">
                  <b>{project.team.frontend ?? 1}</b>
                  <div>FRONTEND — ME</div>
                </div>
                <div className="team__m">
                  <b>{project.team.backend ?? 0}</b>
                  <div>BACKEND</div>
                </div>
                <div className="team__m">
                  <b>{project.team.manager ?? 0}</b>
                  <div>MANAGER</div>
                </div>
              </div>
              <p className="cs-sub">{portfolio.profile.teamScope}</p>
              <p className="cs-sub">{portfolio.profile.backendBoundary}</p>
            </>
          ),
        }
      : null,
    {
      label: "What I worked on",
      content: (
        <ol className="work-list">
          {project.responsibilities.map((r, i) => (
            <li key={r}>
              <span>{pad(i + 1)}</span>
              {r}
            </li>
          ))}
        </ol>
      ),
    },
    project.highlights?.length
      ? {
          label: "Feature highlights",
          content: (
            <div className="feat">
              {project.highlights.map((h, i) => (
                <div key={h.title} className="feat__card">
                  <div className="feat__n">{i + 1}</div>
                  <h3>{h.title}</h3>
                  <p>{h.description}</p>
                  <Chips items={h.items} />
                </div>
              ))}
            </div>
          ),
        }
      : features.length
        ? { label: "Feature highlights", content: <Chips items={features} className="hl-chips" /> }
        : null,
    screens.length ? { label: "Screens", content: <Screens images={screens} /> } : null,
    {
      label: "Stack",
      content: (
        <>
          <Chips items={project.stack} className="stack-chips" />
          {project.backendFamiliarity ? (
            <div className="backend-note">
              <b>BACKEND FAMILIARITY</b>
              {project.backendFamiliarity} — not backend ownership.
            </div>
          ) : null}
        </>
      ),
    },
  ];
  const sections = candidates.filter((s): s is Section => s !== null);

  return (
    <>
      <section className="cs-hero">
        <Glow tone="accent" />
        <div className="wrap">
          <div className="cs-hero__top reveal">
            <Link className="back-link" href="/work">
              <ArrowIcon /> Work
            </Link>
            <span className="chip">
              Case study · {pad(number)} / {pad(PROJECTS.length)}
            </span>
          </div>
          <h1 className="display cs-hero__title reveal">
            {project.title}
            <span className="accent">.</span>
          </h1>
          <p className="cs-hero__sub reveal">{project.type}</p>
          <div className="meta-row reveal">
            <div className="meta">
              <div className="meta__k">Year</div>
              <div className="meta__v">{formatProjectPeriod(project.period)}</div>
            </div>
            <div className="meta">
              <div className="meta__k">Role</div>
              <div className="meta__v">{project.role}</div>
            </div>
          </div>
          <div className="media-card cs-stage reveal">
            <Glow tone="accent" />
            <Glow tone="peach" />
            <CaseStudyStage project={project} />
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingTop: "clamp(48px,6vw,80px)" }}>
        {sections.map((s, i) => (
          <section key={s.label} className="cs-sec reveal">
            <div className="cs-sec__label">
              <Eyebrow>
                {pad(i + 1)} — {s.label}
              </Eyebrow>
            </div>
            <div>{s.content}</div>
          </section>
        ))}
        <Link className="next reveal" href={`/work/${next.slug}`}>
          <Glow tone="accent" />
          <div>
            <div className="next__k">
              NEXT PROJECT · {pad(getProjectNumber(next.slug))} / {pad(PROJECTS.length)}
            </div>
            <div className="display next__t">{next.title}</div>
            <div className="next__s">
              {next.type} — {formatProjectPeriod(next.period)}
            </div>
          </div>
          <span className="next__go">
            <ArrowIcon size={32} />
          </span>
        </Link>
      </div>
      <div style={{ height: "clamp(60px,8vw,120px)" }} />
    </>
  );
}
