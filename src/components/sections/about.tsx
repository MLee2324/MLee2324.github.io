import { ABOUT } from "@/data/about";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const AboutSection = () => (
  <SectionWrapper id="about" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionHeader id="about" title="About" />
    <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
      <p className="text-[17px] leading-relaxed text-foreground/90">{ABOUT.intro}</p>
      <dl className="space-y-3 text-sm">
        {ABOUT.facts.map((f) => (
          <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-3">
            <dt className="text-muted-foreground">{f.label}</dt>
            <dd className="text-foreground">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>

    <h3 className="mb-4 mt-12 text-sm font-semibold text-foreground">Current coursework</h3>
    <ul className="grid gap-6 md:grid-cols-2">
      {ABOUT.courses.map((c) => (
        <li key={c.title} className="border-l-2 border-accent2/60 pl-4">
          <p className="font-medium text-foreground">{c.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);

export default AboutSection;
