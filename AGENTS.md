# AI agent guidelines for hasanmavlonov.com

Next.js 16 (App Router) personal portfolio and blog. Forked from the MIT-licensed
chanhdai.com, with its shadcn registry, testimonials, sponsors and bookmarks
removed.

**Stack**: TypeScript, React 19, Tailwind CSS v4, shadcn/ui, MDX, Vitest, npm, Render

## Project structure

| Directory                              | Purpose                                     |
| -------------------------------------- | ------------------------------------------- |
| `src/app/`                             | App Router pages, layouts, API routes       |
| `src/components/`                      | Shared UI components                        |
| `src/features/`                        | Feature modules: `doc`, `blog`, `portfolio` |
| `src/config/`                          | Site (`site.ts`) and JSON-LD config         |
| `src/hooks/`, `src/lib/`, `src/utils/` | Hooks, libraries, utilities                 |

**Key files**: `components.json` (shadcn config), `src/features/portfolio/data/`
(portfolio data), `.env.example` (env vars), `render.yaml` (deploy)

## Portfolio content

Every section of the home page reads from `src/features/portfolio/data/`, so
editing the site's content means editing those files, not the components:
`user.ts`, `social-links.ts`, `tech-stack.tsx`, `experiences.tsx`,
`education.ts`, `projects.tsx`, `awards.tsx`, `certifications.ts`,
`intellectual-property.ts`, `timeline.ts`.

## Content system

Blog posts live in `src/features/doc/content/blog/` as MDX files. The category
is derived from the immediate subfolder name rather than declared in
frontmatter, so a file's location is what makes it a blog post.

- **Data layer**: `src/features/doc/data/documents.ts` (`getAllDocs`, `getDocBySlug`, `getDocsByCategory`)
- **Blog UI**: `src/features/blog/` (rendering only, imports data from `features/doc`)

The home page blog panel and `/blog` both handle the empty case, so the site
works with no posts at all.

## Coding guidelines

- TypeScript strict mode; explicit types when necessary
- kebab-case file naming
- Descriptive names; comments only for "why", not "what"
- No emojis in code, comments, or commit messages
- Tailwind CSS v4 syntax; support dark/light modes
- Follow SOLID principles
- Headings in sentence-case (capitalize only the first word and proper nouns), applies to Markdown/MDX docs and prose

## Commands

npm is the only supported package manager: there is no pnpm lockfile, and
`.npmrc` sets `legacy-peer-deps` because fumadocs-core declares an optional
peer on zod 4 while this app pins zod 3 for its own schemas.

```bash
npm install        # Install dependencies
npm run dev        # Dev server
npm run build      # Production build
npm start          # Serve the production build (honours PORT)
npm test           # Vitest (watch)
npm run test:run   # Vitest (single run)
npm run lint       # ESLint
npm run lint:fix   # ESLint with --fix
npm run format:write  # Prettier
npm run check-types   # Type checking (tsc --noEmit)
```

`npm run check-types` needs the `PageProps` global that `next build` generates
into `.next/types/`, so run a build first on a fresh checkout.

Known failure: `npm run lint` reports React-compiler errors in
`src/components/charts/**` (refs read during render, setState in an effect).
These came in with the upstream import and are not yet fixed.

## Deployment

Render web service, described by `render.yaml` (`npm ci --include=dev &&
npm run build`, then `npm start`). Dev dependencies are required at build time,
so do not set `NODE_ENV=production` for the build step.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
