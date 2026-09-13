"use client"

import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react"
import { motion } from "motion/react"

import type { CopyState } from "@/hooks/use-copy-to-clipboard"
import { IconSwap, IconSwapItem } from "@/components/icon-swap"

export type CopyStateIconProps = {
  state: CopyState
  /** Custom icon for idle state. */
  idleIcon?: React.ReactNode
  /** Custom icon for done state. */
  doneIcon?: React.ReactNode
  /** Custom icon for error state. */
  errorIcon?: React.ReactNode
}

export function CopyStateIcon({
  state,
  idleIcon,
  doneIcon,
  errorIcon,
}: CopyStateIconProps) {
  return (
    <IconSwap>
      <IconSwapItem key={state} as={motion.span}>
        {state === "idle" && (idleIcon ?? <CopyIcon data-slot="idle-icon" />)}

        {state === "done" && (doneIcon ?? <CheckIcon data-slot="done-icon" />)}

        {state === "error" &&
          (errorIcon ?? <CircleXIcon data-slot="error-icon" />)}
      </IconSwapItem>
    </IconSwap>
  )
}
