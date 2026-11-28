import { SKILL_GROUPS } from "@/data/constants";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const SkillsSection = () => (
  <SectionWrapper id="skills" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionHeader id="skills" title="Skills" />
    <dl className="space-y-3">
      {SKILL_GROUPS.map((g) => (
        <div key={g.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <dt className="text-sm font-medium text-muted-foreground">{g.label}</dt>
          <dd className="text-foreground/90">{g.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  </SectionWrapper>
);

export default SkillsSection;
