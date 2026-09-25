import Image from "next/image";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface CroppedProjectImageProps {
  image: ProjectImage;
  index?: string;
  label?: string;
  /** Crop window ratio, e.g. "4/3" or "1/1". */
  aspect?: string;
  /** Magnification of the detail (1 = cover only). */
  zoom?: number;
  sizes?: string;
  className?: string;
}

/**
 * Zoomed detail of a real screenshot — a single component, state or
 * interaction — framed with corner marks. The crop point comes from
 * `image.focus` so sensitive regions can be kept out of frame.
 */
export default function CroppedProjectImage({
  image,
  index,
  label = "DETAIL",
  aspect = "4/3",
  zoom = 1,
  sizes = "(min-width: 768px) 40vw, 100vw",
  className,
}: CroppedProjectImageProps) {
  const focus = image.focus ?? "50% 50%";
  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <div className="relative overflow-hidden border border-border bg-surface" style={{ aspectRatio: aspect }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{
            objectPosition: focus,
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: focus,
          }}
        />
        <span className="corner-mark left-2 top-2 h-px w-3.5" aria-hidden="true" />
        <span className="corner-mark left-2 top-2 h-3.5 w-px" aria-hidden="true" />
        <span className="corner-mark bottom-2 right-2 h-px w-3.5" aria-hidden="true" />
        <span className="corner-mark bottom-2 right-2 h-3.5 w-px" aria-hidden="true" />
      </div>
      <MediaCaption index={index} label={label} caption={image.caption} />
    </figure>
  );
}
