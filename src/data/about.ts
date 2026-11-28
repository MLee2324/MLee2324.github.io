// Content for the About section (src/components/sections/about.tsx).

export const ABOUT = {
  introLabel: "Research interests",
  // From the Research Interests section of the CV.
  intro:
    "I am interested in exploring how AI-powered assistive technologies can improve accessibility and independence for people with disabilities, particularly blind and low-vision (BLV) individuals. I hope to apply computer vision, multimodal learning, and human-robot interaction to develop systems that help people better navigate their surroundings and perform everyday tasks with greater ease and confidence.",
  facts: [
    { label: "Degree", value: "Computer Engineering" },
    { label: "Graduation", value: "December 2026" },
    { label: "Interests", value: "Assistive AI, computer vision, multimodal learning" },
    { label: "Location", value: "Salt Lake City, UT · Open to relocation" },
  ],
  highlights: [
    { label: "Major GPA", value: "3.49 / 4.0", sub: "3.43 cumulative · Dean's List (Spring 2025, Fall 2025, Spring 2026)" },
    { label: "Senior Capstone", value: "Evaluating ASR Systems", sub: "Automatic speech recognition" },
    { label: "Focus Areas", value: "Assistive AI", sub: "For blind and low-vision people" },
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
