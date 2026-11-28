import { Star } from "lucide-react";
import { SiGithub } from "react-icons/si";
import raw from "@/data/github.json";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

// Data written at deploy time by scripts/fetch-github.mjs. When it's empty
// (no token, or GitHub was unreachable) the whole section is skipped.
type Lang = { name: string; color: string | null; bytes: number };
type Repo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  pushedAt: string;
  language: { name: string; color: string | null } | null;
};
type GitHubData = {
  generatedAt: string | null;
  login?: string;
  totalContributions?: number;
  days?: [string, number][];
  publicRepos?: number;
  stars?: number;
  languages?: Lang[];
  repos?: Repo[];
};

const data = raw as GitHubData;

const CELL = 11;
const GAP = 3;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fmtDay = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const fmtMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// Current streak counts back from the last day (or the day before, so a
// quiet "today" doesn't reset it); longest is the best run in the year.
function streaks(days: [string, number][]) {
  let longest = 0;
  let run = 0;
  for (const [, n] of days) {
    run = n > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  let i = days.length - 1;
  if (i >= 0 && days[i][1] === 0) i--;
  let current = 0;
  while (i >= 0 && days[i][1] > 0) {
    current++;
    i--;
  }
  return { current, longest };
}

// Five shades, like GitHub's, scaled to this person's own busiest days.
function levelOf(n: number, max: number) {
  if (n === 0) return 0;
  const r = n / max;
  return r > 0.75 ? 4 : r > 0.5 ? 3 : r > 0.25 ? 2 : 1;
}
const LEVEL_CLASS = [
  "fill-secondary",
  "fill-accent2/30",
  "fill-accent2/55",
  "fill-accent2/80",
  "fill-accent2",
];

function Heatmap({ days }: { days: [string, number][] }) {
  // Pad the front so the first column starts on a Sunday, like GitHub.
  const firstDow = new Date(days[0][0] + "T00:00:00Z").getUTCDay();
  const cells: ([string, number] | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);
  const max = Math.max(1, ...days.map((d) => d[1]));
  const width = weeks * (CELL + GAP);
  const height = 7 * (CELL + GAP) + 16;

  // a month label above the first week that starts in that month
  const labels: { x: number; text: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    const day = cells.slice(w * 7, w * 7 + 7).find(Boolean);
    if (!day) continue;
    const m = new Date(day[0] + "T00:00:00Z").getUTCMonth();
    if (m !== lastMonth) {
      if (labels.length === 0 || w * (CELL + GAP) - labels[labels.length - 1].x > 28) {
        labels.push({ x: w * (CELL + GAP), text: MONTHS[m] });
      }
      lastMonth = m;
    }
  }

  return (
    // dir="rtl" makes a narrow screen open scrolled to the newest weeks (the
    // SVG itself still draws left to right)
    <div dir="rtl" className="overflow-x-auto pb-1">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Contribution calendar: ${days.reduce((n, d) => n + d[1], 0)} contributions in the last year`}
        className="block"
      >
        {labels.map((l) => (
          <text key={l.x} x={l.x} y={10} className="fill-muted-foreground text-[10px]">
            {l.text}
          </text>
        ))}
        {cells.map((c, i) => {
          if (!c) return null;
          const w = Math.floor(i / 7);
          const d = i % 7;
          return (
            <rect
              key={c[0]}
              x={w * (CELL + GAP)}
              y={16 + d * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx={2.5}
              className={`${LEVEL_CLASS[levelOf(c[1], max)]} gh-cell`}
              style={{ animationDelay: `${w * 12}ms` }}
            >
              <title>{`${c[1]} contribution${c[1] === 1 ? "" : "s"} on ${fmtDay(c[0])}`}</title>
            </rect>
          );
        })}
      </svg>
    </div>
  );
}

const Stat = ({ value, label }: { value: string | number; label: string }) => (
  <div className="rounded-xl border border-border bg-secondary/20 px-4 py-3">
    <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">{value}</p>
    <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
  </div>
);

function Languages({ langs }: { langs: Lang[] }) {
  const total = langs.reduce((n, l) => n + l.bytes, 0);
  if (!total) return null;
  const top = langs.slice(0, 6);
  const other = total - top.reduce((n, l) => n + l.bytes, 0);
  const parts = [...top, ...(other > 0 ? [{ name: "Other", color: null, bytes: other }] : [])];
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-foreground">Most used languages</h3>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-secondary">
        {parts.map((l) => (
          <span
            key={l.name}
            title={`${l.name} ${((l.bytes / total) * 100).toFixed(1)}%`}
            style={{ width: `${(l.bytes / total) * 100}%`, background: l.color ?? "hsl(var(--muted-foreground))" }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {parts.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5 text-muted-foreground">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: l.color ?? "hsl(var(--muted-foreground))" }}
            />
            <span className="text-foreground">{l.name}</span>
            {((l.bytes / total) * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

const GitHubActivitySection = () => {
  if (!data.generatedAt || !data.days?.length) return null;
  const { current, longest } = streaks(data.days);
  const profile = `https://github.com/${data.login}`;

  return (
    <SectionWrapper id="github" className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeader id="github" title="GitHub activity" desc={`Updated ${fmtDay(data.generatedAt.slice(0, 10))}`} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={data.totalContributions ?? 0} label="contributions in the last year" />
        <Stat value={`${current} day${current === 1 ? "" : "s"}`} label="current streak" />
        <Stat value={`${longest} day${longest === 1 ? "" : "s"}`} label="longest streak" />
        <Stat value={data.publicRepos ?? 0} label="public repositories" />
      </div>

      <div className="mt-6 rounded-xl border border-border p-4">
        <Heatmap days={data.days} />
        <div className="mt-2 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
          Less
          {LEVEL_CLASS.map((c) => (
            <svg key={c} width={CELL} height={CELL} aria-hidden>
              <rect width={CELL} height={CELL} rx={2.5} className={c} />
            </svg>
          ))}
          More
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[2fr_3fr]">
        {data.languages && <Languages langs={data.languages} />}
        {data.repos && data.repos.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Recently active repositories</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {data.repos.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col rounded-xl border border-border p-3.5 transition-colors hover:border-accent2/60 hover:bg-secondary/30"
                  >
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <SiGithub className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      <span className="truncate">{r.name}</span>
                    </span>
                    {r.description && (
                      <span className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</span>
                    )}
                    <span className="mt-auto flex items-center gap-3 pt-2.5 text-xs text-muted-foreground">
                      {r.language && (
                        <span className="flex items-center gap-1">
                          <span
                            aria-hidden
                            className="h-2 w-2 rounded-full"
                            style={{ background: r.language.color ?? "hsl(var(--muted-foreground))" }}
                          />
                          {r.language.name}
                        </span>
                      )}
                      {r.stars > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3" aria-hidden />
                          {r.stars}
                        </span>
                      )}
                      <span>Updated {fmtMonth(r.pushedAt)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm text-accent2 underline-offset-4 hover:underline"
      >
        See everything on GitHub
      </a>
    </SectionWrapper>
  );
};

export default GitHubActivitySection;
