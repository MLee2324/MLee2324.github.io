import { EXPERIENCE } from "@/data/constants";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const Bullets = ({ points }: { points: string[] }) => (
  <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/85 marker:text-muted-foreground">
    {points.map((p, i) => (
      <li key={i}>{p}</li>
    ))}
  </ul>
);

const ExperienceSection = () => {
  if (EXPERIENCE.length === 0) return null;
  return (
    <SectionWrapper id="experience" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeader id="experience" title="Research experience" />
      <ol className="space-y-10">
        {EXPERIENCE.map((exp) => {
          const plain = exp.description.filter((d): d is string => typeof d === "string");
          const groups = exp.description.filter((d): d is { heading: string; points: string[] } => typeof d !== "string");
          return (
            <li
              key={exp.id}
              data-speak={[
                `${exp.title}, ${exp.company.replace(" · ", ". ")}, ${exp.periods.map((p) => `${p.start} to ${p.end}`).join(", ")}.`,
                ...plain,
                ...groups.flatMap((g) => [g.heading + ".", ...g.points]),
              ].join(" ")}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                <p className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {exp.periods.map((p) => `${p.start} – ${p.end}`).join(", ")}
                </p>
              </div>
              <p className="text-muted-foreground">{exp.company}</p>
              {plain.length > 0 && <Bullets points={plain} />}
              {groups.map((g) => (
                <div key={g.heading} className="mt-4">
                  <h4 className="font-medium text-foreground">{g.heading}</h4>
                  <Bullets points={g.points} />
                </div>
              ))}
            </li>
          );
        })}
      </ol>
    </SectionWrapper>
  );
};

export default ExperienceSection;
