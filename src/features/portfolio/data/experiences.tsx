import { BotIcon, BrainCircuitIcon, CodeXmlIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "mindform-ai",
    companyName: "MindForm AI",
    location: "Shanghai, China",
    positions: [
      {
        id: "mindform-ai-cto",
        title: "CTO & Co-founder",
        employmentPeriod: {
          start: "01.2026",
        },
        icon: <BrainCircuitIcon />,
        description: `We integrate personality into AI. Backed by NVIDIA Inception.`,
        skills: ["AI agents", "Personality modelling", "Infrastructure"],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "defex",
    companyName: "Defex",
    companyWebsite: "https://defex.app",
    location: "San Francisco, USA",
    locationType: "Remote",
    positions: [
      {
        id: "defex-cto",
        title: "CTO",
        employmentPeriod: {
          start: "03.2026",
        },
        icon: <BotIcon />,
        description: `Self-teaching assembly robots for manufacturing. Backed by Google for Startups and Z Fellows.`,
        skills: ["Robotics", "Reinforcement learning", "Manufacturing"],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "elev8",
    companyName: "Elev8",
    location: "Shanghai, China",
    positions: [
      {
        id: "elev8-ai-engineer-intern",
        title: "AI Engineer",
        employmentPeriod: {
          start: "10.2025",
          end: "01.2026",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description: `Built the training and image-generation pipeline for Stable Diffusion XL models.`,
        skills: ["Stable Diffusion XL", "Generative AI"],
      },
    ],
  },
]
