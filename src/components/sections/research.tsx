import Link from "next/link";
import { RESEARCH_AREAS } from "@/data/research";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const ResearchSection = () => (
  <SectionWrapper id="research" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionHeader id="research" title="Research areas" />
    <ul className="grid gap-8 md:grid-cols-3">
      {RESEARCH_AREAS.map((area) => (
        <li key={area.id}>
          <h3 className="font-semibold text-foreground">{area.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Related:{" "}
            {area.work.map((w, i) => (
              <span key={w.label}>
                {i > 0 && ", "}
                <Link href={w.href} className="text-accent2 underline decoration-accent2/40 underline-offset-4 transition-colors hover:decoration-accent2">
                  {w.label}
                </Link>
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);

export default ResearchSection;
