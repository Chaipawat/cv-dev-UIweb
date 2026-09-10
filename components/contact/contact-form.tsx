"use client";

import { useState, type FormEvent } from "react";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:chaipawat22247@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <PageContainer className="pb-[140px] pt-[110px]">
      <div className="flex flex-wrap gap-14">
        <Reveal className="min-w-[260px] flex-1 basis-[300px]">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
            Or send a message
          </div>
          <p className="m-0 mt-3.5 max-w-[34ch] text-foreground-muted">
            Direct links above are the fastest route.
          </p>
        </Reveal>

        <Reveal className="min-w-[280px] flex-1 basis-[520px]" delay={0.07}>
          <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border-0 border-b border-border bg-transparent px-0.5 py-3.5 font-body text-base text-foreground outline-none transition-colors duration-[250ms] focus:border-accent"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border-0 border-b border-border bg-transparent px-0.5 py-3.5 font-body text-base text-foreground outline-none transition-colors duration-[250ms] focus:border-accent"
            />
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="resize-y border-0 border-b border-border bg-transparent px-0.5 py-3.5 font-body text-base text-foreground outline-none transition-colors duration-[250ms] focus:border-accent"
            />
            <button
              type="submit"
              className="group mt-2.5 flex w-fit items-center gap-2.5 rounded-full bg-foreground px-7 py-[15px] text-[15px] font-medium text-cream transition-[background,gap] duration-[250ms] hover:gap-4 hover:bg-accent"
            >
              <span>Send message</span>
              <span>→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </PageContainer>
  );
}
