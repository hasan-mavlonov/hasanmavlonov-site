export type TraitKey = "O" | "C" | "E" | "A" | "N"

export type TraitVector = Record<TraitKey, number>

export type TraitEvent = {
  trait: TraitKey
  /** Signed, roughly ±0.001..0.05. */
  delta: number
  /** snake_case verb phrase describing what moved the needle. */
  cause: string
}

/** One frame on the wire; see the Pass 2 data contract. */
export type TraitFrame = {
  seq: number
  t: string
  anchor_id: string
  traits: TraitVector
  anchor: TraitVector
  event?: TraitEvent
}

export type TraitDefinition = {
  key: TraitKey
  label: string
  facet: string
  /** Data-only hue: equal lightness and chroma across the five channels. */
  color: string
}

export const TRAITS: readonly TraitDefinition[] = [
  {
    key: "O",
    label: "Openness",
    facet: "ideation · novelty",
    color: "#FFB224",
  },
  {
    key: "C",
    label: "Conscientiousness",
    facet: "follow-through",
    color: "#9AD45F",
  },
  { key: "E", label: "Extraversion", facet: "initiation", color: "#3FC8BE" },
  { key: "A", label: "Agreeableness", facet: "cooperation", color: "#6FA8F0" },
  { key: "N", label: "Neuroticism", facet: "volatility", color: "#E48CB4" },
]

/** The persisted identity StableMind restores from; always renderable. */
export const ANCHOR_ID = "sm_9f31c4"

export const ANCHOR_VECTOR: TraitVector = {
  O: 0.88,
  C: 0.74,
  E: 0.46,
  A: 0.61,
  N: 0.22,
}

export const DEFAULT_TOLERANCE = 0.08

export function driftL2(traits: TraitVector, anchor: TraitVector) {
  return Math.sqrt(
    TRAITS.reduce((sum, t) => sum + (traits[t.key] - anchor[t.key]) ** 2, 0)
  )
}

/** ".842" style readout: three decimals, no leading zero. */
export function formatValue(value: number) {
  return (value < 0 ? "-" : "") + Math.abs(value).toFixed(3).slice(1)
}

export function formatDelta(delta: number) {
  return (delta >= 0 ? "+" : "−") + Math.abs(delta).toFixed(3)
}
