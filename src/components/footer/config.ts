import { config } from "@/data/config";

const footer: { title: string; href: string }[] = [
  ...(config.resume ? [{ title: "Résumé", href: "/resume/" }] : []),
  ...(config.cv ? [{ title: "CV", href: "/cv/" }] : []),
  { title: "Email", href: `mailto:${config.email}` },
];

export { footer };
