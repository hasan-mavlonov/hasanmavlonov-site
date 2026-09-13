"use client"

import { useId } from "react"
import { decodeEmail } from "@/utils/string"

import { useIsClient } from "@/hooks/use-is-client"

import { RevealEncodedTextScript } from "./reveal-encoded-text"

/**
 * The address is base64 in the markup and decoded before first paint, so it is
 * never served as plaintext for scrapers to lift. The href waits for the
 * client for the same reason.
 */
export function ContactEmail({ emailB64 }: { emailB64: string }) {
  const id = useId()
  const isClient = useIsClient()
  const email = decodeEmail(emailB64)

  return (
    <>
      <a
        className="link-underline"
        href={isClient ? `mailto:${email}` : ""}
        id={id}
        suppressHydrationWarning
      >
        {isClient ? email : ""}
      </a>

      <RevealEncodedTextScript id={id} textB64={emailB64} />
    </>
  )
}
