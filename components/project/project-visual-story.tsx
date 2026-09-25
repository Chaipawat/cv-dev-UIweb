import BrowserFrame from "@/components/project/media/browser-frame";
import CroppedProjectImage from "@/components/project/media/cropped-project-image";
import FullBleedProjectImage from "@/components/project/media/full-bleed-project-image";
import LayeredProjectScreens from "@/components/project/media/layered-project-screens";
import PhoneFrame from "@/components/project/media/phone-frame";
import { getProjectMediaGroups, type ResolvedMediaGroup } from "@/lib/project-media";
import type { Project, ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

// Stepped offsets so a row of phones reads as an editorial sequence, not a grid.
const PHONE_STEPS = ["md:translate-y-0", "md:translate-y-[14%]", "md:translate-y-[4%]"];

function byTreatment(images: ProjectImage[]) {
  return {
    desktop: images.filter((i) => i.treatment === "browser" || i.treatment === "layered"),
    phones: images.filter((i) => i.treatment === "phone"),
    crops: images.filter((i) => i.treatment === "crop"),
    full: images.filter((i) => i.treatment === "full"),
  };
}

function GroupMedia({ group, figureStart }: { group: ResolvedMediaGroup; figureStart: number }) {
  const { desktop, phones, crops, full } = byTreatment(group.images);
  let fig = figureStart;
  const next = () => pad(fig++);

  // Lead with a layered composition when the group has both desktop and phone screens.
  const [leadDesktop, ...restDesktop] = desktop;
  const layered = leadDesktop && phones.length ? { base: leadDesktop, layers: phones.slice(0, 2) } : null;
  const restPhones = layered ? phones.slice(2) : phones;
  const desktopList = layered ? restDesktop : desktop;

  return (
    <div className="flex flex-col gap-[clamp(40px,6vw,88px)]">
      {layered ? <LayeredProjectScreens {...layered} index={next()} label={group.title} /> : null}

      {restPhones.length ? (
        <div className="grid grid-cols-2 gap-x-[clamp(12px,3vw,48px)] gap-y-10 md:grid-cols-3 md:pb-[6%]">
          {restPhones.map((img, i) => (
            <PhoneFrame
              key={img.src}
              image={img}
              index={next()}
              label={group.title}
              className={cn("mx-auto w-full max-w-[280px]", PHONE_STEPS[i % PHONE_STEPS.length])}
            />
          ))}
        </div>
      ) : null}

      {desktopList.map((img, i) => (
        <BrowserFrame
          key={img.src}
          image={img}
          index={next()}
          label={group.title}
          className={cn("w-full md:w-[88%]", i % 2 === 1 && "md:ml-auto")}
        />
      ))}

      {crops.length ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {crops.map((img, i) => (
            <CroppedProjectImage
              key={img.src}
              image={img}
              index={next()}
              aspect={i % 3 === 0 ? "4/3" : "1/1"}
              className={cn(i % 2 === 1 && "sm:mt-[18%]")}
            />
          ))}
        </div>
      ) : null}

      {full.map((img) => (
        <FullBleedProjectImage key={img.src} image={img} index={next()} label={group.title} aspect="21/9" />
      ))}
    </div>
  );
}

/**
 * Curated screenshot story for a project page: numbered groups
 * ("01 — BOOKING FLOW"), each with its own composition. Renders nothing
 * until real screenshots exist in /public/projects/<slug>/.
 */
export default function ProjectVisualStory({ project, className }: { project: Project; className?: string }) {
  const groups = getProjectMediaGroups(project);
  if (!groups.length) return null;

  // Figure numbers run continuously across groups (FIG. 01 … FIG. n).
  const figureStarts = groups.map((_, gi) =>
    groups.slice(0, gi).reduce((sum, g) => sum + g.images.length, 1)
  );

  return (
    <section aria-label={`${project.title} screens`} className={cn("flex flex-col gap-[clamp(88px,12vw,180px)]", className)}>
      {groups.map((group, gi) => {
        const start = figureStarts[gi];
        return (
          <div key={group.id}>
            <header className="mb-[clamp(28px,4vw,56px)] grid grid-cols-1 items-end gap-6 border-b border-border pb-5 md:grid-cols-[1fr_auto]">
              <h3 className="m-0 font-display text-[clamp(34px,6.4vw,96px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-foreground">
                <span className="mr-[0.3em] align-top font-mono text-[11px] font-normal tracking-[0.2em] text-accent">
                  {pad(gi + 1)} —
                </span>
                {group.title}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-muted md:max-w-[280px] md:justify-end">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </header>
            <GroupMedia group={group} figureStart={start} />
          </div>
        );
      })}
    </section>
  );
}
