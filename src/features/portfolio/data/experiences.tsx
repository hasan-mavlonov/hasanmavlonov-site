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
        description: `Building StableMind: identity and persistence infrastructure for AI agents, built on the OCEAN (Big Five) personality traits. An agent's traits are measured, anchored and restored across sessions, so it stays the same entity instead of resetting to the base model. Five-person team.`,
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
        description: `Self-teaching assembly robots for manufacturing. A robot attempts a connector assembly, physically tests the joint, and learns from the result. Backed by NVIDIA Inception, Google for Startups and Z Fellows.`,
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
        description: `Built the training and image-generation pipeline for Stable Diffusion XL models, and an AI influencer content pipeline on the OpenAI, Gemini and Instagram APIs.`,
        skills: ["Stable Diffusion XL", "Generative AI"],
      },
    ],
  },
  {
    id: "tracky",
    companyName: "Tracky",
    location: "Tashkent, Uzbekistan",
    positions: [
      {
        id: "tracky-backend-developer",
        title: "Backend Developer",
        employmentPeriod: {
          start: "05.2025",
          end: "09.2025",
        },
        icon: <CodeXmlIcon />,
        description: `Built a real-time RFID inventory and point-of-sale backend, and cut label printing hardware cost by about 97% by mapping barcodes to RFID codes at print time.`,
        skills: ["Django", "PostgreSQL", "RFID"],
      },
    ],
  },
]
