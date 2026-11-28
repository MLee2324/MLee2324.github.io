// Skills shown in the Tech Stack grid, in display order.
export enum SkillNames {
  PYTHON = "python",
  CPP = "cplusplus",
  C = "c",
  VERILOG = "verilog",
  MATLAB = "matlab",
  PYTORCH = "pytorch",
  SKLEARN = "scikitlearn",
  OPENCV = "opencv",
  MEDIAPIPE = "mediapipe",
  ROS2 = "ros2",
  LINUX = "linux",
  GIT = "git",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "Evaluation tooling, ML models, and vision pipelines",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.CPP]: {
    id: 2,
    name: "cplusplus",
    label: "C++",
    shortDescription: "Performance-critical and systems code",
    color: "#00599c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.C]: {
    id: 3,
    name: "c",
    label: "C",
    shortDescription: "Firmware for STM32 microcontrollers",
    color: "#a8b9cc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  [SkillNames.VERILOG]: {
    id: 4,
    name: "verilog",
    label: "Verilog",
    shortDescription: "RTL design and testbenches, including a 16-bit CPU",
    color: "#e8a33d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/verilog/verilog-original.svg",
  },
  [SkillNames.MATLAB]: {
    id: 5,
    name: "matlab",
    label: "MATLAB",
    shortDescription: "Numerical computing and signal processing",
    color: "#e16737",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
  },
  [SkillNames.PYTORCH]: {
    id: 6,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "Training and evaluating deep learning models",
    color: "#ee4c2c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  [SkillNames.SKLEARN]: {
    id: 7,
    name: "scikitlearn",
    label: "scikit-learn",
    shortDescription: "Classical ML, like the posture classifier",
    color: "#f7931e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  },
  [SkillNames.OPENCV]: {
    id: 8,
    name: "opencv",
    label: "OpenCV",
    shortDescription: "Image processing and real-time video",
    color: "#5c3ee8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  },
  [SkillNames.MEDIAPIPE]: {
    id: 9,
    name: "mediapipe",
    label: "MediaPipe",
    shortDescription: "Body landmarks for pose estimation",
    color: "#0097a7",
    icon: "https://cdn.simpleicons.org/mediapipe",
  },
  [SkillNames.ROS2]: {
    id: 10,
    name: "ros2",
    label: "ROS 2",
    shortDescription: "Robot pipelines for camera, gaze, and speech",
    color: "#22314e",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg",
  },
  [SkillNames.LINUX]: {
    id: 11,
    name: "linux",
    label: "Linux",
    shortDescription: "My default development environment",
    color: "#fcc624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.GIT]: {
    id: 12,
    name: "git",
    label: "Git",
    shortDescription: "Version control for every project",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
};

export type Experience = {
  id: number;
  // multiple periods = returning stint, avoids a duplicate card
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  /** Plain bullets, or groups of bullets under a project subheading. */
  description: (string | { heading: string; points: string[] })[];
  skills: SkillNames[];
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
    skills: [SkillNames.ROS2, SkillNames.PYTHON],
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
    skills: [SkillNames.PYTHON],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
