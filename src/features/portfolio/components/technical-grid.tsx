import { useId } from "react"

import { cn } from "@/lib/utils"

/**
 * Fixed, deterministic node positions on a 0-100 x 0-40 canvas. Hand-placed
 * rather than randomised so server and client render the same markup and the
 * layout stays stable across recompiles.
 */
const NODES: { x: number; y: number; delay: number }[] = [
  { x: 8, y: 8, delay: 0 },
  { x: 32, y: 6, delay: 0.8 },
  { x: 56, y: 14, delay: 1.6 },
  { x: 78, y: 6, delay: 0.4 },
  { x: 94, y: 18, delay: 2.2 },
  { x: 16, y: 26, delay: 1.2 },
  { x: 44, y: 32, delay: 2.8 },
  { x: 68, y: 24, delay: 0.2 },
  { x: 88, y: 34, delay: 1.8 },
  { x: 4, y: 36, delay: 2.4 },
]

/**
 * The site's original stand-in for a video hero: a quiet technical grid with
 * a handful of pulsing nodes, drawn from the same isometric/hairline visual
 * language as the monogram rather than any stock motion-graphics look.
 */
export function TechnicalGrid({ className }: { className?: string }) {
  const gridId = `technical-grid-${useId().replace(/[^\w-]/g, "")}`

  return (
    <svg
      className={cn("text-current", className)}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 100 40"
      aria-hidden
    >
      <defs>
        <pattern height="4" id={gridId} patternUnits="userSpaceOnUse" width="4">
          <path
            d="M4 0H0V4"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="0.08"
          />
        </pattern>
      </defs>

      <rect fill={`url(#${gridId})`} height="40" width="100" />

      {NODES.map(({ x, y, delay }, i) => (
        <circle
          key={i}
          className="origin-center animate-node-pulse motion-reduce:animate-none motion-reduce:opacity-40"
          cx={x}
          cy={y}
          fill="var(--color-link)"
          r="0.6"
          style={{ animationDelay: `${delay}s`, transformBox: "fill-box" }}
        />
      ))}
    </svg>
  )
}
