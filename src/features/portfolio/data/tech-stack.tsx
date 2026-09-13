import { BrainCircuitIcon, ImageIcon, WorkflowIcon } from "lucide-react"

import { OpenAIIcon } from "@/components/icons"

import type { TechStack } from "../types/tech-stack"

/**
 * Frameworks without a brand mark in `@/components/icons` fall back to a
 * lucide glyph, so the row stays complete without inventing someone's logo.
 */
export const TECH_STACK: TechStack[] = [
  {
    key: "python",
    title: "Python",
    href: "https://www.python.org",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"
          fill="currentColor"
        />
      </svg>
    ),
    categories: ["Language"],
  },
  {
    key: "tensorflow",
    title: "TensorFlow",
    href: "https://www.tensorflow.org",
    icon: <BrainCircuitIcon />,
    categories: ["ML & AI"],
  },
  {
    key: "stable-diffusion-xl",
    title: "Stable Diffusion XL",
    href: "https://stability.ai",
    icon: <ImageIcon />,
    categories: ["ML & AI"],
  },
  {
    key: "comfyui",
    title: "ComfyUI",
    href: "https://www.comfy.org",
    icon: <WorkflowIcon />,
    categories: ["ML & AI"],
  },
  {
    key: "gemini",
    title: "Gemini",
    href: "https://gemini.google.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
          fill="currentColor"
        />
      </svg>
    ),
    categories: ["ML & AI"],
  },
  {
    key: "chatgpt",
    title: "ChatGPT",
    href: "https://chatgpt.com",
    icon: <OpenAIIcon />,
    categories: ["ML & AI"],
  },
]
