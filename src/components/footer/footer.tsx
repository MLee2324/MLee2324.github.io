import Link from "next/link";
import { footer } from "./config";
import { config } from "@/data/config";

// Static export: evaluated at build time, so these show the deploy date.
const BUILT = new Date();
const UPDATED = BUILT.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

function Footer() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p>
          © {BUILT.getUTCFullYear()} {config.author} · Last updated {UPDATED}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          {footer.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground">
              {l.title}
            </Link>
          ))}
          {config.social.github && (
            <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              GitHub
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
