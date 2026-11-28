"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/toaster";
import { useReducedMotion } from "@/lib/motion-pref";

// Applies the motion setting to CSS (via data-motion on <html>, see
// globals.css) and to Motion animations.
function MotionSetting({ children }: { children: React.ReactNode }) {
  const { reducedMotion, ready } = useReducedMotion();
  useEffect(() => {
    if (ready) document.documentElement.dataset.motion = reducedMotion ? "off" : "on";
  }, [ready, reducedMotion]);
  return <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>{children}</MotionConfig>;
}

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
    <MotionSetting>{children}</MotionSetting>
    <Toaster />
  </ThemeProvider>
);
