"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { ABOUT } from "@/data/about";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const fadeUp = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: index * 0.08, ease: "easeOut" as const },
  viewport: { once: true, margin: "-50px" },
});

const cardClass = cn(
  "bg-white/70 dark:bg-black/60 backdrop-blur-sm border-border",
  "hover:border-primary/20 transition-colors duration-300"
);

const AboutSection = () => {
  return (
    <SectionWrapper id="about" className="flex flex-col items-center justify-center min-h-screen py-24">
      <div className="w-full max-w-5xl px-4 md:px-8 mx-auto">
        <SectionHeader id="about" title="About Me" className="static mb-12 md:mb-16" />

        <div className="grid gap-4 md:grid-cols-5">
          <motion.div {...fadeUp(0)} className="md:col-span-3">
            <Card className={cn(cardClass, "h-full")}>
              <CardContent className="p-6 md:p-8 flex flex-col gap-6 h-full">
                <p className="text-lg leading-relaxed text-foreground/90">{ABOUT.intro}</p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 mt-auto">
                  {ABOUT.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">{fact.label}</dt>
                      <dd className="mt-1 font-semibold">{fact.value}</dd>
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">Email</dt>
                    <dd className="mt-1 font-semibold">
                      <a
                        href={`mailto:${config.email}`}
                        className="pointer-events-auto inline-flex items-center gap-2 hover:underline underline-offset-4"
                      >
                        <Mail className="w-4 h-4" />
                        {config.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </motion.div>

          <div className="md:col-span-2 grid gap-4">
            {ABOUT.highlights.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i + 1)}>
                <Card className={cardClass}>
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-xl font-bold font-display">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.sub}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <h3 className="mt-16 mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Courses right now
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {ABOUT.courses.map((course, i) => (
            <motion.div key={course.title} {...fadeUp(i)}>
              <Card className={cn(cardClass, "h-full")}>
                <CardContent className="p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{course.caption}</p>
                  <p className="mt-2 text-xl font-bold font-display">{course.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.detail}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
