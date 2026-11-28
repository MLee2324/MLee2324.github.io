export type Link = { title: string; href: string };
import { config } from "@/data/config";
import github from "@/data/github.json";

// Section links (shown inline in the header on wide screens and in the menu
// on small ones) followed by the documents.
const sections: Link[] = [
  { title: "About", href: "/#about" },
  { title: "News", href: "/#news" },
  { title: "Research", href: "/#research" },
  { title: "Experience", href: "/#experience" },
  { title: "Projects", href: "/#projects" },
  // only when the deploy fetched GitHub data (otherwise the section is hidden)
  ...(github.generatedAt ? [{ title: "GitHub", href: "/#github" }] : []),
  { title: "Publications", href: "/#publications" },
  { title: "Skills", href: "/#skills" },
];

const documents: Link[] = [
  ...(config.resume ? [{ title: "Résumé", href: "/resume/" }] : []),
  ...(config.cv ? [{ title: "CV", href: "/cv/" }] : []),
];

const links: Link[] = [{ title: "Home", href: "/" }, ...sections, ...documents];

export { links, sections, documents };
