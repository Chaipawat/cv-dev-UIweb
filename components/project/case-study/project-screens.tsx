import Image from "next/image";
import BrowserFrame from "@/components/project/media/browser-frame";
import MediaCaption from "@/components/project/media/media-caption";
import PhoneRow from "@/components/project/media/phone-row";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/**
 * The screens the case-study hero didn't show. Desktop screens pair up two
 * per row — with an odd count the first runs full width as the lead —
 * followed by phone screens and small supporting evidence.
 */
export default function ProjectScreens({ images }: { images: ProjectImage[] }) {
  const desktops = images.filter((i) => i.width > i.height && i.width >= 800);
  const phones = images.filter((i) => i.height > i.width);
  const details = images.filter((i) => !desktops.includes(i) && !phones.includes(i));
  const leadFull = desktops.length % 2 === 1;

  return (
    <div className="flex flex-col gap-[clamp(48px,7vw,104px)]">
      {desktops.length ? (
        <div className="grid grid-cols-1 gap-x-[clamp(20px,3vw,40px)] gap-y-[clamp(40px,6vw,72px)] md:grid-cols-2">
          {desktops.map((img, i) => {
            const full = leadFull && i === 0;
            return (
              <BrowserFrame
                key={img.src}
                image={img}
                sizes={full ? "(min-width: 1340px) 1280px, 94vw" : "(min-width: 1340px) 640px, (min-width: 768px) 47vw, 94vw"}
                className={cn(full && "md:col-span-2", !full && (i + (leadFull ? 0 : 1)) % 2 === 0 && "md:mt-[clamp(32px,5vw,72px)]")}
              />
            );
          })}
        </div>
      ) : null}

      <PhoneRow phones={phones} />

      {details.length ? (
        <div className="flex flex-wrap items-start gap-[clamp(20px,3vw,40px)]">
          {details.map((img) => (
            <figure key={img.src} className="m-0 w-full max-w-[360px]">
              <div className="overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="360px"
                  className="block h-auto w-full"
                />
              </div>
              <MediaCaption label={img.caption} />
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
