"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, AudioLines, Cpu, ScanEye, SunMedium, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { AnimatePresence, motion } from "motion/react";

import projects, { Project, ProjectArea } from "@/data/projects";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const COVER_ICON: Record<string, typeof Cpu> = {
  "posture-checker": ScanEye,
  "asr-accent-bias": AudioLines,
  "smart-blinds": SunMedium,
  "16-bit-cpu": Cpu,
};

// Generated cover for cards without a screenshot: a hue-tinted dot grid with
// the project's icon and initials. Same input, same cover.
const ProjectCover = ({ project }: { project: Project }) => {
  const Icon = COVER_ICON[project.id] ?? Sparkles;
  const h = project.hue;
  return (
    <div
      aria-hidden
      className="relative aspect-[16/7] w-full overflow-hidden border-b border-border"
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, hsl(${h} 80% 55% / 0.35), transparent 55%), radial-gradient(100% 100% at 100% 100%, hsl(${(h + 60) % 360} 80% 55% / 0.25), transparent 60%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{
          backgroundImage: `radial-gradient(hsl(${h} 70% 60% / 0.7) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
      />
      <Icon
        className="absolute -bottom-6 -right-4 h-36 w-36 rotate-[-8deg] opacity-20 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
        style={{ color: `hsl(${h} 80% 60%)` }}
        strokeWidth={1.25}
      />
      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-background/60 backdrop-blur">
        <Icon className="h-5 w-5" style={{ color: `hsl(${h} 75% 55%)` }} />
      </div>
    </div>
  );
};

const AREAS: ("All" | ProjectArea)[] = ["All", ...Array.from(new Set(projects.map((p) => p.area)))];

const ProjectsSection = () => {
  const [area, setArea] = React.useState<(typeof AREAS)[number]>("All");
  const shown = area === "All" ? projects : projects.filter((p) => p.area === area);
  return (
    <SectionWrapper id="projects" className="max-w-6xl mx-auto py-24 px-4">
      <SectionHeader id="projects" title="Projects" desc="Selected work" className="static mb-12 md:mb-16" />
      {projects.length === 0 ? (
        <p className="mx-auto max-w-xl text-center text-muted-foreground">
          Project write-ups are on the way. In the meantime, see my work on{" "}
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub
          </a>
          .
        </p>
      ) : (
        <>
          {AREAS.length > 2 && (
            <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap justify-center gap-2">
              {AREAS.map((a) => {
                const count = a === "All" ? projects.length : projects.filter((p) => p.area === a).length;
                return (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={area === a}
                    onClick={() => setArea(a)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      area === a
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    {a} <span className="ml-1 opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {shown.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </SectionWrapper>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: (index % 2) * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card
        className={cn(
          "group flex h-full flex-col overflow-hidden bg-white/70 dark:bg-black/60 backdrop-blur-sm border-border",
          "hover:border-primary/20 transition-colors duration-300 shadow-sm hover:shadow-md"
        )}
      >
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
        ) : (
          <ProjectCover project={project} />
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
              {project.category}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{project.date}</span>
          </div>
          <CardTitle className="pt-3 text-xl font-bold tracking-tight">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-5">
          <ul className="list-disc list-outside ml-4 space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed">
            {project.highlights.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs font-normal text-muted-foreground bg-secondary/30 border-transparent"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SiGithub className="w-4 h-4" />
                  Code
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Live
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsSection;
