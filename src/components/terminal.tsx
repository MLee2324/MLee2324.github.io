"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { SquareTerminal } from "lucide-react";
import { config } from "@/data/config";
import { ABOUT } from "@/data/about";
import { NEWS } from "@/data/news";
import { RESEARCH_AREAS } from "@/data/research";
import { EXPERIENCE, SKILLS } from "@/data/constants";
import projects from "@/data/projects";
import { cn } from "@/lib/utils";

// A small interactive terminal (open with the header button or the ` key).
// Every answer is built from the site's data files, so it stays in sync.

type Line = { kind: "in" | "out" | "err" | "accent"; text: string };

const PROMPT = "guest@mlee2324:~$";
const SECTIONS = ["about", "news", "research", "experience", "projects", "publications", "skills"];

const NEOFETCH_ART = [
  "  __  __ _      ",
  " |  \\/  | |     ",
  " | |\\/| | |     ",
  " | |  | | |___  ",
  " |_|  |_|_____| ",
  "                ",
];

function neofetch(narrow: boolean): Line[] {
  const info = [
    `matthew@utah`,
    `------------`,
    `Role:      Undergraduate Researcher @ SparkLab`,
    `Degree:    B.S. Computer Engineering, Univ. of Utah`,
    `Grad:      Dec 2026`,
    `Research:  vision · multimodal · HCI`,
    `Focus:     assistive AI for blind & low-vision people`,
    `Languages: English, Korean`,
    `Stack:     ${SKILLS.slice(0, 5).map((s) => s.name).join(", ")}`,
  ];
  // on narrow screens the art and info don't fit side by side: info only
  if (narrow) return info.map((text, i) => ({ kind: i < 2 ? "accent" : "out", text }));
  const rows = Math.max(NEOFETCH_ART.length, info.length);
  return Array.from({ length: rows }, (_, i) => ({
    kind: i < 2 ? "accent" : "out",
    text: (NEOFETCH_ART[i] ?? " ".repeat(16)) + "  " + (info[i] ?? ""),
  }));
}

