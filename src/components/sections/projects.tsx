import Link from "next/link";
import projects, { Project } from "@/data/projects";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const linkClass = "text-accent2 underline-offset-4 hover:underline";

const ProjectLinks = ({ project }: { project: Project }) => {
  const items = [
    project.github && (
      <Link key="code" href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Code
      </Link>
    ),
    project.poster && (
      <Link key="poster" href={`/posters/${project.id}/`} className={linkClass}>
        Poster
      </Link>
    ),
    project.poster && (
      <a key="pdf" href={project.poster} download className={linkClass}>
        Poster PDF
      </a>
    ),
    project.live && (
      <Link key="live" href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Live
      </Link>
    ),
  ].filter(Boolean);
  if (items.length === 0) return null;
  return (
    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">{items}</p>
  );
};

const ProjectsSection = () => (
  <SectionWrapper id="projects" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
    <SectionHeader id="projects" title="Projects" />
    {projects.length === 0 ? (
      <p className="text-muted-foreground">
        Project write-ups are on the way. In the meantime, see my work on{" "}
        <a href={config.social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          GitHub
        </a>
        .
      </p>
    ) : (
      <ol className="space-y-10">
        {projects.map((project) => (
          <li key={project.id} className={project.image ? "grid gap-5 sm:grid-cols-[12rem_1fr]" : undefined}>
            {project.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded-md border border-border object-cover"
              />
            )}
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{project.date}</p>
              </div>
              <p className="text-muted-foreground">
                {project.category} · {project.tech.join(", ")}
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/85 marker:text-muted-foreground">
                {project.highlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <ProjectLinks project={project} />
            </div>
          </li>
        ))}
      </ol>
    )}
  </SectionWrapper>
);

export default ProjectsSection;
