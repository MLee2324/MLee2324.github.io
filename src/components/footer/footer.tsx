import { config } from "@/data/config";

// The deploy date, set in next.config.mjs. (A plain `new Date()` here would
// use the visitor's clock, since this renders in the browser too.)
const BUILT = new Date(process.env.BUILD_DATE ?? Date.now());
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
