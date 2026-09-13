import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Hasan",
  lastName: "Mavlonov",
  displayName: "Hasan Mavlonov",
  username: "hasan-mavlonov",
  bio: "CTO and co-founder building persistent personality and identity infrastructure for AI agents.",
  flipSentences: [
    "CTO and co-founder, MindForm AI.",
    "I build persistent identity for AI agents.",
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
  about: `- I'm Hasan, CTO and co-founder of [MindForm AI](#experience-mindform-ai). We build StableMind: a persistence layer that gives an AI agent a measurable Big Five personality that survives across sessions, models and restarts.
- I'm also CTO at [Defex](https://defex.app), where self-teaching robots attempt an assembly, physically test the joint and learn from the result. Backed by NVIDIA Inception, Google for Startups and Z Fellows.
- Author of the [StableMind preprint](https://doi.org/10.5281/zenodo.20593641), endorsed for arXiv submission, with a live demo on [Hugging Face](https://huggingface.co/spaces/hasanmavlonov/stablemind).
- Studying Artificial Intelligence at East China University of Science and Technology in Shanghai.
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
