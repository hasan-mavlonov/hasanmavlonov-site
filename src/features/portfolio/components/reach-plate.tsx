import { cn } from "@/lib/utils"

const ROWS = 9
const MID = (ROWS - 1) / 2

/** Where the two forms would meet, in user units. */
const CONTACT = 140
/**
 * Half the gap between the tips at rest. The travel per side lives in the
 * reach-in / reach-out keyframes and has to stay under this, or the two
 * bundles pass through each other instead of stopping short.
 */
const REST_GAP = 34

/** Rows fall back from the middle, so each bundle tapers to a point. */
function setback(row: number) {
  return Math.abs(row - MID) * 7
}

/** Shear applied to a right-hand slice while the forms are apart. */
const SLICES = [11, -6, 15, -3, 8, -13, 5, -9, 12]

/**
 * Two hairline forms drift together, hold a sliver short of touching, then
 * pull apart. The seam lights at the moment of contact, and the right bundle's
 * slices shear while the forms are apart and run flush as they meet.
 *
 * Pure CSS over a static SVG: no JavaScript, and it stops dead for anyone who
 * asks for reduced motion.
 */
export function ReachPlate({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  const rows = Array.from({ length: ROWS }, (_, row) => ({
    row,
    y: 16 + row * 12.5,
    back: setback(row),
    slice: SLICES[row] ?? 0,
    // The tip rows carry the reach, so they sit strongest.
    opacity: 1 - Math.abs(row - MID) * 0.13,
  }))

  return (
    <svg
      className={cn("text-foreground/35", className)}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 280 132"
      aria-hidden
      {...props}
    >
      <g className="animate-reach-in motion-reduce:animate-none">
        {rows.map(({ row, y, back, opacity }) => (
          <line
            key={row}
            opacity={opacity}
            x1={4 + (row % 3) * 6}
            x2={CONTACT - REST_GAP - back}
            y1={y}
            y2={y}
          />
        ))}
      </g>

      <g className="animate-reach-out motion-reduce:animate-none">
        {rows.map(({ row, y, back, slice, opacity }) => (
          <line
            className="animate-reach-slice motion-reduce:animate-none"
            key={row}
            opacity={opacity}
            style={{ "--slice": `${slice}px` } as React.CSSProperties}
            x1={CONTACT + REST_GAP + back}
            x2={276 - (row % 4) * 6}
            y1={y}
            y2={y}
          />
        ))}
      </g>

      <line
        className="animate-reach-seam text-signature motion-reduce:animate-none"
        strokeWidth={1.5}
        x1={CONTACT}
        x2={CONTACT}
        y1={52}
        y2={80}
      />
    </svg>
  )
}
