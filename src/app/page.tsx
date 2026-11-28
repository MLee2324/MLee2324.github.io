import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import NewsSection from "@/components/sections/news";
import ResearchSection from "@/components/sections/research";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import PublicationsSection from "@/components/sections/publications";
import SkillsSection from "@/components/sections/skills";
import GitHubActivitySection from "@/components/sections/github-activity";

export default function MainPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <ResearchSection />
      <ExperienceSection />
      <ProjectsSection />
      <GitHubActivitySection />
      <PublicationsSection />
      <SkillsSection />
    </main>
  );
}
