import { Link } from "@/types";
import { config } from "@/data/config";

const links: Link[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Skills", href: "/#skills" },
  { title: "Experience", href: "/#experience" },
  { title: "Projects", href: "/#projects" },
  ...(config.resume ? [{ title: "Résumé", href: "/resume/" }] : []),
  ...(config.cv ? [{ title: "CV", href: "/cv/" }] : []),
  { title: "Contact", href: "/#contact" },
];

export { links };
