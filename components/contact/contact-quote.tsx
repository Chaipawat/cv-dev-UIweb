import { CodeXml } from "lucide-react";
import ContactDesk from "@/components/contact/contact-desk";

/** Closing line for the contact page: a serif aside rather than another call to action. */
export default function ContactQuote() {
  return (
    <figure className="relative isolate m-0 min-h-[720px] border-t border-border pt-[clamp(32px,5vw,56px)] md:min-h-[780px]">
      <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">P.S.</span>
      <div className="relative z-10 mt-7 max-w-[720px] md:ml-[25%] md:mt-[-4px]">
        <blockquote className="m-0 font-serif text-[clamp(34px,4.8vw,68px)] italic leading-[1.03] tracking-[-0.018em] text-foreground">
          Need a developer? Let&apos;s talk
          <br />
          before <span className="text-accent">happy hour.</span>
        </blockquote>
        <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
          <span className="inline-flex items-center gap-2">
            <CodeXml size={14} strokeWidth={1.5} className="text-terminal" aria-hidden="true" /> GOOD CODE.
          </span>
          <span>BAD JOKES.</span>
          <span>COLD BEER.</span>
        </figcaption>
      </div>
      <ContactDesk className="mt-8 h-[380px] w-full md:absolute md:-bottom-[5%] md:right-[3%] md:mt-0 md:h-[620px] md:w-[min(52vw,720px)]" />
      <span className="absolute -bottom-[1%] right-[3%] hidden font-mono text-[10px] tracking-[0.2em] text-foreground-secondary md:block">
        ↗ DRAG / MOVE THE SCENE
      </span>
    </figure>
  );
}
