import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import NewsSection from "@/components/sections/news";
import ResearchSection from "@/components/sections/research";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import PublicationsSection from "@/components/sections/publications";
import SkillsSection from "@/components/sections/skills";
import { config } from "@/data/config";

// Structured data so search engines can show a profile card for this page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: config.author,
  url: config.site,
  ...(config.photo && { image: config.site + config.photo }),
  jobTitle: "Undergraduate Researcher",
  description: config.description.short,
  affiliation: { "@type": "CollegeOrUniversity", name: "University of Utah" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Utah" },
  knowsAbout: ["Computer vision", "Multimodal learning", "Human-computer interaction", "Assistive technology"],
  knowsLanguage: ["English", "Korean"],
  sameAs: [config.social.github, config.social.linkedin].filter(Boolean),
};

export default function MainPage() {
  return (
    <main id="content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <ResearchSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <SkillsSection />
    </main>
  );
}
