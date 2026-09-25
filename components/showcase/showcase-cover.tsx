import Image from "next/image";
import BrowserFrame from "@/components/project/media/browser-frame";
import type { ProjectMedia } from "@/lib/project-media";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const DESKTOP_SIZES = "(min-width: 1340px) 620px, (min-width: 768px) 46vw, 90vw";

/** Phone capture sized by height, so tall screens always fit the plate uncropped. */
function PhoneShot({ image, className }: { image: ProjectImage; className?: string }) {
  return (
    <div
      className={cn(
        "project-ink relative overflow-hidden rounded-[clamp(6px,0.8vw,11px)] border border-border-strong bg-background shadow-[0_10px_28px_-18px_rgba(28,27,24,0.45)]",
        className
      )}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 14vw, 30vw" className="object-cover object-top" />
    </div>
  );
}

/**
 * Cover plate for a showcase card, composed to fit its fixed 16:11 frame:
 *   desktop + phone  → main screen with one phone overlapping its right edge
 *   desktop + detail → main screen with the detail card tucked under a corner
 *   several desktops → the main screen stacked over a second one
 *   phones only      → up to three height-fitted phones in a stepped row
 * Callers render it only when the project has a desktop or phone screen.
 */
export default function ShowcaseCover({ media }: { media: ProjectMedia }) {
  const { desktops, phones, details } = media;
  const [main, second] = desktops;

  if (main) {
    const phone = phones[0];
    const detail = !phone ? details.find((d) => d.width > d.height) : undefined;
    const back = !phone && !detail ? second : undefined;
    return (
      <div className="absolute inset-0">
        {back ? (
          <BrowserFrame image={back} bare sizes={DESKTOP_SIZES} className="absolute right-[5%] top-[18%] w-[72%] opacity-70" />
        ) : null}
        <BrowserFrame
          image={main}
          bare
          sizes={DESKTOP_SIZES}
          className={cn(
            "absolute left-[6%] shadow-[0_14px_36px_-24px_rgba(28,27,24,0.5)]",
            phone ? "top-[10%] w-[74%]" : back ? "top-[9%] w-[76%]" : "top-[12%] w-[84%]"
          )}
        />
        {phone ? <PhoneShot image={phone} className="absolute bottom-[8%] right-[7%] h-[76%]" /> : null}
        {detail ? (
          <div className="absolute bottom-[9%] right-[5%] w-[36%] overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px] shadow-[0_10px_28px_-18px_rgba(28,27,24,0.45)]">
            <Image
              src={detail.src}
              alt={detail.alt}
              width={detail.width}
              height={detail.height}
              sizes="(min-width: 768px) 16vw, 34vw"
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    );
  }

  if (!phones.length) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[4%] px-[6%]">
      {phones.slice(0, 3).map((image, i) => (
        <PhoneShot key={image.src} image={image} className={cn("h-[80%]", i % 2 === 1 && "translate-y-[7%]")} />
      ))}
    </div>
  );
}
