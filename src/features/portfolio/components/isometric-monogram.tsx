import { useId } from "react"

import { cn } from "@/lib/utils"

/**
 * The HM monogram drawn as two extruded blocks seen in isometric, the way a
 * plan drawing shows a part rather than the way a wordmark sits on a page.
 *
 * Each letter is an upright outline extruded backwards along the depth axis
 * and projected with the standard 30 degree isometric. Hidden geometry is
 * handled by paint order rather than by culling: a letter draws its back
 * outline, then its depth edges, then an opaque front face, so the face covers
 * whatever of its own back and edges falls behind it. The letters paint left
 * to right, which is also back to front, so the M tucks over the H's
 * extrusion.
 */

const COS30 = 0.8660254
/** How far each letter is pushed back from its face. */
const DEPTH = 2.2
/** Cap height, in the same units as the outlines. */
const CAP = 7

type Point = [number, number]

/** Right and down for +x, left and down for +y, straight up for +z. */
function iso(x: number, y: number, z: number): Point {
  return [(x - y) * COS30, (x + y) * 0.5 - z]
}

function path(points: Point[]) {
  return (
    points
      .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(3)} ${y.toFixed(3)}`)
      .join("") + "Z"
  )
}

/** Letter outlines on a 10-tall grid, x across and y down from the cap. */
const H: Point[] = [
  [0, 0],
  [2, 0],
  [2, 4],
  [4, 4],
  [4, 0],
  [6, 0],
  [6, 10],
  [4, 10],
  [4, 6],
  [2, 6],
  [2, 10],
  [0, 10],
]

const M: Point[] = [
  [0, 0],
  [2, 0],
  [4, 4.4],
  [6, 0],
  [8, 0],
  [8, 10],
  [6, 10],
  [6, 4.6],
  [4.7, 6.8],
  [3.3, 6.8],
  [2, 4.6],
  [2, 10],
  [0, 10],
]

/** Left to right, which is also back to front under this projection. */
const LETTERS = [
  { key: "h", outline: H, offset: 0 },
  { key: "m", outline: M, offset: 8.1 },
]

/** Outline units are a 10-tall grid; scale them to the cap height. */
const SCALE = CAP / 10

export function IsometricMonogram({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  const hatch = `monogram-hatch-${useId().replace(/[^\w-]/g, "")}`

  return (
    <svg
      className={cn("text-foreground/30", className)}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      viewBox="-2.6 -7.6 17.4 17.2"
      aria-hidden
      {...props}
    >
      <defs>
        <pattern
          height="0.62"
          id={hatch}
          patternTransform="rotate(-30)"
          patternUnits="userSpaceOnUse"
          width="0.62"
        >
          <line
            stroke="currentColor"
            strokeWidth="0.07"
            x1="0"
            x2="0"
            y1="0"
            y2="0.62"
          />
        </pattern>
      </defs>

      {LETTERS.map(({ key, outline, offset }) => {
        const at = (depth: number) =>
          outline.map(([a, b]) =>
            iso(offset + a * SCALE, depth, CAP - b * SCALE)
          )
        const back = at(0)
        const face = at(DEPTH)

        return (
          <g key={key}>
            <path
              d={path(back)}
              opacity={0.5}
              vectorEffect="non-scaling-stroke"
            />

            {back.map(([bx, by], i) => {
              const [fx, fy] = face[i] ?? [bx, by]
              return (
                <line
                  key={i}
                  opacity={0.5}
                  vectorEffect="non-scaling-stroke"
                  x1={bx}
                  x2={fx}
                  y1={by}
                  y2={fy}
                />
              )
            })}

            {/* Opaque, so it occludes the back outline and the depth edges. */}
            <path d={path(face)} fill="var(--background)" stroke="none" />
            <path d={path(face)} fill={`url(#${hatch})`} stroke="none" />
            <path d={path(face)} vectorEffect="non-scaling-stroke" />
          </g>
        )
      })}
    </svg>
  )
}
