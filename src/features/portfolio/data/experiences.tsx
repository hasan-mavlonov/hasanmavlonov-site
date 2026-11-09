import { BotIcon, BrainCircuitIcon, CodeXmlIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "defex",
    companyName: "Defex Robotics",
    companyWebsite: "https://defexrobotics.com",
    // hasanmavlonov@defexrobotics.com
    emailB64: "aGFzYW5tYXZsb25vdkBkZWZleHJvYm90aWNzLmNvbQ==",
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
        description: `Self-teaching assembly robots for manufacturing: a robot attempts an assembly, physically tests the joint and learns from the result.`,
        skills: ["Robotics", "Reinforcement learning", "Manufacturing"],
        isExpanded: true,
      },
    ],
    backers: [
      {
        name: "Y Combinator",
        src: "/backers/y-combinator.svg",
        width: 24,
        height: 24,
        caption: "Y Combinator \u00b7 W27",
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "mindform-ai",
    companyName: "MindForm AI",
    // hasan@mindform-ai.com
    emailB64: "aGFzYW5AbWluZGZvcm0tYWkuY29t",
    positions: [
      {
        id: "mindform-ai-cto",
        title: "CTO & Co-founder",
        employmentPeriod: {
          start: "01.2026",
        },
        icon: <BrainCircuitIcon />,
        description: `Building StableMind, the persistence layer that gives an agent a measurable Big Five identity it keeps across sessions, models and restarts. Working with CNRS in France on a benchmark for whether that identity actually holds.`,
        skills: ["AI agents", "Personality modelling", "Infrastructure"],
        isExpanded: true,
      },
    ],
    backers: [
      {
        name: "NVIDIA Inception Program member",
        src: "/backers/nvidia-inception.svg",
        width: 500,
        height: 216,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "elev8",
    companyName: "Elev8",
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
