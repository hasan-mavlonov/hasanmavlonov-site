# Development

This guide provides instructions on how to set up and run the project locally.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (the version in `.nvmrc`)
- [Git](https://git-scm.com/)

npm is the only supported package manager here. `.npmrc` sets
`legacy-peer-deps`, because fumadocs-core declares an optional peer on zod 4
while this app pins zod 3 for its own schemas.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/hasan-mavlonov/hasanmavlonov-site.git
cd hasanmavlonov-site
```

### 2. Install portless (optional)

Serves the dev server over HTTPS at a `.localhost` domain, which keeps absolute
URLs looking like production. Documentation: [port1355.dev](https://port1355.dev)

```bash
npm install -g portless
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then update the necessary environment variables inside `.env.local`. Every one
of them is optional: without them the site runs, and the features that need
credentials (analytics, the insights page, GitHub stars, blog feedback) fall
back to an empty state.

### 5. Run the development server

```bash
npm run dev
```

The application is available at http://localhost:3000, or at
https://hasanmavlonov.localhost with portless running (see `allowedDevOrigins`
in `next.config.ts`).

## Building for production

```bash
npm run build
npm start
```

`npm start` honours the `PORT` environment variable, which is how Render runs
it.

## Before pushing

CI runs these on every pull request. Run them locally first:

```bash
npm run lint
npm run format:check
npm run build
npm run check-types
```

Run `npm run build` before `npm run check-types` on a fresh checkout: the
typecheck depends on the `PageProps` global that `next build` generates into
`.next/types/`.

Known failure: `npm run lint` reports React-compiler errors in
`src/components/charts/**` (refs read during render, setState in an effect).
They arrived with the upstream import and are not yet fixed.

## Content

Portfolio sections read from `src/features/portfolio/data/`. Blog posts are MDX
files in `src/features/doc/content/blog/`.

## Deployment

Render web service, described by `render.yaml`:

- Build: `npm ci --include=dev && npm run build`
- Start: `npm start`
- `NEXT_PUBLIC_APP_URL` must be set at build time, since it is inlined into the
  client bundle and used for canonical URLs, the sitemap and Open Graph images

Dev dependencies are needed to build, so do not set `NODE_ENV=production` on
the build step.
