"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Star } from "lucide-react";
import { PUBLICATIONS, Publication, PublicationType } from "@/data/publications";
import { config } from "@/data/config";
import { toBibtex } from "@/lib/bibtex";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const LINK_LABELS: Record<keyof NonNullable<Publication["links"]>, string> = {
  paper: "Paper",
  pdf: "PDF",
  doi: "DOI",
  code: "Code",
  poster: "Poster",
  slides: "Slides",
};

// Colored venue-type tab, like the venue badges on academic sites.
const TYPE_STYLE: Record<PublicationType, string> = {
  Journal: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Conference: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  Workshop: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  Preprint: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30",
  Poster: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Talk: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/30",
};

const Authors = ({ authors }: { authors: string[] }) => (
  <p className="text-sm text-muted-foreground">
    {authors.map((name, i) => (
      <Fragment key={name}>
        {i > 0 && ", "}
        <span className={cn(name === config.author && "font-semibold text-foreground underline decoration-sky-500/60 underline-offset-4")}>
          {name}
        </span>
      </Fragment>
    ))}
  </p>
);

type Panel = "abstract" | "bibtex" | null;

const toggleClass = (active: boolean) =>
  cn(
    "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
  );

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [copied, setCopied] = useState(false);
  const bibtex = toBibtex(pub);
  const abstract = pub.abstract;
  const links = (Object.keys(LINK_LABELS) as (keyof typeof LINK_LABELS)[]).filter((key) => pub.links?.[key]);
  const toggle = (p: Exclude<Panel, null>) => setPanel((cur) => (cur === p ? null : p));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked; the text is still selectable */
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="bg-white/70 dark:bg-black/60 backdrop-blur-sm border-border hover:border-primary/20 transition-colors duration-300">
        <CardContent className="grid gap-4 p-6 sm:grid-cols-[7rem_1fr]">
          <div className="flex items-start gap-2 sm:flex-col">
            <span className={cn("rounded-md border px-2.5 py-1 text-center text-[11px] font-semibold uppercase tracking-widest", TYPE_STYLE[pub.type])}>
              {pub.type}
            </span>
            <span className="font-mono text-xs text-muted-foreground sm:pl-0.5">{pub.date}</span>
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <h3 className="text-lg md:text-xl font-bold tracking-tight">
              {pub.title}
              {pub.selected && (
                <span className="ml-2 inline-flex translate-y-[-2px] items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 align-middle font-sans text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                  <Star className="h-3 w-3 fill-current" aria-hidden />
                  Selected
                </span>
              )}
            </h3>
            {pub.authors && pub.authors.length > 0 && <Authors authors={pub.authors} />}
            <p className="text-sm italic text-muted-foreground">{pub.venue}</p>
            {pub.summary && <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{pub.summary}</p>}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {abstract && (
                <button type="button" className={toggleClass(panel === "abstract")} aria-expanded={panel === "abstract"} onClick={() => toggle("abstract")}>
                  Abstract
                </button>
              )}
              <button type="button" className={toggleClass(panel === "bibtex")} aria-expanded={panel === "bibtex"} onClick={() => toggle("bibtex")}>
                BibTeX
              </button>
              {links.map((key) => (
                <a
                  key={key}
                  href={pub.links![key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(toggleClass(false), "inline-flex items-center gap-1")}
                >
                  {LINK_LABELS[key]}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>

            <AnimatePresence initial={false}>
              {panel && (
                <motion.div
                  key={panel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {panel === "abstract" ? (
                    <p className="mt-2 rounded-lg border border-border bg-secondary/30 p-4 text-sm leading-relaxed text-muted-foreground">
                      {abstract}
                    </p>
                  ) : (
                    <div className="relative mt-2">
                      <pre className="overflow-x-auto rounded-lg border border-border bg-secondary/30 p-4 pr-12 text-xs leading-relaxed">
                        <code>{bibtex}</code>
                      </pre>
                      <button
                        type="button"
                        onClick={copy}
                        aria-label={copied ? "Copied" : "Copy BibTeX"}
                        className="absolute right-2 top-2 rounded-md border border-border bg-background/80 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.li>
  );
}

const PublicationsSection = () => {
  return (
    <SectionWrapper id="publications" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeader id="publications" title="Publications" />
      {PUBLICATIONS.length === 0 ? (
        <p className="text-muted-foreground">Publications will be listed here.</p>
      ) : (
        <ol className="flex flex-col gap-4">
          {PUBLICATIONS.map((pub, index) => (
            <PublicationCard key={pub.id} pub={pub} index={index} />
          ))}
        </ol>
      )}
    </SectionWrapper>
  );
};

export default PublicationsSection;
