import { Cpu, Database } from "lucide-react";
import { SKILL_GROUPS, type Skill } from "@/data/constants";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const GENERIC = { cpu: Cpu, database: Database } as const;

// Logos sit on a white tile so dark logos (ROS, Linux) stay visible in dark mode.
const SkillIcon = ({ icon }: { icon: string }) => {
  const Generic = GENERIC[icon as keyof typeof GENERIC];
  return (
    <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-white">
      {Generic ? (
        <Generic className="h-4 w-4 text-slate-600" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" width={18} height={18} loading="lazy" className="h-[18px] w-[18px] object-contain" />
      )}
    </span>
  );
};

const SkillChip = ({ skill }: { skill: Skill }) => (
  <li className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 py-1 pl-1 pr-3 text-sm text-foreground">
    <SkillIcon icon={skill.icon} />
    {skill.name}
  </li>
);

const SkillsSection = () => (
  <SectionWrapper id="skills" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionHeader id="skills" title="Skills" />
    <div className="space-y-5">
      {SKILL_GROUPS.map((g) => (
        <div key={g.label} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <h3 className="pt-1.5 text-sm font-medium text-muted-foreground">{g.label}</h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <SkillChip key={s.name} skill={s} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
