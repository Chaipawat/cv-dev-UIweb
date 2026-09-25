const pad = (n: number) => String(n).padStart(2, "0");

/** "What I worked on" — a numbered text index, split into two columns on wide screens. */
export default function ProjectWorkList({ items }: { items: string[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-x-[clamp(24px,5vw,80px)] p-0 lg:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item}
          className="grid grid-cols-[44px_1fr] items-baseline gap-3 border-t border-border py-[clamp(14px,1.6vw,20px)]"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] text-foreground-muted">{pad(i + 1)}</span>
          <span className="font-display text-[clamp(19px,2vw,26px)] font-medium leading-[1.2] tracking-[-0.025em] text-foreground">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}
