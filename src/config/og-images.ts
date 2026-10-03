/**
 * Open Graph images are rendered once at build time, one PNG per entry, so the
 * static export can serve them without an image server. Pages read their title
 * and description from here too, which keeps the card and the page in step.
 */
export const PAGE_OG_IMAGES = {
  home: {
    title: "Hasan Mavlonov",
    description: "CTO & Co-founder, MindForm AI",
  },
  blog: {
    title: "Blog",
    description: "Stories, milestones, and things I learn along the way.",
  },
  timeline: {
    title: "Timeline",
    description: "A life in milestones.",
  },
  insights: {
    title: "Insights",
    description:
      "The code is public, and so are the numbers. Visitors, sessions, and views, compared with the previous period.",
  },
} as const satisfies Record<string, { title: string; description: string }>

export type PageOgImageId = keyof typeof PAGE_OG_IMAGES

const BLOG_POST_PREFIX = "blog-"

export function getOgImageUrl(id: string) {
  return `/og/${id}.png`
}

export function getBlogPostOgImageId(slug: string) {
  return `${BLOG_POST_PREFIX}${slug}`
}
