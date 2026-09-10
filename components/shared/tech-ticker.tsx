import { TICKER_ITEMS } from "@/data/skills";

export default function TechTicker() {
  const track = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="overflow-hidden border-b border-border py-20">
      <div className="animate-marquee flex w-max">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap px-[26px] font-display text-[34px] font-light tracking-[-0.02em] text-foreground-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
