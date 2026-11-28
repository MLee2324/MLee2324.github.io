"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// The visitor's motion setting: "off" (reduce motion), "on" (allow it), or
// null (follow the operating system). Saved in localStorage and shared by
// every component that reads it.
export type MotionPref = "on" | "off" | null;

const KEY = "portfolio:motion-pref";
const listeners = new Set<() => void>();
let pref: MotionPref = null;
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const v = localStorage.getItem(KEY);
    pref = v === "on" || v === "off" ? v : null;
  } catch {
    /* storage blocked: follow the OS */
  }
}

export function setMotionPreference(next: MotionPref) {
  pref = next;
  try {
    if (next) localStorage.setItem(KEY, next);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: still applies for this visit */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** Whether motion should be reduced, plus `ready` once the client has checked. */
export function useReducedMotion(): { reducedMotion: boolean; ready: boolean } {
  const saved = useSyncExternalStore(
    subscribe,
    () => (load(), pref),
    () => null
  );
  const [osReduce, setOsReduce] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOsReduce(mq.matches);
    update();
    setReady(true);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const reducedMotion = saved === "off" ? true : saved === "on" ? false : osReduce;
  return { reducedMotion, ready };
}
