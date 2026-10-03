/**
 * Post-processes the static export in `out/` for hosts that only serve files.
 *
 * - Drops the placeholder pages `withPlaceholderSlug` generates when there are
 *   no posts, since `output: "export"` rejects an empty route.
 * - Writes the URLs that next.config.ts used to rewrite as real files, so they
 *   work without host rewrite rules and get a Content-Type from their extension.
 */
import { existsSync } from "node:fs"
import { cp, readdir, rm } from "node:fs/promises"
import { join } from "node:path"

const OUT_DIR = "out"
// Keep in sync with src/features/doc/lib/static-params.ts
const PLACEHOLDER_SLUG = "__no-posts__"

const out = (...segments) => join(OUT_DIR, ...segments)

if (!existsSync(out("index.html"))) {
  throw new Error(`${OUT_DIR}/ is missing; run "next build" first`)
}

await rm(out("blog", PLACEHOLDER_SLUG), { recursive: true, force: true })
await rm(out("doc.md", PLACEHOLDER_SLUG), { force: true })

const docSlugs = existsSync(out("doc.md")) ? await readdir(out("doc.md")) : []

if (docSlugs.length === 0) {
  await rm(out("doc.md"), { recursive: true, force: true })
}

// /blog/:slug.md used to be rewritten to /doc.md/:slug.
for (const slug of docSlugs) {
  await cp(out("doc.md", slug), out("blog", `${slug}.md`))
}

// /index.md used to be rewritten to /llms.txt, and /rss to /blog/rss.
await cp(out("llms.txt"), out("index.md"))
await cp(out("blog", "rss"), out("rss"))

console.log(
  `Finalized static export: ${docSlugs.length} markdown post(s) in ${OUT_DIR}/blog/`
)
