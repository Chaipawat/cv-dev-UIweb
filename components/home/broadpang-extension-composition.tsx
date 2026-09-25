import Image from "next/image";
import { getAvailableImages } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";

export default function BroadpangExtensionComposition({ project }: { project: Project }) {
  const images = getAvailableImages(project);
  const system = images.find((image) => image.category === "web");
  const extension = images.find((image) => image.category === "extension");
  if (!system || !extension) return null;

  return (
    <div className="mt-[clamp(32px,5vw,64px)] min-w-0 lg:ml-[16%]">
      <figure data-reveal="fade" className="m-0 sm:w-[92%]">
        <div className="overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px]">
          <div className="overflow-hidden">
            <Image
              src={system.src}
              alt={system.alt}
              width={system.width}
              height={system.height}
              sizes="(min-width: 1280px) 1000px, (min-width: 1024px) 77vw, 92vw"
              className="block h-auto w-full saturate-[0.94] transition-[filter,transform] duration-[550ms] ease-[var(--ease-editorial)] hover:scale-[1.01] hover:saturate-100 motion-reduce:transform-none motion-reduce:transition-none"
            />
          </div>
        </div>
        <figcaption className="fig-label mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-foreground-secondary lg:text-[10px]">
          {system.caption}
        </figcaption>
      </figure>
      <figure data-reveal="fade" className="relative z-10 m-0 ml-auto mt-6 w-[78%] max-w-[360px] sm:mt-4 sm:w-[38%] lg:-mt-12">
        <div className="overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px]">
          <Image
            src={extension.src}
            alt={extension.alt}
            width={extension.width}
            height={extension.height}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 35vw, 78vw"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-foreground-secondary lg:text-[10px]">
          <span className="fig-label block">{extension.caption}</span>
          <span className="mt-1 block">VERSION 3.0.8</span>
        </figcaption>
      </figure>
    </div>
  );
}
