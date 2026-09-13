import { BriefcaseBusinessIcon, CodeXmlIcon, GitBranchIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "edux",
    companyName: "EduX",
    location: "Tashkent, Uzbekistan",
    locationType: "Remote",
    positions: [
      {
        id: "edux-ai-ml-engineer",
        title: "AI/ML Engineer",
        employmentPeriod: {
          start: "2026",
        },
        employmentType: "Contract",
        icon: <BriefcaseBusinessIcon />,
        description: `Building the AI problem-generation pipeline for a government education platform that is live and serving 60,000+ registered students, generating olympiad-level math problems in Uzbek and Russian.
- Designed an independent verification stage that re-solves every generated problem before it enters the training set, since a newly generated problem has no existing answer key to check against.
- Built a pipeline merging hand-verified and auto-verified examples into training-ready data, with automated checks that block fine-tuning until a minimum verified volume is met per subject.
- Built an evaluation harness comparing fine-tuned checkpoints against the prompted baseline before any production switch, written before a checkpoint existed to run it on.`,
        skills: [
          "Python",
          "LLM Fine-tuning",
          "Data Pipelines",
          "Evaluation Harnesses",
          "Synthetic Data",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "elev8",
    companyName: "Elev8",
    location: "Shanghai, China",
    locationType: "On-site",
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
        description: `- Designed a framework for Stable Diffusion XL LoRA model training using Kohya_ss, with image generation through ComfyUI.
- Built an AIGC influencer pipeline on the OpenAI API, Gemini API and Instagram APIs.
- Developed a model training website that automates the Stable Diffusion XL training workflow.`,
        skills: [
          "Python",
          "Stable Diffusion XL",
          "LoRA",
          "Kohya_ss",
          "ComfyUI",
          "OpenAI API",
          "Gemini API",
        ],
        isExpanded: true,
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
        description: `- Cut RFID label printing cost by roughly 97%, from $2,000 industrial RFID printers to $60 thermal barcode printers, by mapping barcodes to RFID codes at print time and syncing the mapping to the backend in real time.
- Built a Windows background agent (SWHidApi.dll) that reads tags from an omnidirectional RFID reader over USB and relays them to a local Flask API, with noisy-read filtering and stable tag batching before ingestion.
- Built a real-time RFID inventory and POS backend on Django REST Framework and PostgreSQL, with JWT role-based access control for Owner, Cashier and Super Admin.`,
        skills: [
          "Python",
          "Django REST Framework",
          "PostgreSQL",
          "Flask",
          "JWT",
          "RFID",
        ],
      },
    ],
  },
  {
    id: "yandex-eats-replica",
    companyName: "Yandex Eats Backend (replica)",
    companyWebsite: "https://github.com/hasan-mavlonov",
    positions: [
      {
        id: "yandex-eats-open-source-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "2024",
          end: "2024",
        },
        icon: <GitBranchIcon />,
        description: `- Designed a Yandex Eats style backend using Django, FastAPI and PostgreSQL.
- Implemented authentication, restaurant and menu management, the order workflow and delivery assignment modules.`,
        skills: ["Python", "Django", "FastAPI", "PostgreSQL", "Docker"],
      },
    ],
  },
]
