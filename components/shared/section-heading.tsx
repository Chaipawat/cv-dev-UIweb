import Reveal from "@/components/shared/reveal";

interface SectionHeadingProps {
  title: string;
  index: string;
}

export default function SectionHeading({ title, index }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-border pb-[22px]">
        <h2 className="m-0 font-display text-[clamp(34px,4.4vw,60px)] font-normal tracking-[-0.035em]">
          {title}
        </h2>
        <span className="font-mono text-xs tracking-[0.18em] text-foreground-subtle">
          {index}
        </span>
      </div>
    </Reveal>
  );
}
