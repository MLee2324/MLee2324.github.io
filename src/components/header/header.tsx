"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
import { sections, documents } from "./config";
import ThemeToggle from "../theme/theme-toggle";
import CommandPalette from "../command-palette";
import AccessibilityMenu from "../accessibility-menu";
import Terminal from "../terminal";

// Inline links on wide screens skip "Skills" to keep the bar short; the menu
// and the search box still include it.
const INLINE = sections.filter((s) => s.title !== "Skills");

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const linkClass =
    "rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] border-b transition-colors",
        open
          ? "border-border bg-background"
          : scrolled
            ? "border-border bg-background/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 md:px-6">
        <Link href="/" className="mr-auto text-[15px] font-semibold tracking-tight text-foreground">
          {config.author}
        </Link>

        <nav aria-label="Sections" className="hidden items-center lg:flex">
          {INLINE.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.title}
            </Link>
          ))}
          <span aria-hidden className="mx-1.5 h-4 w-px bg-border" />
          {documents.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname?.startsWith(l.href) ? "page" : undefined}
              className={cn(linkClass, pathname?.startsWith(l.href) && "text-foreground")}
            >
              {l.title}
            </Link>
          ))}
        </nav>

        <div className="ml-2 flex items-center gap-1.5">
          <CommandPalette />
          <Terminal />
          <AccessibilityMenu />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-border lg:hidden">
          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3 md:px-6">
            {[...sections, ...documents].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
