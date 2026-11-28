"use client";

import { useEffect, type RefObject } from "react";

// Scroll-in reveal for `.reveal` elements inside `ref`. The cards are visible
// in the HTML by default, so they still show without scripts, when printed,
// and to crawlers. They start hidden only while <html data-reveal> is set (by
// the inline script in the layout, before first paint), and this hook marks
// each one `data-shown` as it scrolls into view. See globals.css.
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    (window as Window & { __revealReady?: boolean }).__revealReady = true;
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    const show = (el: Element) => el.setAttribute("data-shown", "");
    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}
