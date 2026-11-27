"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Brain, Eye, HandHelping } from "lucide-react";
import { RESEARCH_THEMES } from "@/data/research";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

// One icon and hue per stage, in order. The hues run sky → indigo → fuchsia
// to match the glow behind the hero card.
const STAGE = [
  { Icon: Eye, ring: "from-sky-500 to-sky-400", text: "text-sky-600 dark:text-sky-300", glow: "bg-sky-500" },
  { Icon: Brain, ring: "from-indigo-500 to-indigo-400", text: "text-indigo-600 dark:text-indigo-300", glow: "bg-indigo-500" },
  { Icon: HandHelping, ring: "from-fuchsia-500 to-fuchsia-400", text: "text-fuchsia-600 dark:text-fuchsia-300", glow: "bg-fuchsia-500" },
];

const ResearchSection = () => {
  return (
    <SectionWrapper id="research" className="max-w-6xl mx-auto py-24 px-4">
      <SectionHeader
        id="research"
        title="Research"
        desc="Three questions an assistive system has to answer, and the work I've done on each."
        className="static mb-14 md:mb-20"
      />

      <div className="relative">
        {/* the flow line linking the three stages (desktop) */}
        <div
          aria-hidden
          className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-sky-500/70 via-indigo-500/70 to-fuchsia-500/70 md:block"
        />
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute left-[16.66%] right-[16.66%] top-[27px] hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 blur-[2px] md:block"
        />

        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          {RESEARCH_THEMES.map((theme, i) => {
            const { Icon, ring, text, glow } = STAGE[i % STAGE.length];
            return (
              <motion.li
                key={theme.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.25, ease: "easeOut" }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <span aria-hidden className={cn("absolute inset-0 rounded-full opacity-30 blur-xl transition-opacity group-hover:opacity-70", glow)} />
                  <span className={cn("relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br p-[2px]", ring)}>
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-background">
                      <Icon className={cn("h-6 w-6", text)} aria-hidden />
                    </span>
                  </span>
                </div>
                <p className={cn("text-xs font-semibold uppercase tracking-[0.3em]", text)}>
                  {String(i + 1).padStart(2, "0")} · {theme.step}
                </p>

                <div className="mt-4 flex h-full w-full flex-col rounded-2xl border border-border bg-white/70 p-6 text-left backdrop-blur-sm transition-colors duration-300 hover:border-primary/20 dark:bg-black/60">
                  <h3 className="text-xl font-bold">{theme.title}</h3>
                  <p className="mt-2 font-medium text-foreground/90">{theme.question}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{theme.body}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {theme.work.map((w) => (
                      <Link
                        key={w.label}
                        href={w.href}
                        className="rounded-full border border-border bg-secondary/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                      >
                        {w.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </SectionWrapper>
  );
};

export default ResearchSection;
