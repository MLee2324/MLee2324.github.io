# MLee2324.github.io

My personal academic site, live at https://mlee2324.github.io.

Built with Next.js, Tailwind CSS, and shadcn/ui components, exported as a static site for GitHub Pages.

## Develop

Requires Node 20.9+ and pnpm (`corepack enable pnpm`).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in ./out
```

## Edit content

| File | What it holds |
|---|---|
| `src/data/config.ts` | Name, typing-headline lines, status badges, SEO text, email, social links, photo, résumé/CV paths |
| `src/data/about.ts` | About section: intro, "Right now" list, current coursework (the code card is `src/components/code-card.tsx`) |
| `src/data/news.ts` | Dated updates for the News section |
| `src/data/research.ts` | The three research areas and the work linked to each |
| `src/data/constants.ts` | Research experience and the Skills grid (logo, description, color) |
| `src/data/projects.tsx` | Projects, tech, optional screenshot, code link, poster PDF |
| `src/data/publications.ts` | Papers and talks. Optional abstract, BibTeX (generated if omitted), and "Selected" flag |
| `src/data/github.json` | GitHub activity data, written at deploy time by `scripts/fetch-github.mjs` (the section hides while it's empty) |
| `public/` | Résumé, CV, and poster PDFs |

The headshot is `public/assets/me.jpg` (`config.photo`; set it to `null` to show initials instead). Skill logos live in `public/assets/skills/`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./out` to GitHub Pages. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

Optional repository variable (**Settings → Secrets and variables → Actions → Variables**):

- `NEXT_PUBLIC_GA_ID`: Google Analytics measurement ID.

## License

© 2026 Matthew Lee. All rights reserved.
