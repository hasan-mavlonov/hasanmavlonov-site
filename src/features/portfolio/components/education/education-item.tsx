import { Markdown } from "@/components/markdown"
import type { Education } from "@/features/portfolio/types/education"

import { EntryContext, EntryRow, EntryTags, EntryTitle } from "../entry-row"

export function EducationItem({ item }: { item: Education }) {
  const { start, end } = item.period
  const title = item.degree ?? item.fieldOfStudy ?? item.school

  return (
    <EntryRow
      id={`education-${item.id}`}
      meta={
        <span className="text-foreground tabular-nums">
          {start} — {end ?? "Present"}
        </span>
      }
    >
      <EntryTitle title={title} org={item.school} />
      {item.degree && item.fieldOfStudy && (
        <EntryContext>{item.fieldOfStudy}</EntryContext>
      )}
      {item.description && (
        <div className="typeset typeset-body mt-4">
          <Markdown>{item.description}</Markdown>
        </div>
      )}
      <EntryTags tags={item.skills} />
    </EntryRow>
  )
}
