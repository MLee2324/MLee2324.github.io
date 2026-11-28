"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { useReducedMotion } from "@/lib/motion-pref";
import { cn } from "@/lib/utils";

// "Listen to this page": reads every element marked data-speak, in page
// order, with the browser's built-in speech synthesis. The block being read
// gets the .speaking highlight and scrolls into view. Hidden in browsers
// without speech synthesis.

type State = "idle" | "playing" | "paused";

const button =
  "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70";

export default function ListenButton() {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState({ at: 0, of: 0 });
  const { reducedMotion } = useReducedMotion();
  const run = useRef(0); // bumps on stop so stale callbacks do nothing
  const current = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const highlight = (el: HTMLElement | null) => {
    current.current?.classList.remove("speaking");
    current.current = el;
    if (el) {
      el.classList.add("speaking");
      el.scrollIntoView({ block: "center", behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  const stop = () => {
    run.current++;
    window.speechSynthesis.cancel();
    highlight(null);
    setState("idle");
    setProgress({ at: 0, of: 0 });
  };

  const start = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++run.current;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-speak]")).filter(
      (el) => el.offsetParent !== null && (el.dataset.speak || el.innerText).trim()
    );
    // prefer a natural-sounding English voice when the browser offers one
    const voices = synth.getVoices();
    const voice =
      voices.find((v) => /en[-_]US/i.test(v.lang) && /natural|neural|google|samantha|aria|jenny/i.test(v.name)) ??
      voices.find((v) => /^en/i.test(v.lang));

    const speak = (i: number) => {
      if (run.current !== id) return;
      if (i >= blocks.length) return stop();
      const el = blocks[i];
      highlight(el);
      setProgress({ at: i + 1, of: blocks.length });
      const u = new SpeechSynthesisUtterance((el.dataset.speak || el.innerText).replace(/\s+/g, " "));
      if (voice) u.voice = voice;
      u.rate = 1;
      u.onend = () => speak(i + 1);
      u.onerror = (e) => {
        // "interrupted"/"canceled" come from our own stop/cancel; anything
        // else (no voice available, etc.) stops rather than racing ahead
        if (e.error !== "interrupted" && e.error !== "canceled") stop();
      };
      synth.speak(u);
    };

    setState("playing");
    speak(0);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setState("paused");
  };
  const resume = () => {
    window.speechSynthesis.resume();
    setState("playing");
  };

  if (!supported) return null;

  if (state === "idle") {
    return (
      <button type="button" onClick={start} className={button} title="Read this page aloud">
        <Volume2 className="h-4 w-4" aria-hidden />
        Listen
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-accent2/60 bg-accent2/10 p-0.5" role="group" aria-label="Read-aloud controls">
      <button
        type="button"
        onClick={state === "playing" ? pause : resume}
        className={cn(button, "h-8 border-transparent px-2.5")}
        aria-label={state === "playing" ? "Pause reading" : "Resume reading"}
      >
        {state === "playing" ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
        <span className="tabular-nums text-xs text-muted-foreground" aria-live="polite">
          {progress.at}/{progress.of}
        </span>
      </button>
      <button type="button" onClick={stop} className={cn(button, "h-8 w-8 justify-center border-transparent px-0")} aria-label="Stop reading">
        <Square className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
