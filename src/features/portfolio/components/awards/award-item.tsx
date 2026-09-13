import type { Award } from "@/features/portfolio/types/awards"

/** Tabular row: year, title, prize. No prose, no boxes. */
export function AwardItem({ award }: { award: Award }) {
  const year = award.date.slice(0, 4)
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 px-4 py-3.5 md:grid-cols-[148px_minmax(0,1fr)_auto] md:gap-x-8">
      <time
        className="font-mono text-xs text-muted-foreground tabular-nums"
        dateTime={award.date}
      >
        {year}
      </time>
      <h3 className="text-[15px]/[1.4] font-medium text-balance">
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
      <span className="col-start-2 type-label text-[10.5px] text-brand md:col-start-3 md:text-right">
        {award.prize}
      </span>
    </div>
  )
}
