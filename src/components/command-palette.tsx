"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Mail,
  Moon,
  Search,
  Sun,
  Type,
  Contrast,
  Underline,
} from "lucide-react";
import { setA11yPrefs, useA11yPrefs } from "@/lib/a11y-prefs";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import { links } from "@/components/header/config";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  group: "Go to" | "Documents" | "Contact" | "Settings";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
};

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export default function CommandPalette({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [mac, setMac] = React.useState(true);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();
  const listRef = React.useRef<HTMLUListElement>(null);
  const a11y = useA11yPrefs();

  React.useEffect(() => setMac(isMac()), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = React.useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const sections = links
      .filter((l) => l.href.startsWith("/#") || l.href === "/")
      .map<Command>((l) => ({
        id: `go-${l.href}`,
        group: "Go to",
        label: l.title,
        icon: <Hash className="h-4 w-4" />,
        run: go(l.href),
      }));
    const docs: Command[] = [
      ...(config.resume
        ? [{ id: "resume", group: "Documents" as const, label: "Résumé", hint: "PDF", icon: <FileText className="h-4 w-4" />, keywords: "resume cv pdf", run: go("/resume/") }]
        : []),
      ...(config.cv
        ? [{ id: "cv", group: "Documents" as const, label: "CV", hint: "PDF", icon: <FileText className="h-4 w-4" />, keywords: "curriculum vitae pdf", run: go("/cv/") }]
        : []),
    ];
    const contact: Command[] = [
      {
        id: "email",
        group: "Contact",
        label: "Send an email",
        hint: config.email,
        icon: <Mail className="h-4 w-4" />,
        keywords: "contact mail",
        run: () => (window.location.href = `mailto:${config.email}`),
      },
      {
        id: "copy-email",
        group: "Contact",
        label: "Copy email address",
        icon: <Copy className="h-4 w-4" />,
        keywords: "contact clipboard",
        run: () => {
          navigator.clipboard?.writeText(config.email).then(
            () => toast({ description: "Email address copied." }),
            () => toast({ description: config.email })
          );
        },
      },
      ...(config.social.github
        ? [{ id: "github", group: "Contact" as const, label: "GitHub", hint: "Opens in a new tab", icon: <SiGithub className="h-4 w-4" />, keywords: "code repos", run: () => window.open(config.social.github, "_blank", "noopener,noreferrer") }]
        : []),
      ...(config.social.linkedin
        ? [{ id: "linkedin", group: "Contact" as const, label: "LinkedIn", hint: "Opens in a new tab", icon: <SiLinkedin className="h-4 w-4" />, keywords: "profile network", run: () => window.open(config.social.linkedin, "_blank", "noopener,noreferrer") }]
        : []),
    ];
    const settings: Command[] = [
      {
        id: "theme",
        group: "Settings",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        icon: resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
        keywords: "theme dark light appearance",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "text-size",
        group: "Settings",
        label: a11y.textSize === 2 ? "Reset text size" : "Increase text size",
        hint: ["Default", "Large", "Larger"][a11y.textSize],
        icon: <Type className="h-4 w-4" />,
        keywords: "accessibility font bigger zoom larger",
        run: () => setA11yPrefs({ textSize: a11y.textSize === 2 ? 0 : ((a11y.textSize + 1) as 1 | 2) }),
      },
      {
        id: "contrast",
        group: "Settings",
        label: a11y.highContrast ? "Turn off high contrast" : "Turn on high contrast",
        icon: <Contrast className="h-4 w-4" />,
        keywords: "accessibility contrast vision",
        run: () => setA11yPrefs({ highContrast: !a11y.highContrast }),
      },
      {
        id: "underline",
        group: "Settings",
        label: a11y.underlineLinks ? "Stop underlining links" : "Underline links",
        icon: <Underline className="h-4 w-4" />,
        keywords: "accessibility links",
        run: () => setA11yPrefs({ underlineLinks: !a11y.underlineLinks }),
      },
    ];
    return [...sections, ...docs, ...contact, ...settings];
  }, [router, resolvedTheme, setTheme, toast, a11y]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    // label matches first, then group/keyword matches
    const byLabel = commands.filter((c) => c.label.toLowerCase().includes(q));
    const rest = commands.filter(
      (c) => !byLabel.includes(c) && `${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
    return [...byLabel, ...rest];
  }, [commands, query]);

  React.useEffect(() => setActive(0), [query, open]);
  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  React.useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    setOpen(false);
    // let the dialog close (and restore scroll) before navigating
    setTimeout(cmd.run, 10);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="Search the site"
          className={cn(
            "flex h-8 items-center gap-2 rounded-full border border-border bg-background/40 px-3 text-xs normal-case text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
            className
          )}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-sans text-[10px] sm:inline">
            {mac ? "⌘" : "Ctrl"} K
          </kbd>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-[15vh] z-[2001] w-[min(92vw,34rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">Search the site</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Type to filter. Use the arrow keys to move and Enter to open.
          </DialogPrimitive.Description>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to a section, open the CV, copy my email…"
              aria-label="Search"
              aria-controls="command-list"
              aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Esc</kbd>
          </div>
          <ul id="command-list" role="listbox" ref={listRef} data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”</li>
            )}
            {filtered.map((cmd, i) => {
              const header = cmd.group !== lastGroup ? cmd.group : null;
              lastGroup = cmd.group;
              return (
                <React.Fragment key={cmd.id}>
                  {header && (
                    <li role="presentation" className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {header}
                    </li>
                  )}
                  <li
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={i === active}
                    data-index={i}
                    onMouseMove={() => setActive(i)}
                    onClick={() => run(cmd)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                      i === active ? "bg-secondary text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="flex-1 truncate">{cmd.label}</span>
                    {cmd.hint && <span className="hidden truncate text-xs text-muted-foreground sm:inline">{cmd.hint}</span>}
                    {i === active ? (
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0" />
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
