"use client"

import { copyText } from "@/utils/copy"
import { useTiks } from "@rexa-developer/tiks/react"
import { ArrowUpRight } from "lucide-react"
import { toast } from "sonner"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/base/ui/context-menu"

import { BrandMark, getBrandMarkSVG } from "./brand-mark"

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { success } = useTiks()

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          render={
            <a href="/" target="_blank">
              <ArrowUpRight />
              Open Link in New Tab
            </a>
          }
        />

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={() => {
            copyText(getBrandMarkSVG())
            toast.success("Mark as SVG copied")
            success()
          }}
        >
          <BrandMark />
          Copy Mark as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default BrandContextMenu
