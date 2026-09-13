import { GoogleIcon } from "@/components/icons"

import type { Award } from "../types/awards"

export const AWARDS: Award[] = [
  {
    id: "rucode-contest",
    prize: "8th of 4,000",
    title: "RUCODE programming contest",
    date: "2024",
    grade: "Competitive programming",
    description: "- Completed and ranked 8th out of 4,000 participants.",
  },
  {
    id: "yandex-cloud-research-proposal",
    prize: "50,000 RUB",
    title: "Yandex Cloud research proposal award",
    date: "2025",
    grade: "Research",
    description: "- Awarded by Yandex Cloud for a research proposal.",
  },
  {
    id: "google-devfest-mentoring",
    prize: "250+ developers",
    title: "Google DevFest '25 and Build With AI '25 Shanghai",
    date: "2025",
    grade: "Mentoring",
    icon: <GoogleIcon />,
    description:
      "- Mentored 250+ developers on building AI applications with Gemini models and Google Cloud, at Shanghai World Financial Center.",
  },
  {
    id: "shanghai-computer-application-competition",
    prize: "Recognized",
    title: "2026 Shanghai University Computer Application Competition",
    date: "2026",
    grade: "University",
    description:
      "- Recognized for an AI-powered ancient engineering simulation system integrating intelligent modelling and interactive simulation.",
  },
  {
    id: "google-gemma-4-competition",
    prize: "Semifinalist",
    title: "Google Gemma 4 Competition",
    date: "2026",
    grade: "Google Developer Groups",
    icon: <GoogleIcon />,
    description:
      "- Recognized for developing AI solutions with Gemma models and advancing to the semifinal stage.",
  },
]
