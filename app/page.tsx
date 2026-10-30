import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  CapIcon,
  CodeIcon,
  DiagIcon,
  FlowIcon,
  GitHubIcon,
  HandArrow,
  LinkedInIcon,
  MailIcon,
  MobileIcon,
  PlugIcon,
} from "@/components/site/icons";
import { ProjectScene } from "@/components/site/project-scene";
import { Button, Chips, Clay, delay, Eyebrow, Glow, LinkArrow, pad, Phone, Win } from "@/components/site/primitives";
import { CONTACT_LABELS, CONTACT_LINKS } from "@/data/contact";
import { portfolio } from "@/data/portfolio";
import { FEATURED_PROJECTS, PROJECTS, formatProjectPeriod, getProjectBySlug } from "@/data/projects";
import type { Project } from "@/types/portfolio";

const { profile, education, skills, progression, contact } = portfolio;

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.positioning}`,
  description: `${profile.summary} ${profile.statement}`,
  openGraph: {
    title: `${profile.displayName} — ${profile.positioning}`,
    description: profile.statement,
    type: "website",
  },
};

/** Newest company project, flagged "Latest" in Selected Work. */
const LATEST = [...FEATURED_PROJECTS].reverse().find((p) => p.experienceId)?.slug;

function splitTitle(title: string) {
  const [first, ...rest] = title.split(" ");
  return rest.length ? (
    <>
      {first}
      <br />
      {rest.join(" ")}
    </>
  ) : (
    title
  );
}

function Hero() {
  const zonepang = getProjectBySlug("zonepang-platform")!.images.gallery[0];
  const liff = getProjectBySlug("badminton-booking")!.images.gallery[1];
  const portrait = profile.portraits.primary;
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <Eyebrow live className="reveal">
            <b>{profile.availability.text}</b> · Chonburi, TH
          </Eyebrow>
          <h1 className="display hero__title">
            <span className="line">
              <span style={delay(0.05)}>
                Software<span className="serif-it">({profile.nickname})</span>
              </span>
            </span>
            <span className="line">
              <span style={delay(0.15)}>
                Developer<span className="accent">.</span>
              </span>
            </span>
          </h1>
          <p className="lead hero__lead reveal" style={delay(0.3)}>
            <strong>{profile.fullName}</strong> — a frontend-focused developer building web, mobile and product interfaces that ship to real users.
          </p>
          <div className="hero__ctas reveal" style={delay(0.4)}>
            <a className="btn btn--primary" href="#selected-work">
              View selected work{" "}
              <span className="btn__icon">
                <ArrowIcon />
              </span>
            </a>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
            {contact.cvUrl ? (
              <Button href={contact.cvUrl} variant="ghost" download>
                Download CV
              </Button>
            ) : null}
          </div>
          <div className="hero__stats reveal" style={delay(0.5)}>
            <div>
              <div className="stat__num">
                4<sup>+</sup>
              </div>
              <div className="stat__label">Years experience</div>
            </div>
            <div>
              <div className="stat__num">{pad(PROJECTS.length)}</div>
              <div className="stat__label">Projects</div>
            </div>
            <div>
              <div className="stat__num">03</div>
              <div className="stat__label">Web · Mobile · LIFF</div>
            </div>
          </div>
        </div>

        <div className="hero__stage" data-parallax aria-hidden="true">
          <Glow tone="sand" />
          <Glow tone="accent" />
          <Glow tone="peach" />
          <div className="layer" data-depth="0.4" style={{ inset: 0 }}>
            <div className="portrait layer float float--slow">
              <Image src={portrait.src} alt="" width={1280} height={1280} sizes="(max-width: 900px) 60vw, 360px" priority />
              <span className="portrait__tag">
                <span className="dot" />
                {profile.nickname} · Frontend
              </span>
            </div>
          </div>
          <div className="layer" data-depth="0.8" style={{ inset: 0 }}>
            <Win img={{ ...zonepang, alt: "" }} url="zonepang.com" className="layer float" sizes="(max-width: 900px) 60vw, 400px" />
          </div>
          <div className="layer" data-depth="1.1" style={{ inset: 0 }}>
            <Phone img={{ ...liff, alt: "" }} className="layer float float--fast" sizes="(max-width: 900px) 30vw, 180px" />
          </div>
          <div className="layer" data-depth="1.6" style={{ inset: 0 }}>
            <Clay kind="seal" className="layer float">
              龍
            </Clay>
          </div>
          <div className="layer" data-depth="1.3" style={{ inset: 0 }}>
            <Clay kind="chip" className="layer float float--slow">
              &lt;/&gt;
            </Clay>
          </div>
          <div className="layer" data-depth="2.4" style={{ inset: 0 }}>
            <Clay kind="sphere" className="layer blur-near float float--fast" style={{ width: 84, height: 84 }} />
          </div>
          <div className="layer" data-depth="0.2" style={{ inset: 0 }}>
            <Clay kind="ring" className="layer blur-near float" />
          </div>
          <div className="note">
            <span className="hand">shipped to real users!</span>
            <HandArrow style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

const MARQUEE = ["React", "Next.js", "TypeScript", "React Native", "LINE LIFF", "Payments", "REST API", "Figma"];

function Marquee() {
  const item = (
    <div className="marquee__item">
      {MARQUEE.map((m, i) => (
        <span key={m} style={{ display: "contents" }}>
          <span>{i % 2 ? <span className="serif-it">{m}</span> : m}</span>
          <i />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {item}
        {item}
      </div>
    </div>
  );
}

function Statement() {
  return (
    <section className="section statement">
      <Glow tone="peach" />
      <div className="wrap">
        <Eyebrow className="reveal">What I do</Eyebrow>
        <h2 className="display statement__title reveal" style={{ ...delay(0.1), marginTop: 28 }}>
          I build <span className="serif-it">interfaces</span>
          <br />
          for real products<span className="accent">.</span>
        </h2>
        <p className="lead reveal" style={delay(0.2)}>
          {profile.statement}
        </p>
      </div>
    </section>
  );
}

function Step({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  const focus = project.focus?.length ? project.focus : project.responsibilities.slice(0, 3);
  return (
    <article className="step" data-label={project.type}>
      <div className="step__media" aria-hidden="true">
        <ProjectScene project={project} active />
      </div>
      <div className="step__meta">
        <span className="step__year">
          {pad(index + 1)} · {formatProjectPeriod(project.period)}
        </span>
        <span className="chip">{project.type}</span>
        {project.slug === LATEST ? <span className="chip chip--new">Latest</span> : null}
      </div>
      <h3 className="display step__title">
        <Link href={href}>{splitTitle(project.title)}</Link>
      </h3>
      <p>{project.description}</p>
      <dl className="step__facts">
        <div className="fact">
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="fact">
          <dt>Focus</dt>
          <dd>{focus.join(" · ")}</dd>
        </div>
        <div className="fact">
          <dt>Stack</dt>
          <dd>
            <Chips items={project.stack.slice(0, 4)} />
          </dd>
        </div>
      </dl>
      <LinkArrow href={href}>Read case study</LinkArrow>
    </article>
  );
}

function SelectedWork() {
  return (
    <section className="section" id="selected-work" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <Eyebrow className="reveal">01 — Selected work</Eyebrow>
            <h2 className="display s-head__title reveal">
              Selected <span className="serif-it accent">work</span>
            </h2>
          </div>
          <LinkArrow href="/work" className="link-arrow reveal">
            All work
          </LinkArrow>
        </div>
        <div className="story">
          <div className="story__stage">
            <div className="stage">
              <Glow tone="accent" />
              <Glow tone="peach" />
              <div className="stage__count">
                <b data-stage-count>01</b>
                <span>/ {pad(FEATURED_PROJECTS.length)}</span>
              </div>
              <span className="chip stage__label" data-stage-label>
                {FEATURED_PROJECTS[0].type}
              </span>
              {FEATURED_PROJECTS.map((p, i) => (
                <ProjectScene key={p.slug} project={p} active={i === 0} />
              ))}
              <div className="stage__bar">
                <span data-stage-bar />
              </div>
            </div>
          </div>
          <div className="story__steps">
            {FEATURED_PROJECTS.map((p, i) => (
              <Step key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectIndex() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <Eyebrow className="reveal">02 — Project index</Eyebrow>
            <h2 className="display s-head__title reveal">
              Project <span className="serif-it accent">index</span>
            </h2>
          </div>
          <span className="chip reveal">{pad(PROJECTS.length)} projects</span>
        </div>
        <ol className="index-list">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="index-row reveal" style={delay(i * 0.04)}>
              <Link href={`/work/${p.slug}`}>
                <span className="index-row__no">{pad(i + 1)}</span>
                <span className="index-row__name">{p.title}</span>
                <span className="index-row__type">{p.shortType}</span>
                <span className="index-row__year">{formatProjectPeriod(p.period)}</span>
                <span className="index-row__go">
                  <DiagIcon />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experience() {
  const bty = portfolio.experience.find((e) => e.id === "bty-marketing")!;
  const projectCount = new Set(progression.flatMap((s) => s.projectSlugs)).size;
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <Eyebrow className="reveal">
              03 — {bty.company} · {bty.periodLabel}
            </Eyebrow>
            <h2 className="display s-head__title reveal">
              Experience <span className="serif-it accent">progression</span>
            </h2>
          </div>
        </div>
        <ol className="xp" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {progression.map((s, i) => (
            <li key={s.year} className="xp__item reveal" style={delay(i * 0.08)}>
              <span className="xp__dot" />
              <div className="xp__card">
                <div className="xp__year">{s.year}</div>
                <div className="xp__kind">{s.shift}</div>
                <h3 className="xp__title">{s.title}</h3>
                <Chips items={s.projectSlugs.map((slug) => getProjectBySlug(slug)?.title ?? slug)} />
              </div>
            </li>
          ))}
        </ol>
        <div className="xp__foot reveal">
          <span>
            {progression[0].year} → {progression[progression.length - 1].year} · {pad(progression.length)} steps · {pad(projectCount)} projects
          </span>
          <LinkArrow href="/work">See all work</LinkArrow>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const cells = [
    { key: "frontend", icon: <CodeIcon />, glow: "peach" as const },
    { key: "mobile", icon: <MobileIcon />, glow: "accent" as const },
    { key: "integration", icon: <PlugIcon />, glow: null },
    { key: "workflow", icon: <FlowIcon />, glow: "sand" as const },
  ] as const;
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="s-head">
          <div>
            <Eyebrow className="reveal">04 — Capabilities</Eyebrow>
            <h2 className="display s-head__title reveal">
              What I <span className="serif-it accent">work with</span>
            </h2>
          </div>
          <LinkArrow href="/about" className="link-arrow reveal">
            How I work
          </LinkArrow>
        </div>
        <div className="bento">
          {cells.map((c, i) => (
            <div key={c.key} className={`cell cell--${c.key} reveal`} style={delay((i % 2) * 0.08)}>
              {c.glow ? <Glow tone={c.glow} /> : null}
              <div className="cell__icon">{c.icon}</div>
              <h3 className="display cell__title">{skills[c.key].label}</h3>
              <Chips items={skills[c.key].items} />
            </div>
          ))}
          <div className="cell cell--backend reveal">
            <div>
              <h3>{skills.backendFamiliarity.label.replace("Familiarity", "familiarity")}</h3>
              <p>
                {skills.backendFamiliarity.items.join(" · ")}. Reading backend code to understand API flow — backend is not my primary responsibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPanel() {
  const edu = education[0];
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="about-panel reveal">
          <Glow tone="accent" />
          <Glow tone="peach" />
          <div className="about__photo">
            <Image
              className="about__main"
              src={profile.portraits.university.src}
              alt={profile.portraits.university.alt}
              width={1080}
              height={1079}
              sizes="(max-width: 900px) 90vw, 480px"
            />
            <div className="about__polaroid">
              <Image src={profile.portraits.secondary.src} alt={profile.portraits.secondary.alt} width={852} height={1280} sizes="180px" />
            </div>
            <Clay kind="seal" className="float">
              龍
            </Clay>
            <div className="note" aria-hidden="true">
              <span className="hand">Burapha SE!</span>
              <HandArrow />
            </div>
          </div>
          <div>
            <span
              className="eyebrow"
              style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.12)", color: "rgba(244,240,232,.75)", boxShadow: "none" }}
            >
              <span className="dot" />
              05 — About
            </span>
            <h2 className="display about__title" style={{ marginTop: 24 }}>
              {profile.fullName.split(" ")[0]} <span className="serif-it">{profile.nickname}</span>
            </h2>
            <p className="lead">{profile.summary}</p>
            <div className="edu">
              <span className="edu__icon">
                <CapIcon />
              </span>
              <div>
                <b>{edu.degree}</b>
                <span>{edu.university}</span>
              </div>
            </div>
            <Button href="/about" variant="light">
              More about me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const CARD_ICONS: Record<string, React.ReactNode> = { EMAIL: <MailIcon />, LINKEDIN: <LinkedInIcon />, GITHUB: <GitHubIcon /> };

function Contact() {
  const links = CONTACT_LINKS.filter((l) => l.key in CARD_ICONS && l.href);
  const email = CONTACT_LINKS.find((l) => l.key === "EMAIL")!;
  return (
    <section className="section contact" style={{ paddingTop: 60 }}>
      <Glow tone="accent" />
      <div className="wrap">
        <Eyebrow live className="reveal">
          06 — Contact
        </Eyebrow>
        <h2 className="display contact__title reveal">
          Let’s build
          <br />
          something<span className="accent-dot">.</span>
        </h2>
        <p className="lead reveal">Available for opportunities — frontend, software development and product work.</p>
        <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Button href={email.href!}>Say hello</Button>
          <Button href="/contact" variant="ghost">
            All contact details
          </Button>
          {contact.cvUrl ? (
            <Button href={contact.cvUrl} variant="ghost" download>
              Download CV
            </Button>
          ) : null}
        </div>
        <div className="contact__cards">
          {links.map((l, i) => (
            <a
              key={l.key}
              className="ccard reveal"
              style={delay(i * 0.08)}
              href={l.href}
              {...(l.href!.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
            >
              <div className="ccard__top">
                <span className="ccard__icon">{CARD_ICONS[l.key]}</span>
                <DiagIcon />
              </div>
              <div>
                <div className="ccard__label">{CONTACT_LABELS[l.key]}</div>
                <div className="ccard__value">{l.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <SelectedWork />
      <ProjectIndex />
      <Experience />
      <Capabilities />
      <AboutPanel />
      <Contact />
    </>
  );
}
