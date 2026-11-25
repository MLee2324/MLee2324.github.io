"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "motion/react";

import projects, { Project } from "@/data/projects";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
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
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
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
