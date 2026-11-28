export type ProjectArea = "AI & Vision" | "Hardware";

export type Project = {
  id: string;
  title: string;
  /** Short label shown as a chip, e.g. "Senior capstone". */
  category: string;
  date: string;
  highlights: string[];
  tech: string[];
  github?: string;
  live?: string;
  /** Used by the filter chips above the grid. */
  area: ProjectArea;
  /** Optional image in /public, e.g. "/assets/projects/<id>.jpg". Without
   * one, the card gets a generated cover in this hue (0-360). */
  image?: string;
  hue: number;
};

const projects: Project[] = [
  {
    id: "posture-checker",
    area: "AI & Vision",
    hue: 190,
    title: "Posture Checker",
    category: "Computer vision · ML",
    date: "Jun – Aug 2026",
    highlights: [
      "Built a real-time posture monitor that classifies sitting posture from webcam video and body landmarks.",
      "Extracted neck angle, spine angle, forward head offset, and shoulder tilt; collected and labeled 2,785+ posture samples.",
      "Trained a Random Forest classifier that reached 97.5% accuracy separating good and bad sitting posture.",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "scikit-learn"],
    github: "https://github.com/MLee2324/posturechecker",
  },
  {
    id: "asr-accent-bias",
    area: "AI & Vision",
    hue: 265,
    title: "ASR Accent Bias Evaluation",
    category: "Senior capstone",
    date: "May 2025 – Apr 2026",
    highlights: [
      "Compared automatic speech recognition accuracy on African American English and White Mainstream English speech.",
      "Used word error rate plus substitution, deletion, and insertion analysis to investigate dialect-related differences.",
    ],
    tech: ["Python", "NLP", "Speech recognition"],
  },
  {
    id: "smart-blinds",
    area: "Hardware",
    hue: 35,
    title: "STM32 Smart Blinds System",
    category: "Embedded systems",
    date: "Spring 2026",
    highlights: [
      "Built an automated blinds prototype integrating motor control, light sensing, limit switches, and a real-time clock.",
      "Implemented manual and automatic control modes and displayed system status on an LCD.",
    ],
    tech: ["STM32F072", "C", "I2C", "PWM"],
    github: "https://github.com/uofu-emb-26/5780_MiniProj_SmartBlinds",
  },
  {
    id: "16-bit-cpu",
    area: "Hardware",
    hue: 150,
    title: "16-bit CPU",
    category: "Digital design",
    date: "Aug – Dec 2025",
    highlights: [
      "Built a custom 16-bit RISC CPU: datapath, ALU, control unit, and memory interface.",
      "Integrated block RAM for instructions and data, and verified the design with Verilog simulation and testbenches.",
    ],
    tech: ["Verilog", "Digital design"],
  },
];

export default projects;
