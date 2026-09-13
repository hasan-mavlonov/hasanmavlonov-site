import { BrainIcon, LandmarkIcon, ScanBarcodeIcon } from "lucide-react"

import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "stablemind",
    title: "StableMind",
    period: {
      start: "01.2026",
    },
    link: "https://huggingface.co/spaces/hasanmavlonov/stablemind",
    skills: ["MindForm AI", "AI agents", "Research"],
    description: `Persistent personality for AI agents. An agent gets a measurable Big Five identity that is anchored and restored across sessions, models and restarts, so it stays the same entity every time.
- Open-access preprint with a citable DOI on [Zenodo](https://doi.org/10.5281/zenodo.20593641), endorsed for arXiv submission.
- Live demo on Hugging Face Spaces.
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
    skills: ["Simulation", "Interactive education"],
    description: `An interactive system that reconstructs ancient engineering and construction logic. Recognized in the 2026 Shanghai University Computer Application Competition.`,
    icon: <LandmarkIcon />,
  },
  {
    id: "tracky",
    title: "Tracky",
    period: {
      start: "05.2025",
      end: "09.2025",
    },
    link: "https://github.com/hasan-mavlonov",
    skills: ["Django", "PostgreSQL", "RFID"],
    description: `A real-time RFID inventory and point-of-sale backend. Cut label printing hardware cost by about 97% by mapping barcodes to RFID codes at print time, so cheap thermal printers replaced industrial RFID printers.`,
    icon: <ScanBarcodeIcon />,
  },
]
