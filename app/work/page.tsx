import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProjectScene } from "@/components/site/project-scene";
import { Chips, Eyebrow, LinkArrow, pad, PageHero } from "@/components/site/primitives";
import { portfolio } from "@/data/portfolio";
import { FEATURED_PROJECTS, formatProjectPeriod } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Chaipawat Jatuphattaranun",
  description: "Professional timeline: education, internship and software development work.",
};

const { education, experience } = portfolio;

interface Item {
  key: string;
  when: string;
  kind: string;
  title: string;
  org: string;
  sub?: string;
  desc?: string;
  stack?: string[];
  note?: { label: string; text: string };
  href?: string;
  media?: ReactNode;
}

function Doc({ src, alt, title, issuer, date }: { src: string; alt: string; title: string; issuer: string; date: string }) {
  return (
    <a className="doc" href={src} target="_blank" rel="noopener">
      <Image src={src} alt={alt} width={1672} height={941} sizes="(max-width: 900px) 90vw, 440px" />
      <div className="doc__cap">
        <div>
          <b>{title}</b>
          {issuer} · {date}
        </div>
        <span className="doc__open">Open document ↗</span>
      </div>
    </a>
  );
}

const bty = experience.find((e) => e.id === "bty-marketing")!;
const internship = experience.find((e) => e.id === "internship")!;
const edu = education[0];

const ITEMS: Item[] = [
  {
    key: "education",
    when: String(edu.graduationYear),
    kind: "Education",
    title: edu.university,
    org: edu.degree,
    sub: edu.faculty,
    note: { label: "Focus", text: "Software Engineering foundations — Programming · Databases · Systems" },
    media: (
      <Doc
        src="/certificate/burapha-certi.png"
        alt="Burapha University bachelor degree certificate awarded to Chaipawat Jatuphattaranun"
        title="Bachelor’s Degree Certificate"
        issuer={`${edu.university} — ${edu.faculty}`}
        date="19 Apr 2022"
      />
    ),
  },
  {
    key: "internship",
    when: internship.periodLabel,
    kind: "Internship",
    title: internship.role,
    org: "Cooperative training",
    note: internship.project
      ? { label: "Project", text: `${internship.project.name} — ${internship.project.stack.join(" · ")}` }
      : undefined,
    media: (
      <Doc
        src="/certificate/intern-certi.png"
        alt="Assistant Software Professional cooperative training certificate awarded to Chaipawat Jatuphattaranun"
        title="Assistant Software Professional"
        issuer="AI-HOST — Academy of Advanced Services"
        date="21 Sep 2021"
      />
    ),
  },
  { key: "bty", when: bty.periodLabel, kind: bty.role, title: bty.role, org: bty.company ?? "" },
  ...FEATURED_PROJECTS.map((p) => ({
    key: p.slug,
    when: formatProjectPeriod(p.period),
    kind: `Project / ${p.experienceId ? p.type.split(" /")[0] : "Personal"}`,
    title: p.title,
    org: p.experienceId ? (experience.find((e) => e.id === p.experienceId)?.company ?? "Company project") : "Personal Project",
    sub: p.role,
    desc: p.description,
    stack: p.stack.slice(0, 5),
    href: `/work/${p.slug}`,
    media: (
      <Link className="tl-media" href={`/work/${p.slug}`} aria-label={`${p.title} case study`}>
        <div className="glow glow--peach" />
        <ProjectScene project={p} active />
      </Link>
    ),
  })),
];

export default function WorkPage() {
  return (
    <>
      <PageHero>
        <div className="wrap">
          <Eyebrow className="reveal">2020 — Present</Eyebrow>
          <h1 className="display page-hero__title reveal">
            Work <span className="serif-it">timeline</span>
            <span className="accent">.</span>
          </h1>
          <p className="lead reveal">A timeline of work, learning, and projects.</p>
          <div className="meta-row reveal">
            <div className="meta meta--big">
              <div className="meta__k">Steps</div>
              <div className="meta__v">{pad(ITEMS.length)}</div>
            </div>
            <div className="meta">
              <div className="meta__k">Stages</div>
              <div className="meta__v">University · Internship · {bty.company}</div>
            </div>
          </div>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ol className="tl">
            {ITEMS.map((it, i) => (
              <li key={it.key} className="tl-item reveal">
                <div className="tl-item__when">
                  <div className="tl-item__year">{it.when}</div>
                  <div className="tl-item__kind">{it.kind}</div>
                </div>
                <span className="tl-item__dot" aria-hidden="true" />
                <div className={it.media ? "tl-card" : "tl-card tl-card--plain"}>
                  <div>
                    <div className="tl-card__step">
                      STEP {pad(i + 1)} / {pad(ITEMS.length)}
                    </div>
                    <h2 className="display tl-card__title">{it.title}</h2>
                    <div className="tl-card__org">{it.org}</div>
                    {it.sub ? <div className="tl-card__sub">{it.sub}</div> : null}
                    {it.desc ? <p>{it.desc}</p> : null}
                    {it.stack ? <Chips items={it.stack} /> : null}
                    {it.note ? (
                      <div className="tl-card__note">
                        <b>{it.note.label}</b>
                        {it.note.text}
                      </div>
                    ) : null}
                    {it.href ? <LinkArrow href={it.href}>View case study</LinkArrow> : null}
                  </div>
                  {it.media ?? null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
