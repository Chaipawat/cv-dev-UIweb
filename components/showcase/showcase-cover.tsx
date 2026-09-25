import Image from "next/image";
import BrowserFrame from "@/components/project/media/browser-frame";
import type { ProjectMedia } from "@/lib/project-media";
import type { ProjectImage } from "@/types/portfolio";

/** Phone capture sized by height, so tall screens always fit the plate uncropped. */
function PhoneShot({ image }: { image: ProjectImage }) {
  return (
    <div
      className="project-ink relative h-[82%] overflow-hidden rounded-[clamp(6px,0.8vw,11px)] border border-border-strong bg-background shadow-[0_10px_28px_-18px_rgba(28,27,24,0.45)]"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 12vw, 28vw" className="object-cover object-top" />
    </div>
  );
}

/**
 * Cover plate for a showcase card: one clear subject, nothing overlapping.
 * Projects with a desktop screen show that main screen alone, centred in a
 * browser frame; mobile-only projects — or ones that prefer phones
 * (`images.showcase`) — show up to three phones side by side.
 * The full set of screens lives on the case study.
 * Callers render it only when the project has a desktop or phone screen.
 */
export default function ShowcaseCover({ media, prefer }: { media: ProjectMedia; prefer?: "desktop" | "phones" }) {
  const [main] = media.desktops;

  if (main && !(prefer === "phones" && media.phones.length)) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-[7%]">
        <BrowserFrame
          image={main}
          bare
          rounded
          sizes="(min-width: 1340px) 640px, (min-width: 768px) 50vw, 88vw"
          className="w-full max-w-[640px] shadow-[0_14px_36px_-24px_rgba(28,27,24,0.5)] transition-transform duration-[550ms] ease-[var(--ease-editorial)] group-hover:-translate-y-1"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[5%] px-[7%] transition-transform duration-[550ms] ease-[var(--ease-editorial)] group-hover:-translate-y-1">
      {media.phones.slice(0, 3).map((image) => (
        <PhoneShot key={image.src} image={image} />
      ))}
    </div>
  );
}
