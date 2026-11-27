"use client";

import { Accessibility, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { resetA11yPrefs, setA11yPrefs, TextSize, useA11yPrefs } from "@/lib/a11y-prefs";
import { setMotionPreference, usePerfProfile } from "@/hooks/use-perf-profile";
import { cn } from "@/lib/utils";

const SIZES: { value: TextSize; label: string; sample: string }[] = [
  { value: 0, label: "Default", sample: "text-xs" },
  { value: 1, label: "Large", sample: "text-sm" },
  { value: 2, label: "Larger", sample: "text-base" },
];

function Switch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-lg px-2 py-2 text-left transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{description}</span>
      </span>
      <span
        aria-hidden
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
          checked ? "border-foreground bg-foreground" : "border-border bg-secondary"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3.5 w-3.5 rounded-full transition-[left,background-color]",
            checked ? "left-[18px] bg-background" : "left-0.5 bg-muted-foreground"
          )}
        />
      </span>
    </button>
  );
}

export default function AccessibilityMenu({ className }: { className?: string }) {
  const prefs = useA11yPrefs();
  const { ready, reducedMotion } = usePerfProfile();
  const motionOff = ready && reducedMotion;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Accessibility options"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
            className
          )}
        >
          <Accessibility className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="z-[1500] w-80 rounded-2xl p-3 font-sans normal-case">
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <p className="text-sm font-semibold text-foreground">Accessibility</p>
          <button
            type="button"
            onClick={() => {
              resetA11yPrefs();
              setMotionPreference(null);
            }}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" aria-hidden />
            Reset
          </button>
        </div>

        <div className="px-2 pb-3">
          <p id="a11y-text-size" className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Text size
          </p>
          <div role="radiogroup" aria-labelledby="a11y-text-size" className="grid grid-cols-3 gap-1 rounded-xl border border-border p-1">
            {SIZES.map((s) => (
              <button
                key={s.value}
                type="button"
                role="radio"
                aria-checked={prefs.textSize === s.value}
                onClick={() => setA11yPrefs({ textSize: s.value })}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition-colors",
                  prefs.textSize === s.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                <span className={cn("font-display font-bold leading-none", s.sample)}>Aa</span>
                <span className="text-[11px]">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-2">
          <Switch
            label="High contrast"
            description="Stronger text, borders, and solid backgrounds"
            checked={prefs.highContrast}
            onChange={(v) => setA11yPrefs({ highContrast: v })}
          />
          <Switch
            label="Underline links"
            description="Make every link easy to spot"
            checked={prefs.underlineLinks}
            onChange={(v) => setA11yPrefs({ underlineLinks: v })}
          />
          <Switch
            label="Reduce motion"
            description="Turn off animations and background effects"
            checked={motionOff}
            onChange={(v) => setMotionPreference(v ? "off" : "on")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
