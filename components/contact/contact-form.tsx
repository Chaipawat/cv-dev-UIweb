"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/data/contact";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (CONTACT_EMAIL) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }
    setSent(true);
  };

  return (
    <div>
      <div className="border-b border-border pb-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
        SEND A MESSAGE
      </div>
      <form onSubmit={onSubmit} className="mt-2 flex max-w-[560px] flex-col">
          <label className="grid grid-cols-[96px_1fr] items-center gap-4 border-b border-border py-2 transition-colors duration-[180ms] focus-within:border-accent">
            <span className="font-mono text-[10px] tracking-[0.18em] text-foreground-muted">NAME</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border-0 bg-transparent py-3.5 text-[15px] text-foreground outline-none"
            />
          </label>
          <label className="grid grid-cols-[96px_1fr] items-center gap-4 border-b border-border py-2 transition-colors duration-[180ms] focus-within:border-accent">
            <span className="font-mono text-[10px] tracking-[0.18em] text-foreground-muted">EMAIL</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="border-0 bg-transparent py-3.5 text-[15px] text-foreground outline-none"
            />
          </label>
          <label className="grid grid-cols-[96px_1fr] items-start gap-4 border-b border-border py-2 transition-colors duration-[180ms] focus-within:border-accent">
            <span className="pt-4 font-mono text-[10px] tracking-[0.18em] text-foreground-muted">MESSAGE</span>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about the project"
              className="resize-y border-0 bg-transparent py-3.5 text-[15px] text-foreground outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={sent}
            className="mt-7 flex w-fit items-center gap-3 rounded-md bg-foreground px-[22px] py-[14px] font-display text-sm font-medium text-background transition-colors duration-[180ms] hover:bg-accent disabled:cursor-default disabled:opacity-70"
          >
            {sent ? "Message sent" : "Send Message →"}
          </button>
          <p role="status" aria-live="polite" className="mt-3 min-h-[1lh] text-[13px] text-foreground-muted">
            {sent
              ? CONTACT_EMAIL
                ? "Your email client should now be open with this message pre-filled."
                : "Thanks — direct email isn't configured yet, so please use one of the links above instead."
              : null}
        </p>
      </form>
    </div>
  );
}
