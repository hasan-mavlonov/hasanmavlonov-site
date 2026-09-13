import { BrainIcon } from "lucide-react"

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
- [Read the paper](https://doi.org/10.5281/zenodo.20593641)
- [Try the demo](https://huggingface.co/spaces/hasanmavlonov/stablemind)
`,
    icon: <BrainIcon />,
    isExpanded: true,
  },
]
