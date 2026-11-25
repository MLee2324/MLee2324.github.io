"use client";

import { useEffect, useState } from "react";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

// Shows config.photo once it has loaded; shows initials until then, or for
// good if the photo is unset or missing. Loading through `new Image()` avoids
// missing an error event that fires before hydration.
export default function HeroPhoto({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const initials = config.author
    .split(" ")
    .map((part) => part[0])
    .join("");

  useEffect(() => {
    if (!config.photo) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.src = config.photo;
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={cn("relative aspect-[4/5]", className)}>
      {/* soft glow behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sky-500/25 via-indigo-500/20 to-fuchsia-500/20 blur-3xl"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 shadow-2xl">
        {loaded && config.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={config.photo} alt={config.author} className="h-full w-full object-cover" />
        ) : (
          <div
            role="img"
            aria-label={config.author}
            className="flex h-full w-full items-center justify-center font-display text-7xl font-bold text-white/80"
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
