import type { TimelineMilestone } from "../types/timeline"

/**
 * Drives the Age column. Leave `null` to render the timeline by year only.
 */
export const TIMELINE_BIRTH_YEAR: number | null = null

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2024,
    content: `Interdisciplinary STEAM coursework at the University of Wisconsin-Madison.

Built a Yandex Eats style backend on Django, FastAPI and PostgreSQL as an open source replica.

Ranked 8th of 4,000 participants in the RUCODE programming contest.

Scored 1490 on the SAT (Math 790, English 700).`,
  },
  {
    year: 2025,
    content: `Started a B.Sc. in Artificial Intelligence at East China University of Science and Technology, in Shanghai, and became class leader for the AI major.

Built Tracky, a real-time RFID inventory and POS backend, cutting label printing hardware cost by roughly 97%.

Joined Elev8 in Shanghai as an AI engineer intern, working on Stable Diffusion XL training pipelines.

Completed Machine Learning and Neural Networks at the University of Cambridge, building an EfficientNetB0 classifier for breast cancer histopathology images.

Won a 50,000 RUB Yandex Cloud award for a research proposal, and passed Yandex's backend internship algorithm interviews.

Mentored 250+ developers at Google DevFest '25 and Build With AI '25 in Shanghai.`,
  },
  {
    year: 2026,
    content: `Started building the AI problem-generation pipeline at EduX, a government education platform serving 60,000+ registered students.

Published StableMind, a preprint on a two-timescale architecture for persistent personality in LLM agents, endorsed for arXiv submission.

Recognized in the 2026 Shanghai University Computer Application Competition for an AI-powered ancient engineering simulation system.

Reached the semifinals of the Google Gemma 4 Competition.

Presented an AI-powered student profile platform to Ren Youqun, Vice Minister of the Ministry of Education of China.`,
  },
]
