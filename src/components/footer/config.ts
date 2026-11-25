import { config } from "@/data/config";

const footer: { title: string; href: string }[] = [
  ...(config.resume ? [{ title: "Resume", href: "/resume/" }] : []),
  { title: "Email", href: `mailto:${config.email}` },
];

export { footer };
