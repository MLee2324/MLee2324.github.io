"use client";

import { useSyncExternalStore } from "react";
import { A11Y_KEY } from "./a11y-script";
export { A11Y_KEY };

// Visitor accessibility preferences. They are stored in localStorage and
// applied as data attributes on <html>, which globals.css styles:
//   data-text-size="1" | "2"   larger root font size (everything is in rem)
//   data-contrast="high"       stronger text, borders, and solid surfaces
//   data-underline-links       underline every link
// src/lib/a11y-script.ts applies them before first paint so the page doesn't flash.

export type TextSize = 0 | 1 | 2;
export type A11yPrefs = { textSize: TextSize; highContrast: boolean; underlineLinks: boolean };

export const DEFAULT_PREFS: A11yPrefs = { textSize: 0, highContrast: false, underlineLinks: false };


let prefs: A11yPrefs = DEFAULT_PREFS;
let initialized = false;
const listeners = new Set<() => void>();

function read(): A11yPrefs {
  try {
    const raw = JSON.parse(localStorage.getItem(A11Y_KEY) || "{}");
    return {
      textSize: raw.textSize === 1 || raw.textSize === 2 ? raw.textSize : 0,
      highContrast: raw.highContrast === true,
      underlineLinks: raw.underlineLinks === true,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function apply(p: A11yPrefs) {
  const d = document.documentElement;
  if (p.textSize) d.dataset.textSize = String(p.textSize);
  else delete d.dataset.textSize;
  if (p.highContrast) d.dataset.contrast = "high";
  else delete d.dataset.contrast;
  if (p.underlineLinks) d.dataset.underlineLinks = "";
  else delete d.dataset.underlineLinks;
}

export function setA11yPrefs(update: Partial<A11yPrefs>) {
  prefs = { ...prefs, ...update };
  try {
    localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
  apply(prefs);
  listeners.forEach((l) => l());
}

export function resetA11yPrefs() {
  setA11yPrefs(DEFAULT_PREFS);
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function getSnapshot() {
  if (!initialized && typeof window !== "undefined") {
    prefs = read();
    initialized = true;
  }
  return prefs;
}

export function useA11yPrefs(): A11yPrefs {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_PREFS);
}
