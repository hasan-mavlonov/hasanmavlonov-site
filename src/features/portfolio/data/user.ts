import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Hasan",
  lastName: "Mavlonov",
  displayName: "Hasan Mavlonov",
  username: "hasan-mavlonov",
  bio: "CTO and co-founder building persistent personality and identity infrastructure for AI agents.",
  flipSentences: [
    "CTO and co-founder, MindForm AI.",
    "Trying to integrate personality into AI.",
    "CTO at Defex, self-teaching assembly robots.",
    "B.Sc. in Artificial Intelligence at ECUST.",
  ],
  address: "Shanghai, China",
  emailB64: "aGFzYW5AbWluZGZvcm0tYWkuY29t", // base64 encoded
  website: "https://hasanmavlonov.com",
  jobTitle: "CTO & Co-founder, MindForm AI",
  jobs: [
    {
      title: "CTO & Co-founder",
      company: "MindForm AI",
      experienceId: "mindform-ai",
    },
    {
      title: "CTO",
      company: "Defex",
      experienceId: "defex",
    },
    {
      title: "B.Sc. Artificial Intelligence",
      company: "ECUST",
      experienceId: "ecust",
    },
  ],
  about: `I'm Hasan. I'm CTO and co-founder of [MindForm AI](https://mindform-ai.com), where we integrate personality into AI, and CTO at [Defex](https://defex.app), building self-teaching assembly robots.
`,
  avatar: "/monogram.svg",
  photo: "/hasan-mavlonov.jpg",
  ogImage:
    "/og/simple?title=Hasan%20Mavlonov&description=CTO%20%26%20Co-founder%2C%20MindForm%20AI",
  keywords: [
    "hasan mavlonov",
    "hasanmavlonov",
    "hasan-mavlonov",
    "mavlonov",
    "mindform ai",
    "stablemind",
    "defex",
    "cto",
    "founder",
    "ai agents",
    "ecust",
    "shanghai",
  ],
  timeZone: "Asia/Shanghai",
  dateCreated: "2026-09-13", // YYYY-MM-DD
}
