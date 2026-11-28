// Fetches public GitHub data for the "GitHub activity" section and writes it
// to src/data/github.json. Meant to run in the deploy workflow before
// `next build`, with the workflow's GITHUB_TOKEN. If anything fails it writes
// an empty file and the section hides itself, so a GitHub hiccup never breaks
// a deploy.
import { writeFileSync } from "node:fs";

const LOGIN = process.env.GITHUB_LOGIN || "MLee2324";
const TOKEN = process.env.GITHUB_TOKEN;
const OUT = new URL("../src/data/github.json", import.meta.url);
const EMPTY = { generatedAt: null };
const SITE_REPO = `${LOGIN}.github.io`.toLowerCase();

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC,
                 orderBy: { field: PUSHED_AT, direction: DESC }) {
      totalCount
      nodes {
        name description url stargazerCount pushedAt
        primaryLanguage { name color }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name color } }
        }
      }
    }
  }
}`;

async function main() {
  if (!TOKEN) {
    console.log("fetch-github: no GITHUB_TOKEN, writing empty data");
    return EMPTY;
  }
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL responded ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  const user = json.data.user;

  const days = user.contributionsCollection.contributionCalendar.weeks.flatMap((w) =>
    w.contributionDays.map((d) => [d.date, d.contributionCount])
  );

  // Language bytes summed across repos, leaving out this website's own repo
  // so web tooling doesn't drown out the research languages.
  const own = user.repositories.nodes.filter((r) => r.name.toLowerCase() !== SITE_REPO);
  const langs = {};
  for (const r of own) {
    for (const e of r.languages.edges) {
      langs[e.node.name] ??= { name: e.node.name, color: e.node.color, bytes: 0 };
      langs[e.node.name].bytes += e.size;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    login: LOGIN,
    totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
    days,
    publicRepos: user.repositories.totalCount,
    stars: user.repositories.nodes.reduce((n, r) => n + r.stargazerCount, 0),
    languages: Object.values(langs).sort((a, b) => b.bytes - a.bytes),
    repos: own.slice(0, 4).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.url,
      stars: r.stargazerCount,
      pushedAt: r.pushedAt,
      language: r.primaryLanguage,
    })),
  };
}

let data;
try {
  data = await main();
  if (data.generatedAt) {
    console.log(
      `fetch-github: ${data.totalContributions} contributions, ${data.publicRepos} repos, ${data.languages.length} languages`
    );
  }
} catch (err) {
  console.error("fetch-github: failed, writing empty data:", err.message);
  data = EMPTY;
}
writeFileSync(OUT, JSON.stringify(data, null, 1) + "\n");
