import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  github: {
    title: "GitHub",
    handle: "hasan-mavlonov",
    href: "https://github.com/hasan-mavlonov",
    sameAs: true,
  },
  x: {
    title: "X",
    handle: "@HasanMavlonovX",
    href: "https://x.com/HasanMavlonovX",
    sameAs: true,
  },
  huggingface: {
    title: "Hugging Face",
    handle: "hasanmavlonov",
    href: "https://huggingface.co/spaces/hasanmavlonov/stablemind",
    sameAs: true,
  },
  leetcode: {
    title: "LeetCode",
    handle: "hasanmavlonov",
    href: "https://leetcode.com/u/hasanmavlonov",
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
