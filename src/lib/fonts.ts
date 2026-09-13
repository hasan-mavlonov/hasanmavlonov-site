import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import { cn } from "@/lib/utils"

// Three families, one voice: Archivo for display, IBM Plex Sans for body,
// IBM Plex Mono for labels and data. The variable names are what
// globals.css's @theme block reads, so they must stay in sync.
const fontDisplay = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
})

const fontSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
})

// Plex Mono ships static weights only, so next/font needs them listed.
const fontMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mono",
})

export const fontVariables = cn(
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable
)
