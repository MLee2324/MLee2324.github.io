"use client";

import { useRef, type CSSProperties } from "react";
import { useReveal } from "@/lib/reveal";
import { SKILLS } from "@/data/constants";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const SkillsSection = () => {
  const ref = useRef<HTMLUListElement>(null);
  useReveal(ref);
  return (
    <SectionWrapper id="skills" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeader id="skills" title="Skills" />
      <ul ref={ref} className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
        {SKILLS.map((skill, i) => (
          <li
            key={skill.name}
            className="reveal"
            style={{ "--skill": skill.color, "--reveal-delay": `${i * 0.04}s` } as CSSProperties}
          >
            <div
              className={cn(
                "group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl p-5 text-center",
                "border border-border/60 bg-secondary/20",
                "transition-[transform,border-color,background-color,box-shadow] duration-300",
                "hover:-translate-y-1 hover:border-[var(--skill)] hover:bg-secondary/40",
                "hover:shadow-[0_10px_40px_-12px_var(--skill)]",
              )}
            >
              {/* soft glow in the skill's color */}
              <span
                aria-hidden
                style={{ background: "var(--skill)" }}
                className="pointer-events-none absolute -top-6 h-16 w-16 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={skill.icon}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                className={cn(
                  "relative size-10 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 md:size-11",
                  skill.invertInDark && "dark:invert",
                )}
              />
              <span className="relative text-sm font-semibold text-foreground md:text-base">{skill.name}</span>
              <span className="relative text-xs leading-relaxed text-muted-foreground">{skill.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default SkillsSection;
