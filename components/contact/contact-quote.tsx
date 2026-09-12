import { MessageCircle } from "lucide-react";

export default function ContactQuote() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border p-8 text-center md:p-10">
      <div className="flex items-center gap-4">
        <MessageCircle size={24} strokeWidth={1.6} className="flex-none text-accent" aria-hidden="true" />
        <div className="text-[clamp(24px,3.4vw,42px)] leading-[1.2] text-foreground">
          Need a developer? Let&apos;s talk before happy hour.
        </div>
      </div>
      <div className="font-mono text-[12px] tracking-[0.2em] text-foreground-muted">
        Good code. Bad jokes. Cold beer.
      </div>
    </div>
  );
}
