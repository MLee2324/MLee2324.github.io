// Skills shown on the 3D keyboard, in key order (6 per row).
// Keycap logos live in public/assets/keyboard/logos (white SVGs from simpleicons.org).
export enum SkillNames {
  PYTHON = "python",
  C = "c",
  CPP = "cplusplus",
  PYTORCH = "pytorch",
  OPENCV = "opencv",
  NUMPY = "numpy",
  JUPYTER = "jupyter",
  ARDUINO = "arduino",
  RASPBERRY_PI = "raspberrypi",
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
  /** Optional local artwork for the 3D key; falls back to icon. */
  keyboardIcon?: string;
  /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
  keyboardColor?: string;
  /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
  shortcut?: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "the glue for my CV and ML experiments",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    keyboardIcon: "/assets/keyboard/logos/python.svg",
    keyboardColor: "#3776ab",
  },
  [SkillNames.C]: {
    id: 2,
    name: "c",
    label: "C",
    shortDescription: "close to the metal for microcontroller firmware",
    color: "#a8b9cc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    keyboardIcon: "/assets/keyboard/logos/c.svg",
    keyboardColor: "#5c6bc0",
  },
  [SkillNames.CPP]: {
    id: 3,
    name: "cplusplus",
    label: "C++",
    shortDescription: "performance-critical code and embedded systems",
    color: "#00599c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    keyboardIcon: "/assets/keyboard/logos/cplusplus.svg",
    keyboardColor: "#00599c",
  },
  [SkillNames.PYTORCH]: {
    id: 4,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "training and evaluating deep learning models",
    color: "#ee4c2c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    keyboardIcon: "/assets/keyboard/logos/pytorch.svg",
    keyboardColor: "#ee4c2c",
  },
  [SkillNames.OPENCV]: {
    id: 5,
    name: "opencv",
    label: "OpenCV",
    shortDescription: "image processing, features, and camera geometry",
    color: "#5c3ee8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    keyboardIcon: "/assets/keyboard/logos/opencv.svg",
    keyboardColor: "#5c3ee8",
  },
  [SkillNames.NUMPY]: {
    id: 6,
    name: "numpy",
    label: "NumPy",
    shortDescription: "arrays, linear algebra, and signal processing",
    color: "#4dabcf",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    keyboardIcon: "/assets/keyboard/logos/numpy.svg",
    keyboardColor: "#013243",
  },
  [SkillNames.JUPYTER]: {
    id: 7,
    name: "jupyter",
    label: "Jupyter",
    shortDescription: "where experiments get explored and plotted",
    color: "#f37626",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
    keyboardIcon: "/assets/keyboard/logos/jupyter.svg",
    keyboardColor: "#f37626",
  },
  [SkillNames.ARDUINO]: {
    id: 8,
    name: "arduino",
    label: "Arduino",
    shortDescription: "sensors, actuators, and quick hardware prototypes",
    color: "#00878f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    keyboardIcon: "/assets/keyboard/logos/arduino.svg",
    keyboardColor: "#00878f",
  },
  [SkillNames.RASPBERRY_PI]: {
    id: 9,
    name: "raspberrypi",
    label: "Raspberry Pi",
    shortDescription: "embedded Linux for robotics and vision on the edge",
    color: "#a22846",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
    keyboardIcon: "/assets/keyboard/logos/raspberrypi.svg",
    keyboardColor: "#a22846",
  },
  [SkillNames.LINUX]: {
    id: 10,
    name: "linux",
    label: "Linux",
    shortDescription: "my default environment for development",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    keyboardIcon: "/assets/keyboard/logos/linux.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.GIT]: {
    id: 11,
    name: "git",
    label: "Git",
    shortDescription: "version control for every project",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
};

export type Experience = {
  id: number;
  // multiple periods = returning stint, avoids a duplicate card
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

// Add jobs, internships, research, or TA roles here. The Experience section
// is hidden while this list is empty. Example:
// {
//   id: 1,
//   periods: [{ start: "May 2025", end: "Aug 2025" }],
//   title: "Embedded Systems Intern",
//   company: "Company · City, ST",
//   description: ["What you built or improved, with a number if you have one."],
//   skills: [SkillNames.C, SkillNames.PYTHON],
// },
export const EXPERIENCE: Experience[] = [];

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
