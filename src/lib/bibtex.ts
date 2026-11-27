import type { Publication } from "@/data/publications";
import { config } from "@/data/config";

const ENTRY_TYPE: Record<Publication["type"], string> = {
  Journal: "article",
  Conference: "inproceedings",
  Workshop: "inproceedings",
  Preprint: "misc",
  Poster: "misc",
  Talk: "misc",
};

const escape = (v: string) => v.replace(/[{}]/g, "");

// Builds a BibTeX entry from a publication's own fields. Nothing is invented:
// fields that aren't in the data are left out.
export function toBibtex(pub: Publication): string {
  if (pub.bibtex) return pub.bibtex.trim();

  const authors = pub.authors?.length ? pub.authors : [config.author];
  const year = pub.date.match(/\d{4}/)?.[0];
  const lastName = authors[0].split(" ").slice(-1)[0].toLowerCase();
  const firstWord = pub.title.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `${lastName}${year ?? ""}${firstWord}`;
  const type = ENTRY_TYPE[pub.type];

  const venueField =
    type === "article" ? "journal" : type === "inproceedings" ? "booktitle" : "howpublished";

  const fields: [string, string | undefined][] = [
    ["title", pub.title],
    ["author", authors.join(" and ")],
    [venueField, pub.venue],
    ["year", year],
    ["doi", pub.links?.doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")],
    ["url", pub.links?.paper ?? pub.links?.pdf],
    ["note", type === "misc" ? pub.type : undefined],
  ];

  const body = fields
    .filter((f): f is [string, string] => Boolean(f[1]))
    .map(([k, v]) => `  ${k} = {${escape(v)}}`)
    .join(",\n");

  return `@${type}{${key},\n${body}\n}`;
}
