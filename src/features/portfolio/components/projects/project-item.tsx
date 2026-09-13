import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { Markdown } from "@/components/markdown"

import type { Project } from "../../types/projects"
import { periodYear } from "../experiences/period"

/**
 * Bordered panel, no radius, no shadow: index strip, name, owner, role chip,
 * body, tags, then one amber primary action and a hairline secondary.
 */
export function ProjectItem({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const actions = project.actions?.length
    ? project.actions
    : [{ label: "Open", href: project.link }]
  const year = periodYear(project.period.start)
  const status = project.status ?? (project.period.end ? "shipped" : "live")

  return (
    <article className="border border-border bg-card text-card-foreground">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-2.5 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
        <span>
          {String(index + 1).padStart(2, "0")} — {project.skills[0]}
        </span>
        <span className="flex items-center gap-2 tabular-nums">
          {year}
          <span aria-hidden>·</span>
          <span className={status === "live" ? "text-[#9AD45F]" : undefined}>
            {status === "live" && (
              <span
                className="mr-1.5 inline-block size-1.5 bg-current align-middle"
                aria-hidden
              />
            )}
            {status}
          </span>
        </span>
      </div>

      <div className="px-5 py-6 md:px-6">
        <h3 className="font-display text-[28px]/[1.1] font-bold tracking-[-0.03em] text-balance">
          {project.title}
        </h3>
        {(project.owner || project.role) && (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {project.owner && (
              <span className="type-label text-[11px] text-brand">
                {project.owner}
              </span>
            )}
            {project.role && (
              <span className="border border-border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
                {project.role}
              </span>
            )}
          </div>
        )}

        {project.description && (
          <div className="typeset typeset-body mt-5 max-w-[70ch]">
            <Markdown>{project.description}</Markdown>
          </div>
        )}

        {project.skills.length > 1 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.skills.slice(1).map((skill) => (
              <li
                key={skill}
                className="border border-border px-2 py-0.75 font-mono text-[11px] text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {actions.map((action, i) => (
            <a
              key={action.href}
              href={addQueryParams(action.href, UTM_PARAMS)}
              target="_blank"
              rel="noopener"
              className={cn(
                "inline-flex min-h-11 items-center justify-center px-4 font-mono text-[11.5px] tracking-[0.12em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:min-h-9",
                i === 0
                  ? "bg-brand-fill text-brand-foreground hover:bg-[#FFC85E]"
                  : "border border-border text-foreground hover:border-brand hover:text-brand"
              )}
            >
              {action.label}
              {i > 0 && <span aria-hidden> ↗</span>}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
