"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion-pref";

// Types each phrase, pauses, deletes it, and moves to the next. With reduced
// motion it simply shows the first phrase. Screen readers get one plain
// sentence (sr-only) instead of the changing text.
export default function TypingHeadline({ phrases, className }: { phrases: string[]; className?: string }) {
  const { reducedMotion, ready } = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  // start by holding the first phrase, so it is readable before it is deleted
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const phrase = phrases[index];
    let delay = deleting ? 28 : 55;
    if (!deleting && length === phrase.length) delay = 2200; // hold the full phrase
    if (deleting && length === 0) delay = 350;
    const t = setTimeout(() => {
      if (!deleting && length === phrase.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else setLength((n) => n + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [ready, reducedMotion, index, length, deleting, phrases]);

  const still = !ready || reducedMotion;
  const text = still ? phrases[0] : phrases[index].slice(0, length);

  return (
    <p className={className}>
      <span className="sr-only">{phrases.join(". ")}.</span>
      <span aria-hidden>
        {text}
        <span
          className={still ? "hidden" : "ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-caret bg-accent2"}
        />
        {/* keeps the line's height steady while it's empty */}
        {text.length === 0 && "​"}
      </span>
    </p>
  );
}
