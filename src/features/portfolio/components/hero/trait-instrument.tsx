"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

import type { TraitDefinition, TraitFrame, TraitKey } from "./traits"
import {
  ANCHOR_ID,
  DEFAULT_TOLERANCE,
  driftL2,
  formatDelta,
  formatValue,
  TRAITS,
} from "./traits"
import type { LoggedEvent, StreamStatus } from "./use-trait-stream"
import { useTraitStream } from "./use-trait-stream"

const STATUS_LABEL: Record<StreamStatus, string> = {
  connecting: "CONNECTING",
  streaming: "STREAMING",
  hold: "HOLD",
  stale: "STALE",
  "anchor-only": "ANCHOR ONLY",
}

const STATUS_CLASS: Record<StreamStatus, string> = {
  connecting: "text-muted-foreground",
  streaming: "text-[#9AD45F]",
  hold: "text-muted-foreground",
  stale: "text-destructive",
  "anchor-only": "text-muted-foreground",
}

// Nine static ticks at 0, .125 ... 1; the middle four hide below md.
const TICKS = Array.from({ length: 9 }, (_, i) => i / 8)

type TraitInstrumentProps = {
  variant?: "hero" | "section"
  /** SSE endpoint. Omitted: the static replay file loops instead. */
  endpoint?: string
  replayUrl?: string
  tolerance?: number
  agentId?: string
  className?: string
}

/**
 * Calibrated rail: five Big Five traits, each a needle and fill over a tick
 * rail with the persisted anchor as a fixed diamond. The only motion is the
 * 110 ms linear slew to a newly received value; a stopped instrument looks
 * stopped.
 */
export function TraitInstrument({
  variant = "hero",
  endpoint,
  replayUrl,
  tolerance = DEFAULT_TOLERANCE,
  agentId = "stablemind.demo",
  className,
}: TraitInstrumentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { frame, status, events, held, toggleHold } = useTraitStream({
    endpoint,
    replayUrl,
    containerRef,
    eventLimit: 4,
  })

  const drift = driftL2(frame.traits, frame.anchor).toFixed(4)
  const dimmed = status === "stale" || status === "anchor-only"

  return (
    <div
      ref={containerRef}
      data-slot="trait-instrument"
      data-variant={variant}
      data-status={status}
      className={cn(
        "border border-border bg-card text-card-foreground",
        className
      )}
    >
      {variant === "hero" ? (
        <HeroHeader agentId={agentId} status={status} />
      ) : (
        <SectionHeader
          seq={frame.seq}
          drift={drift}
          status={status}
          held={held}
          onToggle={toggleHold}
        />
      )}

      {variant === "section" && (
        <div className="grid grid-cols-[minmax(0,1fr)_62px] gap-x-4 px-5 pt-5 pb-2.5 type-label text-[10px] text-[#4C6B8F] md:grid-cols-[150px_minmax(0,1fr)_62px_58px]">
          <span className="max-md:hidden">Trait</span>
          <span>0.00 ———————— 1.00</span>
          <span className="text-right">Value</span>
          <span className="text-right max-md:hidden">Δ anchor</span>
        </div>
      )}

      <div
        className={cn(
          "grid",
          variant === "hero" ? "gap-3.5 px-4 pt-4 pb-2" : "px-5 pb-1.5"
        )}
      >
        {TRAITS.map((trait) => (
          <TraitRail
            key={trait.key}
            trait={trait}
            frame={frame}
            tolerance={tolerance}
            variant={variant}
            dimmed={dimmed}
          />
        ))}
      </div>

      {variant === "hero" ? (
        <div className="mt-2.5 flex justify-between border-t border-line px-4 pt-2.5 pb-3.5 font-mono text-[10.5px] text-[#4C6B8F]">
          <span>anchor {frame.anchor_id || ANCHOR_ID}</span>
          <span className="tabular-nums">Δ {drift}</span>
        </div>
      ) : (
        <EventLog events={events} />
      )}
    </div>
  )
}

function HeroHeader({
  agentId,
  status,
}: {
  agentId: string
  status: StreamStatus
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
      <span>agent://{agentId}</span>
      <span className={STATUS_CLASS[status]} aria-live="polite">
        {STATUS_LABEL[status]}
      </span>
    </div>
  )
}

function SectionHeader({
  seq,
  drift,
  status,
  held,
  onToggle,
}: {
  seq: number
  drift: string
  status: StreamStatus
  held: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border px-5 py-3 font-mono text-[10.5px] tracking-[0.13em] text-muted-foreground uppercase">
      <span className="text-foreground">StableMind — live trait vector</span>
      <span className="flex items-center gap-5">
        <span className="max-md:hidden">
          anchor <span className="text-foreground">{ANCHOR_ID}</span>
        </span>
        <span className="max-md:hidden">
          seq <span className="text-foreground tabular-nums">{seq}</span>
        </span>
        <span className="max-md:hidden">
          Δ L2 <span className="text-foreground tabular-nums">{drift}</span>
        </span>
        <span className={STATUS_CLASS[status]} aria-live="polite">
          {STATUS_LABEL[status]}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={held}
          className="border border-[#2C4260] px-3 py-1.25 font-mono text-[10.5px] tracking-[0.13em] text-foreground uppercase transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          {held ? "Stream" : "Hold"}
        </button>
      </span>
    </div>
  )
}

