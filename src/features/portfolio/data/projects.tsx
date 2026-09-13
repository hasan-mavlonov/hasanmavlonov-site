import { BrainIcon, LandmarkIcon, ScanBarcodeIcon } from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "stablemind",
    title: "StableMind",
    period: {
      start: "2026",
    },
    link: "https://doi.org/10.5281/zenodo.20593641",
    skills: [
      "Research",
      "LLM Agents",
      "Memory Architecture",
      "Python",
      "HuggingFace Spaces",
    ],
    description: `A two-timescale architecture for persistent personality in LLM agents. / Open-access preprint with a citable DOI on Zenodo, plus an interactive live demo on HuggingFace Spaces.
- Introduces a dual-memory architecture that decouples short-horizon reasoning dynamics from long-term identity persistence.
- Implements a two-timescale mechanism where fast-updating context governs immediate responses while a slower memory layer maintains consistent behavioural traits across sessions.
- Endorsed for arXiv submission by Nuo Chen, author of "Diversity Collapse in Multi-Agent LLM Systems".
`,
    icon: <BrainIcon />,
    isExpanded: true,
  },
  {
    id: "ancient-engineering-simulation",
    title: "Ancient Engineering Simulation System",
    period: {
      start: "2026",
    },
    link: "https://gugong.xyz",
    skills: ["AI & Simulation", "Interactive Education", "Rule-based Modeling"],
    description: `An interactive simulation system modelling ancient engineering principles and construction logic.
- Simulates historical engineering processes through rule-based structural modelling and interactive reconstruction workflows.
- Recognized in the 2026 Shanghai University Computer Application Competition.
`,
    icon: <LandmarkIcon />,
    isExpanded: true,
  },
  {
    id: "tracky",
    title: "Tracky",
    period: {
      start: "05.2025",
      end: "09.2025",
    },
    link: "https://github.com/hasan-mavlonov",
    skills: [
      "Django REST Framework",
      "PostgreSQL",
      "Flask",
      "RFID",
      "Windows Agent",
    ],
    description: `A real-time RFID inventory and POS backend.
- Cut label printing hardware cost by roughly 97% by mapping barcodes to RFID codes at print time.
- Windows background agent reads an omnidirectional RFID reader over USB, filters noisy reads and batches stable tags before ingestion.
`,
    icon: <ScanBarcodeIcon />,
  },
]
