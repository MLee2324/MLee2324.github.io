// Short dated updates for the "Latest" section, newest first.
// `kind` picks the icon. `link` is optional: "#projects" scrolls to a section,
// a full URL opens in a new tab.

export type NewsKind = "research" | "milestone" | "project" | "talk";

export type NewsItem = {
  date: string; // e.g. "Sep 2026"
  kind: NewsKind;
  text: string;
  link?: { label: string; href: string };
};

export const NEWS: NewsItem[] = [
  {
    date: "Dec 2026",
    kind: "milestone",
    text: "Graduating with a B.S. in Computer Engineering from the University of Utah.",
  },
  {
    date: "Sep 2026",
    kind: "research",
    text: "Joined SparkLab (Prof. Kenneth Marino) to co-lead EgoBranch, a wearable vision-language assistant built on Meta Aria glasses with a Utah and NUS team, and to contribute to Robot Vibe-Coding on the Hello Robot Stretch 4.",
    link: { label: "Experience", href: "#experience" },
  },
  {
    date: "Aug 2026",
    kind: "project",
    text: "Finished Posture Checker, a real-time webcam posture monitor whose Random Forest classifier reached 97.5% accuracy.",
    link: { label: "Code", href: "https://github.com/MLee2324/posturechecker" },
  },
  {
    date: "Jan 2026",
    kind: "research",
    text: "Joined the Utah NLP Lab (Prof. Ana Marasović) to build gold-standard tasks and evaluators for LLM-agent benchmarks.",
    link: { label: "Experience", href: "#experience" },
  },
];

// How many items show before "Show all".
export const NEWS_PREVIEW_COUNT = 4;
