"use client"

import type { ComponentProps } from "react"

import type { Event } from "@/lib/events"
import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"
import type { CopyStateIconProps } from "@/components/copy-state-icon"
import { CopyStateIcon } from "@/components/copy-state-icon"

export type CopyButtonProps = ComponentProps<typeof Button> & {
  /** The text to copy, or a function that returns the text. */
  text: string | (() => string)
  /** Called with the copied text on successful copy. */
  onCopySuccess?: (text: string) => void
  /** Called with the error if the copy operation fails. */
  onCopyError?: (error: Error) => void
  /** Analytics event emitted after a successful copy. */
  event?: Event["name"]
} & Omit<CopyStateIconProps, "state">

export function CopyButton({
  className,
  variant = "secondary",
  size = "icon-sm",
  children,
  text,
  idleIcon,
  doneIcon,
  errorIcon,
  onClick,
  onCopySuccess,
  onCopyError,
  event,
  ...props
}: CopyButtonProps) {
  const { state, copy } = useCopyToClipboard({
    onCopySuccess: (copiedValue) => {
      if (event) {
        trackEvent({
          name: event,
          properties: {
            code: copiedValue,
          },
        })
      }

      onCopySuccess?.(copiedValue)
    },
    onCopyError,
  })

  return (
    <Button
      className={cn("will-change-transform", className)}
      variant={variant}
      size={size}
      onClick={(e) => {
        copy(text)
        onClick?.(e)
      }}
      aria-label="Copy"
      {...props}
    >
      <CopyStateIcon
        state={state}
        idleIcon={idleIcon}
        doneIcon={doneIcon}
        errorIcon={errorIcon}
      />
      {children}
    </Button>
  )
}
