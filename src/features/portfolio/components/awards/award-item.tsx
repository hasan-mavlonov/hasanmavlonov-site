import { format } from "date-fns"
import { Crown } from "lucide-react"

import { IconTile } from "@/components/ui/icon-tile"
import type { Award } from "@/features/portfolio/types/awards"

/** One row: what it was, how it went, and when. */
export function AwardItem({ award }: { award: Award }) {
  return (
    <div className="flex w-full items-center">
      <IconTile className="mx-4">{award.icon ?? <Crown />}</IconTile>

      <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1 border-l border-dashed border-line p-4 pr-2">
        <h3 className="flex-1 leading-snug font-medium text-balance">
          {award.referenceLink ? (
            <a
              className="link"
              href={award.referenceLink}
              target="_blank"
              rel="noopener"
            >
              {award.title}
            </a>
          ) : (
            award.title
          )}
        </h3>

        <p className="text-sm text-muted-foreground">{award.prize}</p>

        <p className="w-10 text-right text-sm text-muted-foreground tabular-nums">
          <time dateTime={new Date(award.date).toISOString()}>
            {format(new Date(award.date), "yyyy")}
          </time>
        </p>
      </div>
    </div>
  )
}
