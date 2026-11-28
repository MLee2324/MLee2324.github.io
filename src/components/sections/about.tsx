import { ABOUT } from "@/data/about";
import CodeCard from "../code-card";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const AboutSection = () => (
  <SectionWrapper id="about" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionHeader id="about" title="About" />
    <div className="grid items-start gap-10 md:grid-cols-[1fr_1fr]">
      <div>
        <p className="text-[17px] leading-relaxed text-foreground/90">
          {ABOUT.intro}
        </p>

        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">Right now</h3>
        <ul className="space-y-2.5">
          {ABOUT.now.map((n) => (
            <li key={n.label} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="text-base leading-6">
                {n.emoji}
              </span>
              <span>
                <span className="font-medium text-foreground">{n.label}: </span>
                <span className="text-muted-foreground">{n.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <CodeCard />
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
