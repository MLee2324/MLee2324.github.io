// Short dated updates for the "Latest" section, newest first.
// `link` is optional: "#projects" scrolls to a section,
// a full URL opens in a new tab.

export type NewsItem = {
  date: string; // e.g. "Sep 2026"
  text: string;
  link?: { label: string; href: string };
};

export const NEWS: NewsItem[] = [
  {
    date: "Dec 2026",
    text: "Graduating with a B.S. in Computer Engineering from the University of Utah.",
  },
  {
    date: "Sep 2026",
    text: "Joined SparkLab (Prof. Kenneth Marino) to co-lead EgoBranch, a wearable vision-language assistant built on Meta Aria glasses with a Utah and NUS team, and to contribute to Robot Vibe-Coding on the Hello Robot Stretch 4.",
    link: { label: "Experience", href: "#experience" },
  },
  {
    date: "Apr 2026",
    text: "Completed my senior capstone, ASR Accent Bias Evaluation: Amazon, Google, and Microsoft speech recognition all made more errors on Indian and Nigerian English than on American English.",
    link: { label: "Poster", href: "/posters/asr-accent-bias/" },
  },
  {
    date: "Jan 2026",
    text: "Joined the Utah NLP Lab (Profs. Ana Marasović and Kenneth Marino) to build gold-standard tasks and evaluators for LLM-agent benchmarks.",
    link: { label: "Experience", href: "#experience" },
  },
];

// How many items show before "Show all".
export const NEWS_PREVIEW_COUNT = 4;