function TraitRail({
  trait,
  frame,
  tolerance,
  variant,
  dimmed,
}: {
  trait: TraitDefinition
  frame: TraitFrame
  tolerance: number
  variant: "hero" | "section"
  dimmed: boolean
}) {
  const value = frame.traits[trait.key]
  const anchor = frame.anchor[trait.key]
  const delta = value - anchor
  const pastTolerance = Math.abs(delta) > tolerance * 0.75
  const pct = `${(value * 100).toFixed(2)}%`
  const anchorPct = `calc(${(anchor * 100).toFixed(2)}% - 3.5px)`
  const hero = variant === "hero"

  return (
    <div
      className={cn(
        "grid items-center",
        hero
          ? "grid-cols-[20px_minmax(0,1fr)_52px] gap-3"
          : "grid-cols-[minmax(0,1fr)_62px] gap-x-4 border-t border-line py-3 md:grid-cols-[150px_minmax(0,1fr)_62px_58px]"
      )}
    >
      {hero ? (
        <span className="font-mono text-xs text-muted-foreground">
          {trait.key}
        </span>
      ) : (
        <div className="max-md:col-span-2 max-md:mb-1.5">
          <div className="text-sm font-medium text-foreground">
            {trait.label}
          </div>
          <div className="font-mono text-[10px] tracking-[0.12em] text-[#4C6B8F] uppercase max-md:hidden">
            {trait.facet}
          </div>
        </div>
      )}

      <div
        role="meter"
        aria-label={`${trait.label}, anchored at ${formatValue(anchor)}`}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={Number(value.toFixed(3))}
        className={cn("relative", hero ? "h-4.5" : "h-4.5 md:h-7")}
      >
        {/* baseline */}
        <span
          className={cn(
            "absolute right-0 left-0 bg-border",
            hero ? "top-2 h-0.5" : "top-2 h-0.5 md:top-3.25 md:h-px"
          )}
          aria-hidden
        />
        {!hero && (
          <span
            className="absolute top-1.75 right-0 left-0 flex justify-between"
            aria-hidden
          >
            {TICKS.map((tick, i) => {
              const major = i % 4 === 0
              return (
                <span
                  key={tick}
                  className={cn(
                    "w-px",
                    major ? "h-3.5 bg-[#2C4260]" : "h-1.75 bg-border",
                    // 9 ticks on desktop, 5 (every other) below md
                    i % 2 === 1 && "max-md:hidden"
                  )}
                />
              )
            })}
          </span>
        )}
        {/* fill */}
        <span
          className={cn(
            "absolute left-0 transition-[width] duration-[110ms] ease-linear motion-reduce:transition-none",
            hero ? "top-2 h-0.5" : "top-2 h-0.5 md:top-3 md:h-0.75"
          )}
          style={{
            width: pct,
            background: dimmed ? "#7D93AC" : trait.color,
          }}
          aria-hidden
        />
        {/* anchor diamond: fixed, no transition */}
        <span
          className={cn(
            "absolute rotate-45 border border-[#4C6B8F]",
            hero
              ? "top-1.5 size-1.5"
              : "top-1.5 size-1.5 md:top-2.5 md:size-1.75"
          )}
          style={{ left: anchorPct }}
          aria-hidden
        />
        {/* needle */}
        <span
          className={cn(
            "absolute w-0.5 transition-[left] duration-[110ms] ease-linear motion-reduce:transition-none",
            hero ? "top-0.5 h-3.5" : "top-0.5 h-3.5 md:top-1 md:h-5",
            dimmed ? "bg-[#7D93AC]" : "bg-foreground"
          )}
          style={{ left: pct }}
          aria-hidden
        />
      </div>

      <span
        className={cn(
          "text-right font-mono text-foreground tabular-nums",
          hero ? "text-xs" : "text-sm"
        )}
      >
        {formatValue(value)}
      </span>

      {!hero && (
        <span
          className={cn(
            "text-right font-mono text-xs tabular-nums max-md:col-start-2 max-md:text-[10px]",
            pastTolerance ? "text-brand" : "text-muted-foreground"
          )}
        >
          {formatDelta(delta)}
        </span>
      )}
    </div>
  )
}

function EventLog({ events }: { events: LoggedEvent[] }) {
  const color = (key: TraitKey) => TRAITS.find((t) => t.key === key)?.color
  return (
    <div className="border-t border-border px-5 pt-3.5 pb-4.5">
      <div className="mb-2.5 font-mono text-[10px] tracking-[0.13em] text-[#4C6B8F] uppercase">
        Event log — what moved the needle
      </div>
      <ol
        className="grid gap-1.25"
        aria-live="polite"
        aria-relevant="additions"
      >
        {events.length === 0 && (
          <li className="font-mono text-[11.5px] text-muted-foreground">
            waiting for the first frame
          </li>
        )}
        {events.map((event, i) => (
          <li
            key={`${event.seq}-${event.trait}`}
            className={cn(
              "grid grid-cols-[104px_26px_56px_minmax(0,1fr)] gap-3.5 font-mono text-[11.5px] text-muted-foreground tabular-nums",
              // 4 rows on desktop, 2 below md
              i >= 2 && "max-md:hidden"
            )}
          >
            <span>{event.time}</span>
            <span style={{ color: color(event.trait) }}>{event.trait}</span>
            <span className="text-right text-foreground">
              {formatDelta(event.delta)}
            </span>
            <span className="truncate">{event.cause}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
