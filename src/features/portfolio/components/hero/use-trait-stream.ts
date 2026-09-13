"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import type { TraitEvent, TraitFrame, TraitKey } from "./traits"
import { ANCHOR_ID, ANCHOR_VECTOR } from "./traits"

export type StreamStatus =
  "connecting" | "streaming" | "hold" | "stale" | "anchor-only"

export type LoggedEvent = TraitEvent & {
  /** Wall-clock time the frame arrived, HH:MM:SS.mmm. */
  time: string
  seq: number
}

type ReplayFile = {
  fps: number
  loop: boolean
  frames: TraitFrame[]
}

const STALE_AFTER_MS = 3000

const ANCHOR_FRAME: TraitFrame = {
  seq: 0,
  t: "",
  anchor_id: ANCHOR_ID,
  traits: { ...ANCHOR_VECTOR },
  anchor: { ...ANCHOR_VECTOR },
}

function stamp(date: Date) {
  const hms = [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":")
  return `${hms}.${String(date.getMilliseconds()).padStart(3, "0")}`
}

/**
 * Feeds the trait instrument. With `endpoint` it subscribes to the SSE stream;
 * without one it loops the static replay file. Either way the hook only
 * connects while `containerRef` is on screen, goes STALE after three silent
 * seconds, and falls back to the persisted anchor vector on hard failure, so
 * the instrument is never empty and never a spinner.
 */
export function useTraitStream({
  endpoint,
  replayUrl = "/data/trait-replay.json",
  containerRef,
  eventLimit = 4,
}: {
  endpoint?: string
  replayUrl?: string
  containerRef: React.RefObject<HTMLElement | null>
  eventLimit?: number
}) {
  const [frame, setFrame] = useState<TraitFrame>(ANCHOR_FRAME)
  const [status, setStatus] = useState<StreamStatus>("connecting")
  const [events, setEvents] = useState<LoggedEvent[]>([])
  const [held, setHeld] = useState(false)
  const [visible, setVisible] = useState(false)

  const heldRef = useRef(held)
  useEffect(() => {
    heldRef.current = held
  }, [held])

  const receive = useCallback(
    (next: TraitFrame) => {
      setFrame(next)
      setStatus("streaming")
      if (next.event) {
        const ev = next.event
        setEvents((prev) =>
          [{ ...ev, time: stamp(new Date()), seq: next.seq }, ...prev].slice(
            0,
            eventLimit
          )
        )
      }
    },
    [eventLimit]
  )

  // Connect only while in view: a real reason to stop, not a hidden
  // animation burning battery off screen.
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef])

  useEffect(() => {
    if (!visible) return

    let cancelled = false
    let staleTimer: ReturnType<typeof setTimeout> | undefined
    let ticker: ReturnType<typeof setInterval> | undefined
    let source: EventSource | undefined

    const armStale = () => {
      if (staleTimer) clearTimeout(staleTimer)
      staleTimer = setTimeout(() => {
        if (!heldRef.current) setStatus("stale")
      }, STALE_AFTER_MS)
    }

    if (endpoint && typeof EventSource !== "undefined") {
      source = new EventSource(endpoint)
      source.onmessage = (message) => {
        if (cancelled || heldRef.current) return
        try {
          receive(JSON.parse(message.data) as TraitFrame)
          armStale()
        } catch {
          // A malformed frame is dropped; the last good one stays on screen.
        }
      }
      source.onerror = () => {
        if (!cancelled) setStatus("stale")
      }
      armStale()
    } else {
      const slow =
        window.matchMedia("(max-width: 767px)").matches ||
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData === true

      fetch(replayUrl)
        .then((res) =>
          res.ok
            ? (res.json() as Promise<ReplayFile>)
            : Promise.reject(res.status)
        )
        .then((file: ReplayFile) => {
          if (cancelled || !file.frames?.length) throw new Error("empty")
          const fps = slow ? Math.min(2, file.fps) : file.fps
          let index = 0
          const step = () => {
            if (heldRef.current) return
            receive(file.frames[index])
            index = (index + 1) % file.frames.length
          }
          step()
          ticker = setInterval(step, 1000 / fps)
        })
        .catch(() => {
          if (cancelled) return
          setFrame(ANCHOR_FRAME)
          setStatus("anchor-only")
        })
    }

    return () => {
      cancelled = true
      if (staleTimer) clearTimeout(staleTimer)
      if (ticker) clearInterval(ticker)
      source?.close()
    }
  }, [visible, endpoint, replayUrl, receive])

  const toggleHold = useCallback(() => {
    setHeld((h) => {
      const next = !h
      setStatus(next ? "hold" : "streaming")
      return next
    })
  }, [])

  const traitKeys = Object.keys(frame.traits) as TraitKey[]

  return { frame, status, events, held, toggleHold, traitKeys }
}
