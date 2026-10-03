/**
 * Slug generated when there are no posts yet. `output: "export"` rejects a
 * dynamic route whose `generateStaticParams` is empty, which is the normal
 * state of a fresh blog, so the route gets this one slug instead. It matches
 * no document, so the route resolves to a 404, and the build script deletes
 * whatever was exported for it.
 */
export const PLACEHOLDER_SLUG = "__no-posts__"

export function withPlaceholderSlug(params: { slug: string }[]) {
  return params.length > 0 ? params : [{ slug: PLACEHOLDER_SLUG }]
}
