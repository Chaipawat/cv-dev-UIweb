import BrowserFrame from "@/components/project/media/browser-frame";
import PhoneFrame from "@/components/project/media/phone-frame";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface LayeredProjectScreensProps {
  /** Large desktop/admin screen. */
  base: ProjectImage;
  /** Phone screens floated over the base on desktop (max 2 used). */
  layers?: ProjectImage[];
  index?: string;
  label?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}

// Vertical offsets give the two phones an asymmetric, stepped rhythm.
const LAYER_OFFSETS = ["md:translate-y-0", "md:-translate-y-[22%]"];

/**
 * Asymmetric composition: the desktop screen sits left-weighted and the
 * phone screens overlap its lower-right edge. On small screens the phones
 * drop below the base as a side-by-side pair, so nothing overflows.
 */
export default function LayeredProjectScreens({
  base,
  layers = [],
  index,
  label,
  caption,
  priority,
  className,
}: LayeredProjectScreensProps) {
  const phones = layers.slice(0, 2);
  const captionText = caption ?? [base.caption, ...phones.map((p) => p.caption)].filter(Boolean).join(" / ");

  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <div className={cn("relative", phones.length ? "md:pb-[12%]" : undefined)}>
        <BrowserFrame
          image={base}
          bare
          priority={priority}
          sizes="(min-width: 1340px) 1000px, (min-width: 768px) 78vw, 100vw"
          className={phones.length ? "md:w-[80%]" : undefined}
        />

        {phones.length ? (
          <div className="mt-5 flex items-end justify-end gap-[clamp(10px,2vw,24px)] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[38%]">
            {phones.map((phone, i) => (
              <PhoneFrame
                key={phone.src}
                image={phone}
                bare
                priority={priority}
                sizes="(min-width: 768px) 18vw, 45vw"
                className={cn(
                  "w-[44%] md:w-1/2 md:shadow-[0_24px_60px_-18px_rgba(28,27,24,0.32)]",
                  LAYER_OFFSETS[i]
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
      <MediaCaption index={index} label={label} caption={captionText || undefined} />
    </figure>
  );
}
