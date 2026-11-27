# MLee2324.github.io

My portfolio site, live at https://mlee2324.github.io.

Built from [Naresh Khatri's 3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio) template (MIT), adapted to run as a static site on GitHub Pages. The 3D keyboard and loading screen from the template were removed; the hero shows a photo instead.

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
| `src/data/config.ts` | Name, headline, SEO text, email, social links, hero photo, résumé/CV paths |
| `src/data/about.ts` | About section: intro, facts, highlights, current courses |
| `src/data/constants.ts` | Tech Stack skills and work experience (hidden while empty) |
| `src/data/news.ts` | Dated updates for the "Latest" timeline |
| `src/data/research.ts` | The three research themes and the work linked to each |
| `src/data/projects.tsx` | Projects, filter area, cover hue, optional screenshots, tech stacks |
| `src/data/publications.ts` | Papers, posters, and talks. Optional abstract, BibTeX (generated if omitted), and "Selected" flag |
| `config.photo` | Hero photo path, or `null` to show the initials card |
| `public/` | Résumé/CV PDFs; set `resume` / `cv` in `config.ts` to show them |

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./out` to GitHub Pages. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

Optional repository variables (**Settings → Secrets and variables → Actions → Variables**):

- `NEXT_PUBLIC_GA_ID`: Google Analytics measurement ID.

## Differences from the template

GitHub Pages has no server, so:

- The contact section and form were removed; visitors reach me by email.
- The template's deployment-tracking beacon was removed, and the footer credits the template instead.
- Umami analytics only loads when both `UMAMI_DOMAIN` (your own Umami script URL) and `UMAMI_SITE_ID` are set.
- The GitHub stars count in the header is fetched at build time.
- The custom HTTP headers were removed (Pages doesn't support them).
- Live cursors, chat, and the multiplayer game stay off unless `NEXT_PUBLIC_WS_URL` points at a realtime server you run.
