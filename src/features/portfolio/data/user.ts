import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Hasan",
  lastName: "Mavlonov",
  displayName: "Hasan Mavlonov",
  username: "hasan-mavlonov",
  bio: "AI and backend engineer. Shipping LLM pipelines that verify their own output.",
  flipSentences: [
    "AI and backend engineer.",
    "B.Sc. in Artificial Intelligence at ECUST.",
    "I build training pipelines that check their own work.",
    "Django, FastAPI, PyTorch.",
  ],
  address: "Shanghai, China",
  emailB64: "aGFzYW5AbWluZGZvcm0tYWkuY29t", // base64 encoded
  website: "https://hasanmavlonov.com",
  jobTitle: "AI/Backend Engineer",
  jobs: [
    {
      title: "AI/ML Engineer",
      company: "EduX",
      experienceId: "edux",
    },
    {
      title: "B.Sc. Artificial Intelligence",
      company: "ECUST",
      experienceId: "ecust",
    },
  ],
  about: `- I'm Hasan — an AI and backend engineer studying Artificial Intelligence at East China University of Science and Technology, in Shanghai.
- I build the unglamorous half of machine learning: generation pipelines that verify their own output, evaluation harnesses written before there is a checkpoint to evaluate, and the gates that stop unverified data from reaching a training run.
- Currently building the AI problem-generation pipeline at [EduX](#experience-edux), a government education platform serving 60,000+ registered students in Uzbek and Russian.
- Author of [StableMind](https://doi.org/10.5281/zenodo.20593641), a preprint on a two-timescale architecture for persistent personality in LLM agents.
- Before the AI work I shipped backends: Django REST Framework, FastAPI, PostgreSQL, and one RFID inventory system that cut label printing hardware cost by ~97%.
`,
  avatar: "/monogram.svg",
  ogImage:
    "/og/simple?title=Hasan%20Mavlonov&description=AI%2FBackend%20Engineer",
  keywords: [
    "hasan mavlonov",
    "hasanmavlonov",
    "hasan-mavlonov",
    "mavlonov",
    "ai engineer",
    "backend engineer",
    "machine learning engineer",
    "ecust",
    "shanghai",
  ],
  timeZone: "Asia/Shanghai",
  dateCreated: "2026-09-13", // YYYY-MM-DD
}
