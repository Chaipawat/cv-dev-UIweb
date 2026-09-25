import Image from "next/image";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  image: ProjectImage;
  index?: string;
  label?: string;
  bare?: boolean;
  priority?: boolean;
  sizes?: string;
  /** Width is set by the parent (e.g. "w-[44%] md:w-[220px]"); the frame fills it. */
  className?: string;
}

/**
 * Mobile/LIFF screenshot in a thin device outline. Height follows the
 * screenshot's own ratio, so tall captures are never squashed or cropped.
 */
export default function PhoneFrame({
  image,
  index,
  label,
  bare,
  priority,
  sizes = "(min-width: 768px) 240px, 45vw",
  className,
}: PhoneFrameProps) {
  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <div className="rounded-[clamp(8px,1vw,14px)] border border-border-strong bg-background p-[2px]">
        <div className="project-ink relative overflow-hidden rounded-[clamp(6px,0.8vw,11px)] bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="block h-auto w-full"
          />
        </div>
      </div>
      {bare ? null : <MediaCaption index={index} label={label} caption={image.caption} />}
    </figure>
  );
}
