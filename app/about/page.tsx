import type { Metadata } from "next";
import Image from "next/image";
import { HandArrow } from "@/components/site/icons";
import { Button, Chips, Clay, delay, Eyebrow, Glow, pad, PageHero } from "@/components/site/primitives";
import { portfolio } from "@/data/portfolio";

const { profile, education, workflow, skills, contact } = portfolio;

export const metadata: Metadata = {
  title: `About — ${profile.fullName}`,
  description: `${profile.positioning} based in ${profile.location}.`,
};

export default function AboutPage() {
  const edu = education[0];
  const [first, ...rest] = profile.fullName.split(" ");
  const facts = [
    ["Location", profile.location],
    ["Experience", `${profile.experienceLabel} Experience`],
    ["Education", edu.degree],
    ["University", `${edu.university} — ${edu.faculty}`],
    ["Languages", profile.spokenLanguages],
    ["Availability", profile.relocation],
  ];
  return (
    <>
      <PageHero>
        <div className="wrap about-hero">
          <div>
            <Eyebrow className="reveal">Profile</Eyebrow>
            <h1 className="display page-hero__title reveal">
              {first}
              <br />
              {rest.join(" ")} <span className="serif-it">{profile.nickname}</span>
            </h1>
            <p className="lead reveal">{profile.summary}</p>
            <div className="facts reveal">
              {facts.map(([k, v]) => (
                <div key={k} className="meta">
                  <div className="meta__k">{k}</div>
                  <div className="meta__v">{v}</div>
                </div>
              ))}
            </div>
            <div className="hero__ctas reveal">
              <Button href="/contact">Get in touch</Button>
              {contact.cvUrl ? (
                <Button href={contact.cvUrl} variant="ghost" download>
                  Download CV
                </Button>
              ) : null}
              <Button href="/work" variant="ghost">
                See my timeline
              </Button>
            </div>
          </div>
          <div className="about__photo reveal">
            <Image
              className="about__main"
              src={profile.portraits.university.src}
              alt={profile.portraits.university.alt}
              width={1080}
              height={1079}
              sizes="(max-width: 900px) 90vw, 460px"
              priority
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
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: "clamp(40px,6vw,80px)" }}>
        <div className="wrap">
          <div className="s-head">
            <div>
              <Eyebrow className="reveal">02 — How I work</Eyebrow>
              <h2 className="display s-head__title reveal">
                How I <span className="serif-it accent">work</span>
              </h2>
            </div>
          </div>
          <div className="process">
            {workflow.map((w, i) => (
              <div key={w.step} className="pstep reveal" style={delay(i * 0.08)}>
                <div className="pstep__n">{pad(i + 1)}</div>
                <h3 className="display">{w.step}</h3>
                <p>{w.description}</p>
              </div>
            ))}
          </div>
          <div className="ai-card reveal">
            <Glow tone="accent" />
            <div>
              <h3>AI IN THE LOOP</h3>
              <p>AI for research, implementation support, debugging, and iteration.</p>
            </div>
            <Chips items={skills.aiTools} />
          </div>
        </div>
      </section>
    </>
  );
}
