import { config } from "@/data/config";

// Static export: evaluated at build time, so these show the deploy date.
const BUILT = new Date();
const UPDATED = BUILT.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

// Just the copyright line; the hero already has every link.
export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border">
      <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground md:px-6">
        © {BUILT.getUTCFullYear()} {config.author}. All rights reserved. · Last updated {UPDATED}
      </p>
    </footer>
  );
}
