import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { Markdown } from "@/components/markdown"

import type { Experience } from "../../types/experiences"
import { EntryContext, EntryRow, EntryTags, EntryTitle } from "../entry-row"
import { formatDuration } from "./period"

/** One row per role. The company anchor lives on its first role's row. */
export function ExperienceItem({ experience }: { experience: Experience }) {
  const orgHref = experience.companyWebsite
    ? addQueryParams(experience.companyWebsite, UTM_PARAMS)
    : undefined

  const context = [
    experience.location,
    experience.locationType,
    experience.isCurrentEmployer ? "Current" : null,
  ].filter(Boolean)

  return (
    <>
      {experience.positions.map((position, index) => {
        const { start, end } = position.employmentPeriod
        const duration = formatDuration(start, end)
        return (
          <EntryRow
            key={position.id}
            id={index === 0 ? `experience-${experience.id}` : undefined}
            meta={
              <>
                <span className="text-foreground tabular-nums">
                  {start} — {end ?? "Present"}
                </span>
                {duration && <span className="tabular-nums">{duration}</span>}
                {position.employmentType && (
                  <span>{position.employmentType}</span>
                )}
              </>
            }
          >
            <EntryTitle
              title={position.title}
              org={experience.companyName}
              orgHref={orgHref}
            />
            {context.length > 0 && (
              <EntryContext>{context.join(" · ")}</EntryContext>
            )}
            {position.description && (
              <div className="typeset typeset-body mt-4">
                <Markdown>{position.description}</Markdown>
              </div>
            )}
            <EntryTags tags={position.skills} />
          </EntryRow>
        )
      })}
    </>
  )
}
