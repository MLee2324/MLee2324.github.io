import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "@/data/projects";
import { config } from "@/data/config";
import { DocumentView } from "../../resume/resume-view";

// One static page per project that has a poster PDF: /posters/<project id>/
const withPoster = () => projects.filter((p) => p.poster);

export const dynamicParams = false;

export function generateStaticParams() {
  const ids = withPoster().map((p) => ({ id: p.id }));
  // A static export can't build a dynamic route with no pages, so until a
  // project has a poster, emit one placeholder that renders the 404 page.
  return ids.length ? ids : [{ id: "none" }];
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = withPoster().find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} poster | ${config.author}`,
    description: `Poster for ${project.title} by ${config.author}. View online or download the PDF.`,
  };
}

export default async function PosterPage({ params }: Props) {
  const { id } = await params;
  const project = withPoster().find((p) => p.id === id);
  if (!project) notFound();
  return (
    <DocumentView
      label={`${project.title} poster`}
      path={project.poster!}
      backHref="/#projects"
      backLabel="Back to projects"
      frame="fill"
    />
  );
}
