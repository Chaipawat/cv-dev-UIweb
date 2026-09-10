export default function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border bg-surface px-[11px] py-[5px] font-mono text-[11px] tracking-[0.08em] text-foreground-secondary">
      {label}
    </span>
  );
}
