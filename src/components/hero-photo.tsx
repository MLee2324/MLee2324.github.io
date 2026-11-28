"use client";

import { useEffect, useRef, useState } from "react";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import CvOverlay from "./cv-overlay";

// Shows config.photo, or the author's initials if the photo is unset or fails
// to load. The <img> is in the server-rendered HTML so the photo paints as
// soon as it downloads, without waiting for scripts. A load error can fire
// before hydration, so it's also checked once on mount.
export default function HeroPhoto({
  className,
  initialsClassName = "text-7xl",
}: {
  className?: string;
  initialsClassName?: string;
}) {
  const [failed, setFailed] = useState(!config.photo);
  const imgRef = useRef<HTMLImageElement>(null);
  const initials = config.author
    .split(" ")
    .map((part) => part[0])
    .join("");

  useEffect(() => {
    const img = imgRef.current;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading an error that happened before hydration
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={cn("relative aspect-[4/5]", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-secondary/60">
        {!failed && config.photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={config.photo}
              alt={config.author}
              width={560}
              height={700}
              fetchPriority="high"
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
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
