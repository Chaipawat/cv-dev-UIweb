import type { Metadata } from "next";
import { DiagIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/site/icons";
import { Button, Chips, Clay, delay, Eyebrow, Glow, PageHero } from "@/components/site/primitives";
import { CONTACT_LABELS, CONTACT_LINKS } from "@/data/contact";
import { portfolio } from "@/data/portfolio";

const { profile, contact } = portfolio;

export const metadata: Metadata = {
  title: "Contact — Chaipawat Jatuphattaranun",
  description: "Open to frontend opportunities, interesting projects, and collaborations.",
};

const ICONS: Record<string, React.ReactNode> = {
  EMAIL: <MailIcon />,
  PHONE: <PhoneIcon />,
  LINKEDIN: <LinkedInIcon />,
  GITHUB: <GitHubIcon />,
};

export default function ContactPage() {
  const email = CONTACT_LINKS.find((l) => l.key === "EMAIL");
  const phone = CONTACT_LINKS.find((l) => l.key === "PHONE");
  return (
    <>
      <PageHero>
        <div className="wrap">
          <Eyebrow live className="reveal">
            <b>{profile.availability.text}</b> · {profile.location}
          </Eyebrow>
          <h1 className="display page-hero__title reveal">
            Let’s <span className="serif-it">connect</span>
            <span className="accent">.</span>
          </h1>
          <p className="lead reveal">Open to frontend roles, product work, and collaborations where thoughtful interfaces matter.</p>
          <div className="hero__ctas reveal">
            {email?.href ? <Button href={email.href}>Say hello</Button> : null}
            {phone?.href ? (
              <Button href={phone.href} variant="ghost">
                Call {phone.value}
              </Button>
            ) : null}
            {contact.cvUrl ? (
              <Button href={contact.cvUrl} variant="ghost" download>
                Download CV
              </Button>
            ) : null}
          </div>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="contact-grid">
            {CONTACT_LINKS.filter((l) => l.href).map((l, i) => (
              <a
                key={l.key}
                className="ccard reveal"
                style={delay(i * 0.06)}
                href={l.href}
                {...(l.href!.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
              >
                <div className="ccard__top">
                  <span className="ccard__icon">{ICONS[l.key]}</span>
                  <DiagIcon />
                </div>
                <div>
                  <div className="ccard__label">{CONTACT_LABELS[l.key]}</div>
                  <div className="ccard__value">{l.value}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="ps-card reveal">
            <Glow tone="accent" />
            <div>
              <div className="ps-card__k">P.S.</div>
              <p className="display ps-card__t">
                Need a developer? Let’s talk before <span className="serif-it">happy hour.</span>
              </p>
              <Chips items={["GOOD CODE.", "BAD JOKES.", "COLD BEER."]} className="ps-card__tags" />
            </div>
            <div className="ps-card__art" aria-hidden="true">
              <Clay kind="seal" className="float">
                龍
              </Clay>
              <Clay kind="chip" className="float float--slow">
                &lt;/&gt;
              </Clay>
              <Clay kind="sphere" className="float float--fast" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
