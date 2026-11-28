// "Code mode" bio card: the About facts written as a small Python class, in
// the style of GitHub profile READMEs. Colors use the site's tokens so it
// works in light and dark mode. It's real text, so screen readers read it.

type Tok = [string, "kw" | "cls" | "str" | "num" | "cmt" | "fn" | "plain"];

const C: Record<Tok[1], string> = {
  kw: "text-fuchsia-600 dark:text-fuchsia-400",
  cls: "text-amber-600 dark:text-amber-300",
  str: "text-emerald-700 dark:text-emerald-400",
  num: "text-sky-700 dark:text-sky-300",
  cmt: "text-muted-foreground italic",
  fn: "text-blue-600 dark:text-blue-300",
  plain: "text-foreground/90",
};

const s = (v: string): Tok => ["\"" + v + "\"", "str"];
const p = (v: string): Tok => [v, "plain"];

const LINES: Tok[][] = [
  [["class ", "kw"], ["MatthewLee", "cls"], p(":")],
  [p("    role       = "), s("Undergraduate Researcher @ SparkLab")],
  [p("    school     = "), s("University of Utah")],
  [p("    degree     = "), s("B.S. Computer Engineering")],
  [p("    graduating = "), s("Dec 2026")],
  [p("    gpa        = {"), s("major"), p(": "), ["3.49", "num"], p(", "), s("cumulative"), p(": "), ["3.43", "num"], p("}")],
  [p("    honors     = ["), s("Dean's List"), p("] "), ["# Sp25, Fa25, Sp26", "cmt"]],
  [p("    based_in   = "), s("Salt Lake City"), p("  "), ["# open to relocation", "cmt"]],
  [p("    languages  = ["), s("English"), p(", "), s("Korean"), p("]")],
  [p("")],
  [p("    "), ["def ", "kw"], ["research", "fn"], p("(self):")],
  [p("        "), ["return ", "kw"], p("["), s("computer vision"), p(",")],
  [p("                "), s("multimodal learning"), p(",")],
  [p("                "), s("human-robot interaction"), p("]")],
];

export default function CodeCard() {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-secondary/30">
      <figcaption className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-1 font-mono text-xs text-muted-foreground">matthew_lee.py</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6" data-lenis-prevent>
        <code>
          {LINES.map((line, i) => (
            <span key={i} className="block">
              <span aria-hidden className="mr-4 inline-block w-4 select-none text-right text-muted-foreground/50">
                {i + 1}
              </span>
              {line.map(([text, kind], j) => (
                <span key={j} className={C[kind]}>
                  {text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
