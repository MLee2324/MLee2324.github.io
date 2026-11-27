"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FlaskConical, GraduationCap, Mic, Wrench } from "lucide-react";
import { NEWS, NEWS_PREVIEW_COUNT, NewsKind } from "@/data/news";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const KIND: Record<NewsKind, { Icon: typeof FlaskConical; dot: string; label: string }> = {
  research: { Icon: FlaskConical, dot: "bg-sky-500", label: "Research" },
  milestone: { Icon: GraduationCap, dot: "bg-emerald-500", label: "Milestone" },
  project: { Icon: Wrench, dot: "bg-indigo-500", label: "Project" },
  talk: { Icon: Mic, dot: "bg-amber-500", label: "Talk" },
};

const NewsSection = () => {
  const [showAll, setShowAll] = useState(false);
  if (NEWS.length === 0) return null;
  const items = showAll ? NEWS : NEWS.slice(0, NEWS_PREVIEW_COUNT);

  return (
    <SectionWrapper id="news" className="max-w-3xl mx-auto py-24 px-4">
      <SectionHeader id="news" title="Latest" desc="What I've been up to" className="static mb-12 md:mb-16" />

      <ol className="relative ml-3 border-l border-border">
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const { Icon, dot, label } = KIND[item.kind];
            const external = item.link?.href.startsWith("http");
            return (
              <motion.li
                key={item.date + item.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, delay: (i % NEWS_PREVIEW_COUNT) * 0.06 }}
                viewport={{ once: true, margin: "-40px" }}
                className="group relative pb-8 pl-8 last:pb-0"
              >
                <span
                  className={cn(
                    "absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-white ring-4 ring-background",
                    "transition-transform duration-300 group-hover:scale-110",
                    dot
                  )}
                >
                  <Icon className="h-3 w-3" aria-hidden />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <time className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground">{item.date}</time>
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
                </div>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  {item.text}
                  {item.link && (
                    <>
                      {" "}
                      <Link
                        href={item.link.href}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center gap-0.5 whitespace-nowrap font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                      >
                        {item.link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </>
                  )}
                </p>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>

      {NEWS.length > NEWS_PREVIEW_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {showAll ? "Show less" : `Show all ${NEWS.length}`}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default NewsSection;
