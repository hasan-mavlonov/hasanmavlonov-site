"use client"

import type { JSX } from "react"
import { useEffect, useRef, useState } from "react"

const HOVER_DELAY_MS = 150

export function AvatarElectricEffect({ children }: { children: JSX.Element }) {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [play] = useSound(laserSmall001Sound, { volume: 0.2 })

    if (!hoverTimeoutRef.current) return

    clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = null
  }

  useEffect(() => {
    return () => {
      clearHoverTimeout()
    }
  }, [])

  const handleMouseEnter = () => {
    clearHoverTimeout()

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
      play()
    }, HOVER_DELAY_MS)

  const handleMouseLeave = () => {
    clearHoverTimeout()
    setIsHovered(false)
  }

  return (
    <ElectricBorder
      chaos={0.03}
      borderRadius={999}
      color="#fbbf24"
      active={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </ElectricBorder>
  )
}
