import { GoogleIcon } from "@/components/icons"

import type { Award } from "../types/awards"

export const AWARDS: Award[] = [
  {
    id: "rucode-contest",
    prize: "8th of 4,000",
    title: "RUCODE programming contest",
    date: "2024",
  },
  {
    id: "yandex-cloud-research-proposal",
    prize: "50,000 RUB",
    title: "Yandex Cloud research proposal award",
    date: "2025",
  },
  {
    id: "google-gemma-4-competition",
    prize: "Semifinalist",
    title: "Google Gemma 4 Competition",
    date: "2026",
    icon: <GoogleIcon />,
  },
]
