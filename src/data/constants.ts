// Skills, grouped as on the CV. `icon` is a logo in /public/assets/skills;
// skills without an official logo use a generic icon ("cpu" or "database").
export type Skill = { name: string; icon: string };

export const SKILL_GROUPS: { label: string; items: Skill[] }[] = [
  {
    label: "Advanced",
    items: [
      { name: "Python", icon: "/assets/skills/python.svg" },
      { name: "C++", icon: "/assets/skills/cplusplus.svg" },
      { name: "C#", icon: "/assets/skills/csharp.svg" },
      { name: "MATLAB", icon: "/assets/skills/matlab.svg" },
      { name: "Verilog", icon: "/assets/skills/verilog.svg" },
      { name: "x86 Assembly", icon: "cpu" },
      { name: "PyTorch", icon: "/assets/skills/pytorch.svg" },
      { name: "scikit-learn", icon: "/assets/skills/scikitlearn.svg" },
    ],
  },
  {
    label: "Basic",
    items: [
      { name: "C", icon: "/assets/skills/c.svg" },
      { name: "Java", icon: "/assets/skills/java.svg" },
      { name: "MIPS Assembly", icon: "cpu" },
    ],
  },
  {
    label: "Research tools",
    items: [
      { name: "ROS 2", icon: "/assets/skills/ros.svg" },
      { name: "OpenCV", icon: "/assets/skills/opencv.svg" },
      { name: "MediaPipe", icon: "/assets/skills/mediapipe.svg" },
      { name: "Git", icon: "/assets/skills/git.svg" },
      { name: "Linux", icon: "/assets/skills/linux.svg" },
    ],
  },
  {
    label: "Web and data",
    items: [
      { name: "HTML/CSS", icon: "/assets/skills/html5.svg" },
      { name: "SQL", icon: "database" },
    ],
  },
];

export type Experience = {
  id: number;
  // multiple periods = returning stint, avoids a duplicate card
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  /** Plain bullets, or groups of bullets under a project subheading. */
  description: (string | { heading: string; points: string[] })[];
};

// The Experience section is hidden while this list is empty.
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "Sep 2026", end: "Present" }],
    title: "Undergraduate Student Researcher",
    company: "SparkLab, University of Utah · Advisor: Prof. Kenneth Marino",
    description: [
      {
        heading: "EgoBranch: Wearable Vision-Language Assistance (Co-Lead)",
        points: [
          "Developing a wearable AI assistant using Meta Aria glasses and vision-language models with the EgoBranch team at the University of Utah and National University of Singapore, led by Prof. Kenneth Marino (Utah) and Prof. Weiyu Liu (NUS).",
          "Tested a ROS 2 pipeline connecting egocentric camera input, gaze signals, and text-to-speech; completed two successful multi-step pen-sorting trials.",
          "Measured average planning round-trip times of 2.54 s and 2.78 s in the two successful trials.",
          "Exploring how video, gaze, speech, and human corrections could provide learning signals for multimodal agents.",
          "Developing a board-game evaluation to study when a wearable assistant should guide, ask questions, or pause as people learn an unfamiliar game, and whether its help supports later independent play.",
        ],
      },
      {
        heading: "Robot Vibe-Coding: Hello Robot Stretch 4",
        points: [
          "Contributing with the Utah team to a multi-university project within the NSF Center for Human and Robot Co-Adaptation: users describe robot tasks, an AI agent generates and tests code, and user feedback guides revisions toward executable robot policies.",
        ],
      },
    ],
  },
  {
    id: 2,
    periods: [{ start: "Jan 2026", end: "Sep 2026" }],
    title: "Undergraduate Research Assistant",
    company: "NLP Lab, University of Utah · Advisor: Prof. Ana Marasović",
    description: [
      "Contributed to LLM-agent benchmarking by creating and validating gold-standard document and spreadsheet tasks.",
      "Developed Python evaluators that check text accuracy, image location and matching, document layout, and spreadsheet cell content and formatting.",
      "Created and validated gold-standard task evaluations, including checks for a wedding color-palette spreadsheet.",
    ],
  },
];
