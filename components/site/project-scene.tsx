import { Clay, Phone, Shot, Win } from "@/components/site/primitives";
import { getCaseStudyMedia, getProjectMedia } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";

// Server-only (reads /public through lib/project-media).

/** Projects without approved screenshots get a typographic stage instead. */
function TypoScene({ project }: { project: Project }) {
  const [first, ...rest] = project.title.split(" ");
  return (
    <div className="scene scene--typo">
      <div className="cs-stage__word">
        {first} {rest.length ? <span className="serif-it">{rest.join(" ").toLowerCase()}</span> : null}
      </div>
      <Clay kind="seal" className="float">龍</Clay>
      <Clay kind="chip" className="float float--slow">&lt;/&gt;</Clay>
      <Clay kind="sphere" className="float float--fast" />
    </div>
  );
}

/**
 * Compact composition for cards, the home stage and the timeline: one lead
 * screen plus one supporting screen, framed by the screenshot's orientation.
 */
export function ProjectScene({ project, active }: { project: Project; active?: boolean }) {
  const { desktops, phones, details } = getProjectMedia(project);
  const cls = (extra: string) => `scene${active ? " is-active" : ""}${extra}`;
  const [lead, second] = desktops;

  if (lead && phones[0]) {
    return (
      <div className={cls("")}>
        <Win img={lead} />
        <Phone img={phones[0]} />
      </div>
    );
  }
  if (lead) {
    const badge = second ?? details.find((d) => d.width > d.height);
    return (
      <div className={cls(" scene--solo")}>
        <Win img={lead} />
        {badge ? (
          <div className="badge-float">
            <Shot img={badge} sizes="(max-width: 900px) 40vw, 20vw" />
          </div>
        ) : null}
      </div>
    );
  }
  const portrait = [...phones, ...details.filter((d) => d.height > d.width)];
  if (portrait.length >= 2) {
    return (
      <div className={cls("")}>
        <Phone img={portrait[0]} className="phone--a" />
        <Phone img={portrait[1]} className="phone--b" />
      </div>
    );
  }
  return <TypoScene project={project} />;
}

/** Case-study lead composition: every screen not used here goes to SCREENS. */
export function CaseStudyStage({ project }: { project: Project }) {
  const { hero } = getCaseStudyMedia(project);
  if (!hero) return <TypoScene project={project} />;
  if (hero.kind === "phones") {
    return (
      <div className="scene scene--phones">
        {hero.phones.map((img) => (
          <Phone key={img.src} img={img} sizes="(max-width: 900px) 30vw, 14vw" />
        ))}
      </div>
    );
  }
  return (
    <div className={hero.layers.length ? "scene" : "scene scene--solo"}>
      <Win img={hero.base} sizes="(max-width: 900px) 92vw, 1000px" priority />
      {hero.layers.slice(0, 1).map((img) => (
        <Phone key={img.src} img={img} />
      ))}
      {hero.inset ? (
        <div className="badge-float">
          <Shot img={hero.inset} sizes="(max-width: 900px) 40vw, 400px" />
        </div>
      ) : null}
    </div>
  );
}
