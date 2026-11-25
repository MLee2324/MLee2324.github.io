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

function MainPage() {
  return (
    <SmoothScroll>
      <main className={cn("bg-slate-100 dark:bg-transparent")}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