const HELP: [string, string][] = [
  ["help", "show this list"],
  ["whoami", "a one-line intro"],
  ["neofetch", "system info, but it's me"],
  ["about", "research interests"],
  ["now", "what I'm working on right now"],
  ["research", "my three research areas"],
  ["experience", "research positions"],
  ["projects", "selected projects"],
  ["news", "recent updates"],
  ["skills", "languages and tools"],
  ["cat matthew_lee.py", "the code card from About"],
  ["goto <section>", "scroll to a section, e.g. goto projects"],
  ["resume | cv", "open my résumé or CV"],
  ["email | github | linkedin", "get in touch"],
  ["theme light|dark", "switch the color theme"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

const COMMANDS = [
  ...HELP.map(([c]) => c.split(" ")[0]),
  "ls", "pwd", "date", "echo", "history", "sudo", "cd", "contact",
].filter((c, i, a) => a.indexOf(c) === i && !c.includes("|"));
COMMANDS.push("resume", "cv", "email", "github", "linkedin");

export default function Terminal({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [hIndex, setHIndex] = React.useState<number | null>(null);
  const router = useRouter();
  const { setTheme } = useTheme();
  const bottom = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // backtick toggles the terminal (ignored while typing in a field)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "`" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable=true]") && !t.closest("[data-terminal]")) return;
      e.preventDefault();
      setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open && lines.length === 0) {
      setLines([
        { kind: "accent", text: `Welcome to ${config.author}'s terminal.` },
        { kind: "out", text: "Type `help` to see what you can do, or `neofetch` for the quick version." },
      ]);
    }
  }, [open, lines.length]);

  // braces matter: newer browsers return a Promise from scrollIntoView, and an
  // effect must not return anything but a cleanup function
  React.useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const out = (...texts: string[]): Line[] => texts.map((text) => ({ kind: "out", text }));
  const go = (fn: () => void) => {
    setOpen(false);
    setTimeout(fn, 50);
  };

  const run = (raw: string): Line[] | "clear" => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");
    switch (cmd.toLowerCase()) {
      case "":
        return [];
      case "help":
        return [
          { kind: "accent", text: "Available commands:" },
          ...HELP.map(([c, d]) => ({ kind: "out" as const, text: `  ${c.padEnd(26)} ${d}` })),
        ];
      case "whoami":
        return out(`${config.author}: ${config.headline.toLowerCase()} at the University of Utah. ${config.tagline}`);
      case "neofetch":
        return neofetch(window.innerWidth < 640);
      case "about":
        return out(ABOUT.intro);
      case "now":
        return out(...ABOUT.now.map((n) => `${n.emoji}  ${n.label}: ${n.text}`));
      case "research":
        return RESEARCH_AREAS.flatMap((a) => [
          { kind: "accent" as const, text: `▸ ${a.title}` },
          { kind: "out" as const, text: `  ${a.body}` },
        ]);
      case "experience":
        return EXPERIENCE.flatMap((e) => [
          { kind: "accent" as const, text: `▸ ${e.title} (${e.periods.map((p) => `${p.start}–${p.end}`).join(", ")})` },
          { kind: "out" as const, text: `  ${e.company}` },
        ]);
      case "projects":
        return projects.flatMap((p) => [
          { kind: "accent" as const, text: `▸ ${p.title} (${p.date})` },
          { kind: "out" as const, text: `  ${p.highlights[0]}` },
        ]);
      case "news":
        return out(...NEWS.map((n) => `${n.date.padEnd(9)} ${n.text}`));
      case "skills":
        return out(SKILLS.map((s) => s.name).join(" · "));
      case "ls":
        return out("about/  news/  research/  experience/  projects/  publications/  skills/  matthew_lee.py  resume.pdf  cv.pdf");
      case "pwd":
        return out("/home/guest/mlee2324.github.io");
      case "date":
        return out(new Date().toString());
      case "echo":
        return out(arg);
      case "history":
        return out(...history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`));
      case "cat":
        if (/matthew_lee\.py/i.test(arg)) {
          return out(
            "class MatthewLee:",
            '    role       = "Undergraduate Researcher @ SparkLab"',
            '    school     = "University of Utah"',
            '    degree     = "B.S. Computer Engineering"',
            '    graduating = "Dec 2026"',
            '    languages  = ["English", "Korean"]',
            "",
            "    def research(self):",
            '        return ["computer vision", "multimodal learning", "human-computer interaction"]'
          );
        }
        if (/resume|cv/i.test(arg)) return run(/cv/i.test(arg) ? "cv" : "resume") as Line[];
        return [{ kind: "err", text: `cat: ${arg || "(nothing)"}: No such file. Try \`ls\`.` }];
      case "cd":
      case "goto": {
        const target = arg.replace(/\/$/, "").toLowerCase();
        if (SECTIONS.includes(target)) {
          go(() => router.push(`/#${target}`));
          return out(`Jumping to ${target}…`);
        }
        return [{ kind: "err", text: `${cmd}: no such section. Try one of: ${SECTIONS.join(", ")}` }];
      }
      case "resume":
      case "cv":
        go(() => router.push(cmd.toLowerCase() === "cv" ? "/cv/" : "/resume/"));
        return out(`Opening ${cmd.toLowerCase() === "cv" ? "CV" : "résumé"}…`);
      case "email":
      case "contact":
        window.location.assign(`mailto:${config.email}`);
        return out(`Opening your mail app for ${config.email}…`);
      case "github":
        window.open(config.social.github, "_blank", "noopener,noreferrer");
        return out(`Opening ${config.social.github}`);
      case "linkedin":
        window.open(config.social.linkedin, "_blank", "noopener,noreferrer");
        return out(`Opening ${config.social.linkedin}`);
      case "theme":
        if (arg === "light" || arg === "dark") {
          setTheme(arg);
          return out(`Theme set to ${arg}.`);
        }
        return [{ kind: "err", text: "usage: theme light|dark" }];
      case "sudo":
        if (/hire/i.test(arg)) {
          return [
            { kind: "accent", text: "[sudo] password for guest: ********" },
            { kind: "out", text: "Permission granted. Excellent decision." },
            { kind: "out", text: `Next step: \`email\` (${config.email}). I graduate in December 2026.` },
          ];
        }
        return [{ kind: "err", text: "guest is not in the sudoers file. This incident will be reported. (Try `sudo hire matthew`.)" }];
      case "rm":
        return [{ kind: "err", text: "Nice try. This site has no -rf for you." }];
      case "clear":
        return "clear";
      case "exit":
        setOpen(false);
        return [];
      default:
        return [{ kind: "err", text: `command not found: ${cmd}. Type \`help\` for a list.` }];
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input;
    setInput("");
    setHIndex(null);
    if (raw.trim()) setHistory((h) => [...h, raw.trim()]);
    const result = run(raw);
    if (result === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: raw }, ...result]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown" && hIndex !== null) {
      e.preventDefault();
      const i = hIndex + 1;
      if (i >= history.length) {
        setHIndex(null);
        setInput("");
      } else {
        setHIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "Tab" && !e.shiftKey) {
      // Tab completes; keep it from reaching the dialog's focus trap, which
      // would move focus to the close button. Shift+Tab still leaves.
      e.preventDefault();
      e.stopPropagation();
      const [first, ...rest] = input.split(" ");
      if (rest.length === 0) {
        const match = COMMANDS.filter((c) => c.startsWith(first.toLowerCase()));
        if (match.length === 1) setInput(match[0] + " ");
        else if (match.length > 1) setLines((l) => [...l, { kind: "in", text: input }, { kind: "out", text: match.join("  ") }]);
      } else if (["goto", "cd"].includes(first)) {
        const match = SECTIONS.filter((s) => s.startsWith(rest.join(" ")));
        if (match.length === 1) setInput(`${first} ${match[0]}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Open terminal"
          title="Terminal (press `)"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
            className
          )}
        >
          <SquareTerminal className="h-4 w-4" />
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-terminal
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed left-1/2 top-[12vh] z-[2001] flex max-h-[76vh] w-[min(94vw,46rem)] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b1020] font-mono text-[13px] text-slate-200 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <DialogPrimitive.Close aria-label="Close terminal" className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110" />
            <span aria-hidden className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span aria-hidden className="h-3 w-3 rounded-full bg-[#28c840]" />
            <DialogPrimitive.Title className="ml-2 text-xs text-slate-400">guest@mlee2324: ~</DialogPrimitive.Title>
          </div>
          <DialogPrimitive.Description className="sr-only">
            An interactive terminal about Matthew Lee. Type help and press Enter to list commands.
          </DialogPrimitive.Description>
          <div className="flex-1 overflow-y-auto p-4" onClick={() => inputRef.current?.focus()}>
            <div role="log" aria-live="polite" className="space-y-0.5">
              {lines.map((l, i) => (
                <pre
                  key={i}
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    l.kind === "in" && "text-slate-100",
                    l.kind === "out" && "text-slate-300",
                    l.kind === "accent" && "text-emerald-300",
                    l.kind === "err" && "text-rose-300"
                  )}
                >
                  {l.kind === "in" ? (
                    <>
                      <span className="text-sky-300">{PROMPT}</span> {l.text}
                    </>
                  ) : (
                    l.text
                  )}
                </pre>
              ))}
            </div>
            <form onSubmit={submit} className="mt-0.5 flex items-center gap-2">
              <label htmlFor="terminal-input" className="shrink-0 text-sky-300">
                {PROMPT}
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-slate-100 caret-emerald-300 outline-none"
              />
            </form>
            <div ref={bottom} />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
