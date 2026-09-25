/** Closing line for the contact page: a serif aside rather than another call to action. */
export default function ContactQuote() {
  return (
    <figure className="m-0 grid grid-cols-1 gap-6 border-t border-border pt-[clamp(32px,5vw,56px)] md:grid-cols-12 md:gap-8">
      <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-secondary md:col-span-3">P.S.</span>
      <div className="md:col-span-9">
        <blockquote className="m-0 font-serif text-[clamp(30px,4.4vw,64px)] italic leading-[1.05] tracking-[-0.015em] text-foreground">
          Need a developer? Let&apos;s talk before <span className="text-accent">happy hour.</span>
        </blockquote>
        <figcaption className="mt-5 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
          GOOD CODE. BAD JOKES. COLD BEER.
        </figcaption>
      </div>
    </figure>
  );
}
