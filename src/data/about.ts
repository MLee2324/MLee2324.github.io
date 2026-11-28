// Content for the About section (src/components/sections/about.tsx).

export const ABOUT = {
  // From the Research Interests section of the CV.
  intro:
    "I am interested in exploring how AI-powered assistive technologies can improve accessibility and independence for people with disabilities, particularly blind and low-vision (BLV) individuals. I hope to apply computer vision, multimodal learning, and human-computer interaction to develop systems that help people better navigate their surroundings and perform everyday tasks with greater ease and confidence.",
  // "Right now" list, in the style of GitHub profile READMEs.
  now: [
    { emoji: "🔭", label: "Working on", text: "EgoBranch: step-by-step guidance from Meta Aria glasses and vision-language models (co-lead)" },
    { emoji: "🤖", label: "Also on", text: "Robot Vibe-Coding: turning user feedback into Hello Robot Stretch 4 policies" },
    { emoji: "🌱", label: "Learning", text: "Computer vision, and robotics with PID control and sensor fusion" },
    { emoji: "🌏", label: "Speaks", text: "English and Korean" },
  ],
  courses: [
    {
      title: "Computer Vision",
      detail:
        "Image processing, feature extraction, camera pose, stereo matching, 3D reconstruction, object detection, segmentation, and video activity classification.",
    },
    {
      title: "Intro to Robotics & AI",
      detail:
        "Building robotic systems from sensors, actuators, circuits, microcontrollers, signal processing, PID control, sensor fusion, and machine learning models.",
    },
  ],
};
