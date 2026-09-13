"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { curveNatural } from "@visx/curve"
import { LinePath } from "@visx/shape"
import { motion, useMotionTemplate, useSpring } from "motion/react"

import { chartCssVars, useChart } from "./chart-context"
import { ChartRevealClip } from "./chart-reveal-clip"

// CurveFactory type - simplified version compatible with visx
// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CurveFactory = any

export interface LineProps {
  /** Key in data to use for y values */
  dataKey: string
  /** Stroke color. Default: var(--chart-line-primary) */
  stroke?: string
  /** Stroke width. Default: 2.5 */
  strokeWidth?: number
  /** Curve function. Default: curveNatural */
  curve?: CurveFactory
  /** Whether to animate the line. Default: true */
  animate?: boolean
  /** Whether to fade edges with gradient. Default: true */
  fadeEdges?: boolean
  /** Whether to show highlight segment on hover. Default: true */
  showHighlight?: boolean
}

// Binary search for the path length at a given X coordinate
function lengthAtX(
  path: SVGPathElement,
  pathLength: number,
  targetX: number
): number {
  let low = 0
  let high = pathLength
  const tolerance = 0.5

  while (high - low > tolerance) {
    const mid = (low + high) / 2
    if (path.getPointAtLength(mid).x < targetX) {
      low = mid
    } else {
      high = mid
    }
  }
  return (low + high) / 2
}

export function Line({
  dataKey,
  stroke = chartCssVars.linePrimary,
  strokeWidth = 2.5,
  curve = curveNatural,
  animate = true,
  fadeEdges = true,
  showHighlight = true,
}: LineProps) {
  const {
    data,
    xScale,
    yScale,
    innerHeight,
    innerWidth,
    tooltipData,
    selection,
    isLoaded,
    enterTransition,
    revealEpoch,
    xAccessor,
  } = useChart()

  const pathRef = useRef<SVGPathElement>(null)
  // The highlight segment is drawn from the rendered path, so its length and
  // "d" attribute are captured after layout rather than read off the ref
  // during render.
  const [pathLength, setPathLength] = useState(0)
  const [pathD, setPathD] = useState("")

  const gradientId = `line-gradient-${dataKey}-${useId().replace(/[^\w-]/g, "")}`

  useEffect(() => {
    const path = pathRef.current
    if (!path) {
      return
    }
    const len = path.getTotalLength()
    if (len > 0) {
      setPathLength(len)
      setPathD(path.getAttribute("d") ?? "")
    }
  }, [data, innerWidth, innerHeight])

  // Springs for smooth highlight animation (both offset AND segment length)
  const springConfig = { stiffness: 180, damping: 28 }
  const offsetSpring = useSpring(0, springConfig)
  const segmentLengthSpring = useSpring(0, springConfig)

  // Segment bounds come from DOM geometry, so they are computed in an effect
  // and pushed straight into the springs instead of derived during render.
  useEffect(() => {
    const path = pathRef.current
    if (!path || pathLength === 0) {
      return
    }

    let startX: number | null = null
    let endX: number | null = null

    // Selection takes priority over hover
    if (selection?.active) {
      startX = selection.startX
      endX = selection.endX
    } else if (tooltipData) {
      const idx = tooltipData.index
      const startPoint = data[Math.max(0, idx - 1)]
      const endPoint = data[Math.min(data.length - 1, idx + 1)]
      if (startPoint && endPoint) {
        startX = xScale(xAccessor(startPoint)) ?? 0
        endX = xScale(xAccessor(endPoint)) ?? 0
      }
    }

    if (startX === null || endX === null) {
      offsetSpring.set(0)
      segmentLengthSpring.set(0)
      return
    }

    const startLength = lengthAtX(path, pathLength, startX)
    const endLength = lengthAtX(path, pathLength, endX)
    offsetSpring.set(-startLength)
    segmentLengthSpring.set(endLength - startLength)
  }, [
    tooltipData,
    selection,
    data,
    xScale,
    xAccessor,
    pathLength,
    offsetSpring,
    segmentLengthSpring,
  ])

  // Create animated strokeDasharray using motion template
  const animatedDasharray = useMotionTemplate`${segmentLengthSpring} ${pathLength}`

  // Get y value for a data point
  const getY = useCallback(
    (d: Record<string, unknown>) => {
      const value = d[dataKey]
      return typeof value === "number" ? (yScale(value) ?? 0) : 0
    },
    [dataKey, yScale]
  )

  const isHovering = tooltipData !== null || selection?.active === true

  return (
    <>
      {/* Gradient definition for fading edges */}
      {fadeEdges && (
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0 }} />
            <stop offset="15%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="85%" style={{ stopColor: stroke, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      )}

      {/* Clip path for grow animation - unique per line */}
      {animate && data.length > 1 ? (
        <defs>
          <ChartRevealClip
            clipPathId={`grow-clip-${dataKey}`}
            enterTransition={enterTransition}
            height={innerHeight + 20}
            revealEpoch={revealEpoch ?? 0}
            targetWidth={innerWidth}
          />
        </defs>
      ) : null}

      <g
        clipPath={
          animate && data.length > 1 ? `url(#grow-clip-${dataKey})` : undefined
        }
      >
        <motion.g
          animate={{ opacity: isHovering && showHighlight ? 0.3 : 1 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <LinePath
            curve={curve}
            data={data}
            innerRef={pathRef}
            stroke={fadeEdges ? `url(#${gradientId})` : stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            x={(d) => xScale(xAccessor(d)) ?? 0}
            y={getY}
          />
        </motion.g>
      </g>

      {/* Highlight segment on hover */}
      {showHighlight && isHovering && isLoaded && pathD !== "" && (
        <motion.path
          animate={{ opacity: 1 }}
          d={pathD}
          exit={{ opacity: 0 }}
          fill="none"
          initial={{ opacity: 0 }}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: animatedDasharray,
            strokeDashoffset: offsetSpring,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </>
  )
}

Line.displayName = "Line"

export default Line
