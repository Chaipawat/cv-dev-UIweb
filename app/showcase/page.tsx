import type { Metadata } from "next";
import Link from "next/link";
import { ProjectScene } from "@/components/site/project-scene";
import { Chips, delay, Eyebrow, Glow, pad, PageHero } from "@/components/site/primitives";
import { ArrowIcon } from "@/components/site/icons";
import { CATEGORY_LABELS, FEATURED_PROJECTS, formatProjectPeriod } from "@/data/projects";
import type { ProjectCategory } from "@/types/portfolio";

export const metadata: Metadata = {
  title: "Showcase — Chaipawat Jatuphattaranun",
  description:
    "Selected projects: web platforms, mobile apps, LINE LIFF booking and admin systems, with role, team and stack for each.",
};

const SHOWN = FEATURED_PROJECTS;

// Only categories that actually have shown projects become filters.
const FILTERS = (Object.keys(CATEGORY_LABELS) as ProjectCategory[])
  .map((id) => ({ id, label: CATEGORY_LABELS[id], count: SHOWN.filter((p) => p.categories.includes(id)).length }))
  .filter((f) => f.count > 0);

const years = SHOWN.map((p) => p.period.start);
const PERIOD = `${Math.min(...years)}—${Math.max(...SHOWN.map((p) => p.period.end ?? p.period.start))}`;

export default function ShowcasePage() {
  return (
    <>
      <PageHero>
        <div className="wrap">
          <Eyebrow className="reveal">Selected projects · {PERIOD}</Eyebrow>
          <h1 className="display page-hero__title reveal">
            Show<span className="serif-it">case</span>
            <span className="accent">.</span>
          </h1>
          <p className="page-hero__strong reveal">Real products, built and shipped.</p>
          <p className="lead reveal">
            Web platforms, mobile apps, LINE LIFF booking and admin systems — each with the role I played, the team around it and the
            stack it ran on. Open any project for the full case study.
          </p>
          <div className="meta-row reveal">
            <div className="meta meta--big">
              <div className="meta__k">Projects</div>
              <div className="meta__v">{pad(SHOWN.length)}</div>
            </div>
            <div className="meta meta--big">
              <div className="meta__k">Period</div>
              <div className="meta__v">{PERIOD}</div>
            </div>
            <div className="meta">
              <div className="meta__k">Platforms</div>
              <div className="meta__v">Web · Mobile · LINE LIFF · Admin</div>
            </div>
          </div>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter projects">
            <button className="filter" type="button" data-filter="all" aria-pressed="true">
              All <span className="filter__n">{pad(SHOWN.length)}</span>
            </button>
            {FILTERS.map((f) => (
              <button key={f.id} className="filter" type="button" data-filter={f.id} aria-pressed="false">
                {f.label} <span className="filter__n">{pad(f.count)}</span>
              </button>
            ))}
          </div>
          <p className="filter-status" data-filter-status aria-live="polite">
            Showing {pad(SHOWN.length)} / {pad(SHOWN.length)}
          </p>
          <div className="pgrid">
            {SHOWN.map((p, i) => (
              <article key={p.slug} className="pcard reveal" data-cats={p.categories.join(" ")} style={delay((i % 2) * 0.08)}>
                <div className="pcard__media" aria-hidden="true">
                  <Glow tone="peach" />
                  <ProjectScene project={p} active />
                </div>
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <span className="step__year">
                      {pad(i + 1)} · {formatProjectPeriod(p.period)}
                    </span>
                    <span className="chip">{p.type}</span>
                  </div>
                  <h2 className="display pcard__title">
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p>{p.description}</p>
                  <dl className="pcard__facts">
                    <div className="fact">
                      <dt>Role</dt>
                      <dd>{p.role}</dd>
                    </div>
                    <div className="fact">
                      <dt>Stack</dt>
                      <dd>
                        <Chips items={p.stack.slice(0, 5)} />
                      </dd>
                    </div>
                  </dl>
                  <span className="link-arrow">
                    View case study <ArrowIcon />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
