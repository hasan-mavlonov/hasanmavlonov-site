"use client"

import { useId } from "react"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { decodeEmail } from "@/utils/string"
import { useTiks } from "@rexa-developer/tiks/react"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"

import { useIsClient } from "@/hooks/use-is-client"

import { RevealEncodedTextScript } from "./reveal-encoded-text"

/**
 * Contact-grid email cell. The address is base64 in the data and decoded by a
 * blocking inline script before first paint, so it is never plaintext in the
 * served HTML but there is no flash either. Shift+E copies it.
 */
export function HeroEmail({ emailB64 }: { emailB64: string }) {
  const id = useId()
  const isClient = useIsClient()
  const email = decodeEmail(emailB64)
  const { success } = useTiks()

  useHotkeys("shift+e", () => {
    copyToClipboardWithEvent(email, {
      name: "copy_email",
      properties: { method: "keyboard", key: "shift+e" },
    })
    success()
    toast.success("Email copied")
  })

  return (
    <>
      <a
        id={id}
        className="break-all text-brand link hover:text-brand-hover"
        href={isClient ? `mailto:${email}` : ""}
        suppressHydrationWarning
      >
        {isClient ? email : ""}
      </a>
      <RevealEncodedTextScript id={id} textB64={emailB64} />
    </>
  )
}
