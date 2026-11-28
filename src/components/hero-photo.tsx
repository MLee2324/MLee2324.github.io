"use client";

import { useEffect, useState } from "react";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import CvOverlay from "./cv-overlay";

// Shows config.photo once it has loaded; shows initials until then, or for
// good if the photo is unset or missing. Loading through `new Image()` avoids
// missing an error event that fires before hydration.
export default function HeroPhoto({
  className,
  initialsClassName = "text-7xl",
}: {
  className?: string;
  initialsClassName?: string;
}) {
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
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-secondary/60">
        {loaded && config.photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={config.photo} alt={config.author} className="h-full w-full object-cover" />
            <CvOverlay />
          </>
        ) : (
          <div
            role="img"
            aria-label={config.author}
            className={cn(
              "flex h-full w-full items-center justify-center font-semibold tracking-tight text-foreground/70",
              initialsClassName
            )}
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
