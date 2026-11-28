// The "Research" section: three themes that build on each other, from
// perceiving the world to understanding it to helping a person act in it.
// `work` links each theme to items elsewhere on the page.

export type ResearchTheme = {
  id: string;
  step: string; // short verb shown on the flow line
  title: string;
  question: string;
  body: string;
  work: { label: string; href: string }[];
};

export const RESEARCH_THEMES: ResearchTheme[] = [
  {
    id: "perceive",
    step: "Perceive",
    title: "Computer Vision",
    question: "What is around the person right now?",
    body: "Turning camera input, including egocentric video from wearables, into a reliable picture of objects, people, and posture.",
    work: [
      { label: "Posture Checker", href: "#projects" },
      { label: "EgoBranch (Meta Aria)", href: "#experience" },
    ],
  },
  {
    id: "understand",
    step: "Understand",
    title: "Multimodal Learning",
    question: "What does the person want to do?",
    body: "Combining video, gaze, and speech so a model can follow a task, and learning from human corrections to get better over time.",
    work: [
      { label: "EgoBranch board-game study", href: "#experience" },
      { label: "ASR accent bias", href: "#projects" },
      { label: "LLM-agent benchmarks", href: "#experience" },
    ],
  },
  {
    id: "assist",
    step: "Assist",
    title: "Human-Robot Interaction",
    question: "How should the system help?",
    body: "Giving clear, timely guidance, by voice or through a robot, that helps blind and low-vision people act with independence and confidence.",
    work: [
      { label: "Robot Vibe-Coding (Stretch 4)", href: "#experience" },
      { label: "Pen-sorting trials", href: "#experience" },
    ],
  },
];
