import { GraduationCapIcon, InfinityIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { IconTile } from "@/components/ui/icon-tile"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import { Markdown } from "@/components/markdown"
import type { Education } from "@/features/portfolio/types/education"

export function EducationItem({ item }: { item: Education }) {
  const title = [item.degree, item.fieldOfStudy].filter(Boolean).join(" ")
  const period = item.period

  return (
    <div className="group/education-item relative before:absolute before:left-3 before:h-full before:w-px before:bg-border">
      <div
        className="pointer-events-none absolute bottom-0 left-3 hidden size-4 bg-background group-last/education-item:flex"
        aria-hidden
      >
        <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
      </div>

      <Collapsible defaultOpen={item.isExpanded} disabled={!item.description}>
        <CollapsibleTrigger
          className={cn(
            "group block w-full text-left",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
            "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 flex items-start gap-3 text-base">
            <IconTile>
              <GraduationCapIcon />
            </IconTile>

            <h3 className="flex-1 font-medium text-balance">
              {title}
              <span className="text-muted-foreground"> · {item.school}</span>
            </h3>

            <div className="shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:h-lh [&_svg]:w-4">
              <CollapsibleChevronsUpDownIcon duration={0.15} />
            </div>
          </div>

          {period && (
            <p className="flex items-center gap-0.5 pt-1 pl-9 text-sm text-muted-foreground tabular-nums">
              <span>{period.start}</span>
              <span className="font-mono">—</span>
              {period.end ? (
                <span>{period.end}</span>
              ) : (
                <InfinityIcon
                  className="size-4.5 translate-y-[0.5px]"
                  aria-label="Present"
                  strokeWidth={1.5}
                />
              )}
            </p>
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden">
          {item.description && (
            <div className="typeset typeset-description pt-3 pb-1 pl-9">
              <Markdown>{item.description}</Markdown>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
