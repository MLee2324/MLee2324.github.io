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
| `src/data/projects.tsx` | Projects, screenshots, tech stacks |
| `public/assets/me.jpg` | Hero photo (initials show until it exists) |
| `public/` | Résumé/CV PDFs; set `resume` / `cv` in `config.ts` to show them |

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./out` to GitHub Pages. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

Optional repository variables (**Settings → Secrets and variables → Actions → Variables**):

- `NEXT_PUBLIC_FORM_ENDPOINT`: a form service URL (for example Formspree) for the contact form. Without it, the form opens the visitor's email client.
- `NEXT_PUBLIC_GA_ID`: Google Analytics measurement ID.

## Differences from the template

GitHub Pages has no server, so:

- The contact form no longer uses Resend; see `NEXT_PUBLIC_FORM_ENDPOINT` above.
- The GitHub stars count in the header is fetched at build time.
- The custom HTTP headers were removed (Pages doesn't support them).
- Live cursors, chat, and the multiplayer game stay off unless `NEXT_PUBLIC_WS_URL` points at a realtime server you run.
