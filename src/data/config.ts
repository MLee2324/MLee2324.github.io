const config = {
  title: "Matthew Lee | Computer Engineering",
  description: {
    long: "Portfolio of Matthew Lee, a Computer Engineering student at the University of Utah exploring AI-powered assistive technology for blind and low-vision people.",
    short:
      "Computer Engineering student exploring AI-powered assistive technology with computer vision, multimodal learning, and human-robot interaction.",
  },
  keywords: [
    "Matthew Lee",
    "portfolio",
    "computer engineering",
    "University of Utah",
    "assistive technology",
    "accessibility",
    "blind and low-vision",
    "computer vision",
    "multimodal learning",
    "human-robot interaction",
    "machine learning",
    "Salt Lake City",
  ],
  author: "Matthew Lee",
  headline: "Computer Engineering Student",
  // Lines the hero's typing headline cycles through (the first one shows when
  // motion is reduced).
  typing: [
    "Computer Engineering Student · University of Utah",
    "Undergraduate Researcher at SparkLab",
    "Co-leading EgoBranch, a wearable vision-language assistant",
    "Building assistive AI for blind and low-vision people",
  ],
  // Status pills under the hero headline.
  badges: [
    { emoji: "🎓", text: "Graduating Dec 2026" },
    { emoji: "🔬", text: "SparkLab · University of Utah" },
    { emoji: "📍", text: "Salt Lake City · Open to relocation" },
  ],
  tagline:
    "Exploring AI-powered assistive technology for blind and low-vision people, using computer vision, multimodal learning, and human-robot interaction.",
  email: "matthewlee453@gmail.com",
  location: "Salt Lake City, UT · Open to relocation",
  site: "https://mlee2324.github.io",

  // Hero photo in /public, e.g. "/assets/me.jpg". null shows the "ML" initials card.
  photo: "/assets/me.jpg" as string | null,

  // PDFs in /public. Set one to null to hide its buttons and links.
  resume: "/Matthew_Lee_Resume.pdf" as string | null,
  cv: "/Matthew_Lee_CV.pdf" as string | null,

  // Social preview image in /public (1200x630 works well). null = none.
  ogImage: null as string | null,

  // for github stars button
  githubUsername: "MLee2324",
  githubRepo: "MLee2324.github.io",

  get ogImg() {
    return this.ogImage ? this.site + this.ogImage : null;
  },
  // Leave a link empty ("") to hide its button.
  social: {
    github: "https://github.com/MLee2324",
    linkedin: "https://www.linkedin.com/in/matthew-lee-9a8724293/",
    twitter: "",
    instagram: "",
  },
};
export { config };
