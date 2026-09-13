import { cn } from "@/lib/utils"

/**
 * The shared entry layout from the design system: a fixed metadata gutter on
 * the left so dates line up down the whole page, content on the right, 1px
 * rules between rows and no boxes. Collapses to a single column below md.
 */
export function EntryRow({
  id,
  className,
  meta,
  children,
}: {
  id?: string
  className?: string
  meta: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <article
      id={id}
      className={cn(
        "grid scroll-mt-14 gap-3 border-b border-line px-4 py-7 last:border-none md:grid-cols-[148px_minmax(0,1fr)] md:gap-8",
        className
      )}
    >
      <div className="flex flex-wrap gap-x-3 gap-y-1 type-label text-[10.5px] text-muted-foreground md:flex-col md:gap-y-1.5 md:pt-1">
        {meta}
      </div>
      <div className="min-w-0">{children}</div>
    </article>
  )
}

/** L1 role / L2 organisation, separated by a slash, never a comma. */
export function EntryTitle({
  title,
  org,
  orgHref,
}: {
  title: string
  org?: string
  orgHref?: string
}) {
  return (
    <h3 className="flex flex-wrap items-baseline gap-x-2.5 font-display text-[22px]/[1.2] font-semibold tracking-[-0.02em] text-balance">
      <span>{title}</span>
      {org && (
        <>
          <span className="font-normal text-[#2C4260]" aria-hidden>
            /
          </span>
          {orgHref ? (
            <a
              className="text-lg font-medium text-brand link hover:text-brand-hover"
              href={orgHref}
              target="_blank"
              rel="noopener"
            >
              {org}
            </a>
          ) : (
            <span className="text-lg font-medium text-brand">{org}</span>
          )}
        </>
      )}
    </h3>
  )
}

/** L3: what the organisation is, in a mono caption. */
export function EntryContext({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 type-label text-[10.5px] text-muted-foreground">
      {children}
    </p>
  )
}

export function EntryTags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-border px-2 py-0.75 font-mono text-[11px] text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
