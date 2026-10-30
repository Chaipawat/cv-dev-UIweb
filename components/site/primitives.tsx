import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowIcon } from "@/components/site/icons";
import type { ProjectImage } from "@/types/portfolio";

export const pad = (n: number) => String(n).padStart(2, "0");

/** Delay for staggered `.reveal` entrances. */
export const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export function Eyebrow({ children, live, className = "" }: { children: ReactNode; live?: boolean; className?: string }) {
  return (
    <span className={`eyebrow ${className}`}>
      <span className={live ? "dot dot--live" : "dot"} />
      {children}
    </span>
  );
}

export function Chips({ items, className = "chips" }: { items: string[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <span key={item} className="chip">
          {item}
        </span>
      ))}
    </div>
  );
}

export function BtnIcon() {
  return (
    <span className="btn__icon">
      <ArrowIcon />
    </span>
  );
}

type Href = string;

/** Primary pill button; internal routes use next/link, everything else a plain anchor. */
export function Button({
  href,
  children,
  variant = "primary",
  download,
}: {
  href: Href;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  download?: boolean;
}) {
  const className = `btn btn--${variant}`;
  const content = (
    <>
      {children}
      {variant === "ghost" ? null : <BtnIcon />}
    </>
  );
  if (href.startsWith("/") && !download && !href.endsWith(".pdf")) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }
  return (
    <a className={className} href={href} download={download || undefined}>
      {content}
    </a>
  );
}

export function LinkArrow({ href, children, className = "link-arrow" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={className} href={href}>
      {children} <ArrowIcon />
    </Link>
  );
}

export function Glow({ tone }: { tone: "accent" | "peach" | "sand" }) {
  return <div className={`glow glow--${tone}`} aria-hidden="true" />;
}

export function Shot({ img, sizes, priority, style }: { img: ProjectImage; sizes: string; priority?: boolean; style?: CSSProperties }) {
  return (
    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} priority={priority} style={style} />
  );
}

/** Browser-window mockup. */
export function Win({
  img,
  url,
  sizes = "(max-width: 900px) 90vw, 50vw",
  className = "",
  style,
  priority,
}: {
  img: ProjectImage;
  url?: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <div className={`win ${className}`} style={style}>
      <div className="win__bar">
        <i />
        <i />
        <i />
        <span className="win__url">{url ?? img.urlLabel ?? img.caption?.toLowerCase() ?? ""}</span>
      </div>
      <Shot img={img} sizes={sizes} priority={priority} />
    </div>
  );
}

/** Phone mockup. */
export function Phone({ img, className = "", sizes = "(max-width: 900px) 40vw, 18vw" }: { img: ProjectImage; className?: string; sizes?: string }) {
  return (
    <div className={`phone ${className}`}>
      <Shot img={img} sizes={sizes} />
    </div>
  );
}

export function Clay({ kind, className = "", children, style }: { kind: "seal" | "chip" | "sphere" | "ring"; className?: string; children?: ReactNode; style?: CSSProperties }) {
  return (
    <div className={`clay clay--${kind} ${className}`} style={style} aria-hidden="true">
      {children}
    </div>
  );
}

export function PageHero({ children, className = "page-hero" }: { children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <Glow tone="accent" />
      <Glow tone="peach" />
      {children}
    </section>
  );
}
