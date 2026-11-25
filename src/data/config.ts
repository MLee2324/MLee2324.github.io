const config = {
  title: "Matthew Lee | Computer Engineering",
  description: {
    long: "Portfolio of Matthew Lee, a Computer Engineering student focused on embedded systems, computer vision, and deep learning. Graduating December 2026 and open to relocation.",
    short:
      "Computer Engineering student focused on embedded systems, computer vision, and deep learning.",
  },
  keywords: [
    "Matthew Lee",
    "portfolio",
    "computer engineering",
    "embedded systems",
    "computer vision",
    "deep learning",
    "machine learning",
    "robotics",
    "Salt Lake City",
  ],
  author: "Matthew Lee",
  headline: "Computer Engineering Student",
  tagline:
    "Embedded systems, computer vision, and deep learning. I care about reliable engineering and work that can be tested beyond a demo.",
  email: "matthewlee453@gmail.com",
  location: "Salt Lake City, UT · Open to relocation",
  site: "https://mlee2324.github.io",

  // Hero photo in /public. Falls back to initials until the file exists.
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
    linkedin: "",
    twitter: "",
    instagram: "",
  },
};
export { config };
