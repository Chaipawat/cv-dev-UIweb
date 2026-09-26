"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { NAV_ITEMS } from "@/data/nav";
import { portfolio } from "@/data/portfolio";

type Line = { id: number; kind: "in" | "out" | "err"; content: ReactNode };

const DIRS = NAV_ITEMS.map((item) => ({
  name: item.href === "/" ? "home" : item.href.slice(1),
  href: item.href,
}));

function safeDecode(path: string) {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function DirList() {
  return (
    <span className="flex flex-wrap gap-x-5 gap-y-1">
      {DIRS.map((dir) => (
        <Link
          key={dir.href}
          href={dir.href}
          className="text-[#9ad0ad] underline decoration-[#9ad0ad]/30 underline-offset-4 transition-colors hover:text-[#f8f0dd] hover:decoration-[#f8f0dd]"
        >
          {dir.name}/
        </Link>
      ))}
    </span>
  );
}

/**
 * A tiny fake shell for the 404: `ls`, `cd <dir>`, `help` and a couple of
 * easter eggs. Every directory in `ls` is also a real link, so nobody has to
 * type to get out of here.
 */
export default function LostShell() {
  const router = useRouter();
  const pathname = usePathname();
  const missing = safeDecode(pathname || "/");
  // Ids 0–4 belong to the opening transcript below.
  const nextId = useRef(5);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);
  const [value, setValue] = useState("");

  // Only called from event handlers, never during render.
  const line = (kind: Line["kind"], content: ReactNode): Line => ({ id: nextId.current++, kind, content });

  const [lines, setLines] = useState<Line[]>(() => [
    { id: 0, kind: "in", content: `cd ${missing}` },
    { id: 1, kind: "err", content: `zsh: no such file or directory: ${missing}` },
    { id: 2, kind: "in", content: "ls ~" },
    { id: 3, kind: "out", content: <DirList /> },
    { id: 4, kind: "out", content: 'Type "help", or click a directory.' },
  ]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function run(raw: string): Line[] {
    const [command = "", ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    switch (command.toLowerCase()) {
      case "":
        return [];
      case "help":
        return [
          line("out", "ls              list directories"),
          line("out", "cd <dir>        go somewhere that exists"),
          line("out", "pwd · whoami    the usual"),
          line("out", "beer · cola     you know what these do"),
          line("out", "clear           wipe the screen"),
        ];
      case "ls":
        return [line("out", <DirList />)];
      case "pwd":
        return [line("out", `${missing}  (allegedly)`)];
      case "whoami":
        return [line("out", `guest — visiting ${portfolio.profile.displayName}'s portfolio`)];
      case "cd": {
        const target = arg.replace(/^~?\/?/, "").replace(/\/$/, "").toLowerCase();
        const dir = DIRS.find((d) => d.name === (target === "" || target === ".." ? "home" : target));
        if (!dir) return [line("err", `cd: no such file or directory: ${arg}`)];
        router.push(dir.href);
        return [line("out", `→ ${dir.href}`)];
      }
      case "cola":
      case "coke":
        return [line("out", "Fizz… ice, straw, no refills on missing pages. 🥤")];
      case "beer":
      case "🍺":
        router.push("/contact");
        return [line("out", "Pouring a cold one… meet me on the contact page. 🍺")];
      case "sudo":
        return [line("err", "Nice try. This incident will be reported.")];
      case "rm":
        return [line("err", "rm: permission denied — this page is already gone.")];
      case "exit":
        router.push("/");
        return [line("out", "logout")];
      default:
        return [line("err", `zsh: command not found: ${command}`)];
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const raw = value;
    setValue("");
    if (raw.trim()) history.current.unshift(raw);
    historyIndex.current = -1;
    if (raw.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, line("in", raw), ...run(raw)]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const step = event.key === "ArrowUp" ? 1 : -1;
    const next = Math.max(-1, Math.min(history.current.length - 1, historyIndex.current + step));
    historyIndex.current = next;
    setValue(next === -1 ? "" : history.current[next]);
  }

  const prompt = (
    <span aria-hidden="true" className="shrink-0 text-[#9ad0ad]">
      guest@ryu <span className="text-[#f8f0dd]/45">~</span> $
    </span>
  );

  return (
    <div
      className="overflow-hidden border border-foreground bg-foreground font-mono focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent-text text-[12.5px] leading-[1.75] text-[#f8f0dd] shadow-[10px_10px_0_0_var(--color-accent)]"
      onClick={() => input.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-[#f8f0dd]/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f4b33c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#9ad0ad]" />
        <span className="ml-3 text-[10px] tracking-[0.2em] text-[#f8f0dd]/50">zsh — lost-and-found</span>
      </div>

      <div ref={scroller} role="log" aria-live="polite" className="max-h-[300px] overflow-y-auto px-4 pb-2 pt-4" data-lenis-prevent>
        {lines.map((l) => (
          <div key={l.id} className="flex gap-3 break-all">
            {l.kind === "in" ? prompt : null}
            <span className={l.kind === "err" ? "text-[#ff8a70]" : l.kind === "in" ? "text-[#f8f0dd]" : "text-[#f8f0dd]/70"}>
              {l.content}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-3 px-4 pb-4">
        {prompt}
        <label htmlFor="lost-shell-input" className="sr-only">
          Shell command
        </label>
        <input
          ref={input}
          id="lost-shell-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="try: cd work"
          className="min-w-0 flex-1 bg-transparent text-[#f8f0dd] caret-[#9ad0ad] outline-none placeholder:text-[#f8f0dd]/25"
        />
      </form>
    </div>
  );
}
