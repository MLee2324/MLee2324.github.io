import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import HeroPhoto from "../hero-photo";

const button =
  "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70";

const HeroSection = () => {
  const links = [
    ...(config.resume ? [{ label: "Résumé", href: "/resume/", Icon: FileText, external: false }] : []),
    ...(config.cv ? [{ label: "CV", href: "/cv/", Icon: FileText, external: false }] : []),
    { label: "Email", href: `mailto:${config.email}`, Icon: Mail, external: false },
    ...(config.social.github ? [{ label: "GitHub", href: config.social.github, Icon: SiGithub, external: true }] : []),
    ...(config.social.linkedin ? [{ label: "LinkedIn", href: config.social.linkedin, Icon: SiLinkedin, external: true }] : []),
  ];

  return (
    <SectionWrapper id="hero" className="mx-auto max-w-5xl px-4 pb-6 pt-28 md:px-6 md:pb-8 md:pt-36">
      <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{config.author}</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {config.headline} · University of Utah
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-foreground/85">{config.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {links.map(({ label, href, Icon, external }, i) => (
              <Link
                key={label}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className={cn(
                  button,
                  i === 0 && "border-transparent bg-foreground text-background hover:bg-foreground/90"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            ))}
          </div>
        </div>
        <HeroPhoto className="w-24 shrink-0 sm:w-36 md:w-56" initialsClassName="text-3xl sm:text-4xl md:text-6xl" />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
