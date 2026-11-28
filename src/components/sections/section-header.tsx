import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Plain section title: left-aligned, with a hairline rule, and an optional
// one-line description underneath.
export const SectionHeader = ({
  id,
  title,
  desc,
  className,
}: {
  id: string;
  title: string | ReactNode;
  desc?: string;
  className?: string;
}) => (
  <div className={cn("mb-8 border-b border-border pb-3", className)}>
    <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
      {title}
    </h2>
    {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
  </div>
);
