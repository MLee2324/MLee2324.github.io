// The "Research" section: the three areas from the CV's research interests,
// each with a short description and links to related work on the page.

export type ResearchArea = {
  id: string;
  title: string;
  body: string;
  work: { label: string; href: string }[];
};

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "vision",
    title: "Computer vision",
    body: "Understanding a person's surroundings from camera input, including egocentric video from wearable glasses.",
    work: [
      { label: "EgoBranch", href: "#experience" },
      { label: "Posture Checker", href: "#projects" },
    ],
  },
  {
    id: "multimodal",
    title: "Multimodal learning",
    body: "Combining video, gaze, and speech, and using human corrections as learning signals for multimodal agents.",
    work: [
      { label: "EgoBranch", href: "#experience" },
      { label: "LLM-agent benchmarks", href: "#experience" },
      { label: "ASR capstone", href: "#projects" },
    ],
  },
  {
    id: "hri",
    title: "Human-robot interaction",
    body: "Studying when an assistant should guide, ask, or pause, and turning user feedback into executable robot behavior.",
    work: [
      { label: "Board-game study", href: "#experience" },
      { label: "Robot Vibe-Coding", href: "#experience" },
    ],
  },
];
