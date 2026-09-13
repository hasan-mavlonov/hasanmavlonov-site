import { USER } from "@/features/portfolio/data/user"

const INITIALS = `${USER.firstName.at(0) ?? ""}${USER.lastName.at(0) ?? ""}`

/**
 * Square portrait above the eyebrow. Renders the photo when one is set, and
 * the initials on a tinted square until then, so the slot never disappears.
 */
export function HeroPortrait() {
  if (USER.photo) {
    return (
      <img
        className="mb-6 size-20 border border-border object-cover select-none md:mb-8 md:size-24"
        src={USER.photo}
        alt={USER.displayName}
        width={96}
        height={96}
        fetchPriority="high"
      />
    )
  }

  return (
    <div
      className="mb-6 flex size-20 items-center justify-center border border-border bg-muted/60 select-none md:mb-8 md:size-24"
      role="img"
      aria-label={USER.displayName}
    >
      <span className="font-display text-2xl font-semibold tracking-tight text-muted-foreground md:text-3xl">
        {INITIALS}
      </span>
    </div>
  )
}
