"use client";

import { useState } from "react";
import Link from "next/link";
import { NEWS, NEWS_PREVIEW_COUNT } from "@/data/news";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const NewsSection = () => {
  const [showAll, setShowAll] = useState(false);
  if (NEWS.length === 0) return null;
  const items = showAll ? NEWS : NEWS.slice(0, NEWS_PREVIEW_COUNT);

  return (
    <SectionWrapper id="news" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeader id="news" title="News" />
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const external = item.link?.href.startsWith("http");
          return (
            <li
              key={item.date + item.text}
              className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-6"
              data-speak={`${item.date}. ${item.text}`}
            >
              <time className="text-sm font-medium tabular-nums text-muted-foreground">{item.date}</time>
              <p className="leading-relaxed text-foreground/90">
                {item.text}
                {item.link && (
                  <>
                    {" "}
                    <Link
                      href={item.link.href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="whitespace-nowrap text-accent2 underline-offset-4 hover:underline"
                    >
                      {item.link.label}
                    </Link>
                  </>
                )}
              </p>
            </li>
          );
        })}
      </ul>
      {NEWS.length > NEWS_PREVIEW_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {showAll ? "Show less" : `Show all (${NEWS.length})`}
        </button>
      )}
    </SectionWrapper>
  );
};

export default NewsSection;
