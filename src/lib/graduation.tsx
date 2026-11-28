"use client";

import { useSyncExternalStore } from "react";
import { config } from "@/data/config";

// Whether config.graduation.switchOn has passed, checked in the visitor's
// browser, so graduation wording turns past tense on its own without a
// rebuild. The server-rendered HTML always has the "before" wording.
const noop = () => () => {};
const passed = () => Date.now() >= new Date(config.graduation.switchOn).getTime();

export function useGraduated(): boolean {
  return useSyncExternalStore(noop, passed, () => false);
}

/** `before` until graduation, then `after`. */
export function GradText({ before, after }: { before: string; after: string }) {
  return <>{useGraduated() ? after : before}</>;
}
