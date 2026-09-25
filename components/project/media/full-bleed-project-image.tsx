import Image from "next/image";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface FullBleedProjectImageProps {
  image: ProjectImage;
  index?: string;
  label?: string;
  /**
   * Optional crop ratio, e.g. "21/9". Omit to show the full screenshot at its
   * own ratio. Place outside PageContainer to span the viewport — the
   * component fills its parent and never uses 100vw, so it can't overflow.
   */
  aspect?: string;
  priority?: boolean;
  className?: string;
}

export default function FullBleedProjectImage({
  image,
  index,
  label,
  aspect,
  priority,
  className,
}: FullBleedProjectImageProps) {
  return (
    <figure className={cn("m-0 w-full min-w-0", className)}>
      <div className="ink-duotone relative overflow-hidden border-y border-border bg-surface" style={aspect ? { aspectRatio: aspect } : undefined}>
        {aspect ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            priority={priority}
            className="object-cover"
            style={{ objectPosition: image.focus ?? "50% 0%" }}
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            priority={priority}
            className="block h-auto w-full"
          />
        )}
      </div>
      <MediaCaption index={index} label={label ?? image.category} caption={image.caption} className="mx-auto max-w-[1340px] px-6 md:px-8" />
    </figure>
  );
}
