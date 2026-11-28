// Skills shown in the Skills grid, in display order. `icon` is a logo in
// /public/assets/skills; `color` tints the tile's glow on hover.
export type Skill = {
  name: string;
  icon: string;
  description: string;
  color: string;
  /** Invert the logo in dark mode (for dark logos like ROS). */
  invertInDark?: boolean;
};

export const SKILLS: Skill[] = [
  { name: "Python", icon: "/assets/skills/python.svg", description: "Evaluation tooling, ML models, and vision pipelines", color: "#3776ab" },
  { name: "C++", icon: "/assets/skills/cplusplus.svg", description: "Performance-critical and systems code", color: "#00599c" },
  { name: "C", icon: "/assets/skills/c.svg", description: "Firmware for STM32 microcontrollers", color: "#a8b9cc" },
  { name: "Verilog", icon: "/assets/skills/verilog.svg", description: "RTL design and testbenches, including a 16-bit CPU", color: "#e8a33d" },
  { name: "MATLAB", icon: "/assets/skills/matlab.svg", description: "Numerical computing and signal processing", color: "#e16737" },
  { name: "PyTorch", icon: "/assets/skills/pytorch.svg", description: "Training and evaluating deep learning models", color: "#ee4c2c" },
  { name: "scikit-learn", icon: "/assets/skills/scikitlearn.svg", description: "Classical ML, like the posture classifier", color: "#f7931e" },
  { name: "OpenCV", icon: "/assets/skills/opencv.svg", description: "Image processing and real-time video", color: "#5c3ee8" },
  { name: "MediaPipe", icon: "/assets/skills/mediapipe.svg", description: "Body landmarks for pose estimation", color: "#0097a7" },
  { name: "ROS 2", icon: "/assets/skills/ros.svg", description: "Robot pipelines for camera, gaze, and speech", color: "#22314e", invertInDark: true },
  { name: "Linux", icon: "/assets/skills/linux.png", description: "My default development environment", color: "#fcc624" },
  { name: "Git", icon: "/assets/skills/git.svg", description: "Version control for every project", color: "#f1502f" },
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
    periods: [{ start: "Jan 2026", end: "Jun 2026" }],
    title: "Undergraduate Research Assistant",
    company: "NLP Lab, University of Utah · Research Advisors: Prof. Ana Marasović and Prof. Kenneth Marino",
    description: [
      "Contributed to LLM-agent benchmarking by creating and validating gold-standard document and spreadsheet tasks.",
      "Developed Python evaluators that check text accuracy, image location and matching, document layout, and spreadsheet cell content and formatting.",
      "Created and validated gold-standard task evaluations, including checks for a wedding color-palette spreadsheet.",
    ],
  },
];
