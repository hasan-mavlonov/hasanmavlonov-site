"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/** Grid pitch in CSS pixels. */
const SPACING = 14
/** Square side at rest and at full light. */
const DOT_REST = 1.3
const DOT_LIT = 2.4
/** Opacity at rest and at full light, per theme. */
const REST_ALPHA = { light: 0.07, dark: 0.055 }
const LIT_ALPHA = { light: 0.32, dark: 0.46 }
/** Falloff radius of a travelling light, in CSS pixels. */
const RADIUS = 300
/** One traverse, in milliseconds. */
const PERIOD = 17000
/** Fraction of a cycle a light is lit; the remainder is the quiet gap. */
const DUTY = 0.62
/** Quantisation buckets for lit dots, so a frame is a handful of state changes. */
const LEVELS = 6
const FRAME_MS = 1000 / 30

/**
 * Each light sweeps from `from` to `to` in viewport-relative coordinates,
 * starting off-canvas so it arrives and leaves rather than popping.
 */
const LIGHTS = [
  { phase: 0, from: [1.2, 0.12], to: [-0.2, 0.58] },
  { phase: 0.5, from: [-0.2, 0.82], to: [1.2, 0.34] },
] as const

/** Stable per-dot value, so the ragged edge of a light does not crawl. */
function dither(col: number, row: number) {
  const n = Math.sin(col * 127.1 + row * 311.7) * 43758.5453
  return n - Math.floor(n)
}

/** Rises and falls across the lit part of the cycle, zero through the gap. */
function envelope(progress: number) {
  if (progress >= DUTY) {
    return 0
  }
  return Math.sin((Math.PI * progress) / DUTY) ** 1.6
}

/**
 * A dot matrix with soft lights drifting through it: dots sit near-invisible
 * at rest and brighten and grow as a light passes, with a dithered edge so the
 * falloff reads as halftone rather than as a clean circle.
 *
 * The resting grid is rendered once to an offscreen canvas and blitted each
 * frame, so per-frame work is limited to the few hundred dots actually inside a
 * light. It holds a single static frame under `prefers-reduced-motion`, and
 * stops entirely while the tab is hidden.
 */
export function DotFieldBackground({
  className,
  ...props
}: React.ComponentProps<"canvas">) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let originX = 0
    let originY = 0
    let frame: number | null = null
    let lastDraw = 0
    let start = performance.now()

    // The palette is neutral, so the theme only decides which end of it to use.
    let ink = "255,255,255"
    let rest = REST_ALPHA.dark
    let lit = LIT_ALPHA.dark

    const readTheme = () => {
      const dark = document.documentElement.classList.contains("dark")
      ink = dark ? "255,255,255" : "9,9,11"
      rest = dark ? REST_ALPHA.dark : REST_ALPHA.light
      lit = dark ? LIT_ALPHA.dark : LIT_ALPHA.light
    }

    const base = document.createElement("canvas")
    const baseCtx = base.getContext("2d")

    const paintBase = (dpr: number) => {
      if (!baseCtx) {
        return
      }
      base.width = Math.max(1, Math.round(width * dpr))
      base.height = Math.max(1, Math.round(height * dpr))
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      baseCtx.clearRect(0, 0, width, height)
      baseCtx.fillStyle = `rgba(${ink},${rest})`
      const half = DOT_REST / 2
      for (let col = 0; col < cols; col++) {
        const x = originX + col * SPACING - half
        for (let row = 0; row < rows; row++) {
          baseCtx.fillRect(
            x,
            originY + row * SPACING - half,
            DOT_REST,
            DOT_REST
          )
        }
      }
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height)
      if (base.width > 0) {
        ctx.drawImage(base, 0, 0, width, height)
      }

      const elapsed = now - start
      // Bucket lit dots by intensity so each frame sets fillStyle a few times.
      const buckets: number[][] = Array.from({ length: LEVELS }, () => [])

      for (const light of LIGHTS) {
        const progress = (((elapsed / PERIOD + light.phase) % 1) + 1) % 1
        const env = envelope(progress)
        if (env <= 0.001) {
          continue
        }

        // Travel is linear across the lit part of the cycle.
        const travel = progress / DUTY
        const lx =
          (light.from[0] + (light.to[0] - light.from[0]) * travel) * width
        const ly =
          (light.from[1] + (light.to[1] - light.from[1]) * travel) * height

        const minCol = Math.max(
          0,
          Math.floor((lx - RADIUS - originX) / SPACING)
        )
        const maxCol = Math.min(
          cols - 1,
          Math.ceil((lx + RADIUS - originX) / SPACING)
        )
        const minRow = Math.max(
          0,
          Math.floor((ly - RADIUS - originY) / SPACING)
        )
        const maxRow = Math.min(
          rows - 1,
          Math.ceil((ly + RADIUS - originY) / SPACING)
        )

        for (let col = minCol; col <= maxCol; col++) {
          const x = originX + col * SPACING
          const dx = x - lx
          for (let row = minRow; row <= maxRow; row++) {
            const y = originY + row * SPACING
            const dy = y - ly
            const distance = Math.hypot(dx, dy)
            if (distance >= RADIUS) {
              continue
            }
            const falloff = 1 - distance / RADIUS
            const intensity =
              env * falloff * falloff * (0.45 + 0.55 * dither(col, row))
            if (intensity <= 0.02) {
              continue
            }
            const level = Math.min(LEVELS - 1, Math.floor(intensity * LEVELS))
            buckets[level]?.push(x, y)
          }
        }
      }

      for (let level = 0; level < LEVELS; level++) {
        const points = buckets[level]
        if (!points || points.length === 0) {
          continue
        }
        const t = (level + 0.5) / LEVELS
        const size = DOT_REST + (DOT_LIT - DOT_REST) * t
        const half = size / 2
        ctx.fillStyle = `rgba(${ink},${rest + (lit - rest) * t})`
        for (let i = 0; i < points.length; i += 2) {
          ctx.fillRect(
            (points[i] ?? 0) - half,
            (points[i + 1] ?? 0) - half,
            size,
            size
          )
        }
      }
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - lastDraw < FRAME_MS) {
        return
      }
      lastDraw = now
      draw(now)
    }

    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
    }

    const play = () => {
      if (frame === null && !reduced.matches && !document.hidden) {
        lastDraw = 0
        frame = requestAnimationFrame(loop)
      }
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = window.innerWidth
      height = window.innerHeight
      if (width === 0 || height === 0) {
        return
      }
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.floor(width / SPACING) + 1
      rows = Math.floor(height / SPACING) + 1
      originX = (width - (cols - 1) * SPACING) / 2
      originY = (height - (rows - 1) * SPACING) / 2

      readTheme()
      paintBase(dpr)
      draw(performance.now())
    }

    const onVisibility = () => {
      if (document.hidden) {
        stop()
      } else {
        // Resume where the cycle left off rather than jumping.
        start = performance.now()
        play()
      }
    }

    const onMotionChange = () => {
      stop()
      if (reduced.matches) {
        draw(start)
      } else {
        play()
      }
    }

    const themeObserver = new MutationObserver(() => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      readTheme()
      paintBase(dpr)
      draw(performance.now())
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    resize()
    if (reduced.matches) {
      draw(start)
    } else {
      play()
    }

    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)
    reduced.addEventListener("change", onMotionChange)

    return () => {
      stop()
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
      reduced.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <canvas
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 -z-10", className)}
      ref={canvasRef}
      {...props}
    />
  )
}
