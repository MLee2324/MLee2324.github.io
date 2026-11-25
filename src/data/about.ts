// Content for the About section (src/components/sections/about.tsx).

export const ABOUT = {
  intro:
    "I'm a Computer Engineering student focused on embedded systems, computer vision, and deep learning. I care about reliable engineering and work that can be tested beyond a demo.",
  facts: [
    { label: "Degree", value: "Computer Engineering" },
    { label: "Graduation", value: "December 2026" },
    { label: "Interests", value: "Embedded, CV, ML" },
    { label: "Location", value: "Salt Lake City, UT · Open to relocation" },
  ],
  highlights: [
    { label: "Engineering GPA", value: "3.494 / 4.0", sub: "Dean's List" },
    { label: "Senior Capstone", value: "Evaluating ASR Systems", sub: "Automatic speech recognition" },
    { label: "Focus Areas", value: "AI + Embedded", sub: "Hardware-aware systems" },
  ],
  courses: [
    {
      title: "Computer Vision",
      caption: "Images, geometry & deep learning",
      detail:
        "Image processing, feature extraction, camera pose, stereo matching, 3D reconstruction, object detection, segmentation, and video activity classification.",
    },
    {
      title: "Intro to Robotics & AI",
      caption: "Sensing, control & intelligent systems",
      detail:
        "Building robotic systems from sensors, actuators, circuits, microcontrollers, signal processing, PID control, sensor fusion, and machine learning models.",
    },
  ],
};
