"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import PublicationsSection from "@/components/sections/publications";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import NewsSection from "@/components/sections/news";
import ResearchSection from "@/components/sections/research";
import ScrollProgress from "@/components/ui/scroll-progress";

function MainPage() {
  return (
    <SmoothScroll>
      <ScrollProgress className="z-[1001] h-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500" />
      <main className={cn("bg-slate-100 dark:bg-transparent")}>
        <HeroSection />
        <AboutSection />
        <NewsSection />
        <ResearchSection />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
        <SkillsSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
