import Image from "next/image"
import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"

import type { Experience, ExperienceAffiliation } from "../../types/experiences"
import { ContactEmail } from "../contact-email"
import { ExperiencePositionItem } from "./experience-position-item"

/**
 * Collects marks under their shared relation, keeping both the relations and
 * the marks within each in the order the data declares them, so one row is
 * drawn per kind of tie rather than one per organisation.
 */
function groupByRelation(affiliations: ExperienceAffiliation[] | undefined) {
  const grouped = new Map<string, ExperienceAffiliation[]>()

  for (const affiliation of affiliations ?? []) {
    const marks = grouped.get(affiliation.relation)
    if (marks) {
      marks.push(affiliation)
    } else {
      grouped.set(affiliation.relation, [affiliation])
    }
  }

  return [...grouped]
}

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div
      id={`experience-${experience.id}`}
      className="group/experience screen-line-bottom scroll-mt-14 space-y-4 py-4"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <div className="flex size-6 shrink-0 items-center justify-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              width={24}
              height={24}
              quality={100}
              className="rounded-full grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/experience:grayscale-0"
              unoptimized
              aria-hidden
            />
          ) : (
            (experience.companyIcon ?? (
              <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            ))
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex min-w-0 flex-col gap-y-0.5">
            <h3 className="text-xl/6 font-medium">
              {experience.companyWebsite ? (
                <a
                  className="link"
                  href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                >
                  {experience.companyName}
                </a>
              ) : (
                experience.companyName
              )}
            </h3>

            {experience.emailB64 && (
              <ContactEmail
                className="w-fit text-sm break-words text-muted-foreground link-underline"
                emailB64={experience.emailB64}
              />
            )}
          </div>

          <p className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground empty:hidden">
            {experience.location && (
              <span className="truncate">
                {experience.location}
                {experience.locationType && ` (${experience.locationType})`}
              </span>
            )}

            {experience.isCurrentEmployer && (
              <span className="relative flex size-2.5 translate-x-px translate-y-px items-center justify-center">
                <span className="sr-only">Current</span>
                <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-info opacity-50" />
                <span className="relative inline-flex size-1.5 rounded-full bg-info" />
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>

      {groupByRelation(experience.affiliations).map(([relation, marks]) => (
        <div
          key={relation}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 pl-9"
        >
          <span className="text-sm text-muted-foreground">{relation}</span>

          {marks.map((mark) => (
            <span key={mark.name} className="flex items-center gap-2">
              <Image
                src={mark.src}
                alt={mark.name}
                width={mark.width}
                height={mark.height}
                /* Artwork that names itself is drawn larger so its own
                   wordmark stays readable; a bare glyph sits at text size. */
                className={cn("w-auto", mark.caption ? "h-6" : "h-14")}
                unoptimized
              />

              {mark.caption && (
                <span className="text-sm text-muted-foreground">
                  {mark.caption}
                </span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
