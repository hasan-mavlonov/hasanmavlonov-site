"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { BrandMark } from "./brand-mark"

const SWAP_AT_PX = 120

/**
 * "HM" in the header until the page has scrolled 120px, then the full name.
 * Opacity only, 140ms, no translate: the swap is a state change, not a
 * flourish. Off the home page the name shows from the start.
 */
export function SiteHeaderMark({ name }: { name: string }) {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/index"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY >= SWAP_AT_PX)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  const showName = !isHome || scrolled

  return (
    <span className="relative flex h-6 items-center" data-name={showName}>
      <BrandMark
        className={`h-6 shrink-0 transition-opacity duration-[140ms] motion-reduce:transition-none ${showName ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      />
      <span
        className={`absolute inset-y-0 left-0 flex items-center font-display text-base font-semibold tracking-tight whitespace-nowrap transition-opacity duration-[140ms] motion-reduce:transition-none ${showName ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!showName}
      >
        {name}
      </span>
    </span>
  )
}
