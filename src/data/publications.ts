// Papers, posters, and talks for the Publications section, newest first.
// Example of a paper entry:
// {
//   id: "aria-guidance-2027",
//   type: "Conference",
//   title: "Paper title",
//   authors: ["First Author", "Matthew Lee", "Kenneth Marino"],
//   venue: "Conference name (ACRONYM)",
//   date: "2027",
//   links: { paper: "https://arxiv.org/abs/...", code: "https://github.com/MLee2324/..." },
// },

export type PublicationType =
  | "Journal"
  | "Conference"
  | "Workshop"
  | "Preprint"
  | "Poster"
  | "Talk";

export type Publication = {
  id: string;
  type: PublicationType;
  title: string;
  /** Your name is highlighted automatically. Omit for solo work. */
  authors?: string[];
  venue: string;
  date: string;
  /** One-line summary shown under the title. */
  summary?: string;
  /** Full abstract, shown behind an "Abstract" toggle. */
  abstract?: string;
  /** Your own BibTeX entry. If omitted, one is built from the fields above. */
  bibtex?: string;
  /** Mark a few entries to get a "Selected" badge. */
  selected?: boolean;
  links?: {
    paper?: string;
    pdf?: string;
    doi?: string;
    code?: string;
    poster?: string;
    slides?: string;
  };
};

// Empty for now: the section shows a placeholder until the first entry.
// (The ASR capstone is listed under Projects, not here.)
export const PUBLICATIONS: Publication[] = [];
