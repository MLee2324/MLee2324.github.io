import { Link } from "@/types";
import { config } from "@/data/config";

const links: Link[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Latest", href: "/#news" },
  { title: "Research", href: "/#research" },
  { title: "Experience", href: "/#experience" },
  { title: "Projects", href: "/#projects" },
  { title: "Publications", href: "/#publications" },
  { title: "Skills", href: "/#skills" },
  ...(config.resume ? [{ title: "Résumé", href: "/resume/" }] : []),
  ...(config.cv ? [{ title: "CV", href: "/cv/" }] : []),
];

export { links };
