export type ExperiencePosition = {
  id: string
  title: string
  /**
   * Employment period of the position.
   * Use "MM.YYYY" or "YYYY" format. Omit `end` for current roles.
   */
  employmentPeriod: {
    /** Start date (e.g., "10.2022" or "2020"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** Full-time | Part-time | Contract | Internship, etc. */
  employmentType?: string
  description?: string
  /** UI icon to represent the role type. */
  icon?: React.ReactElement
  skills?: string[]
  /** Whether the position is expanded by default in the UI. */
  isExpanded?: boolean
}

/** An investor or programme backing a company, drawn as its own mark. */
export type ExperienceBacker = {
  /** Accessible name for the artwork. */
  name: string
  /** Path under /public to the backer's own, unaltered artwork. */
  src: string
  /** Intrinsic size of the artwork, so the row reserves the right space. */
  width: number
  height: number
  /**
   * Text drawn beside the mark. Omitted for artwork that already carries the
   * backer's name, which is instead drawn larger so its wordmark stays legible.
   */
  caption?: string
}

export type Experience = {
  id: string
  companyName: string
  /** URL to the company logo (absolute URL or path under /public). */
  companyLogo?: string
  /** UI icon to represent the company; used if `companyLogo` is not provided. */
  companyIcon?: React.ReactElement
  /** URL to the company's website. */
  companyWebsite?: string
  /**
   * Base64-encoded contact address for this company, shown under the company
   * name. Encoded for the same reason as `User.emailB64`: the plaintext never
   * reaches the served HTML.
   */
  emailB64?: string
  location?: string
  locationType?: "On-site" | "Hybrid" | "Remote"
  /** Roles held at this company; keep newest first for display. */
  positions: ExperiencePosition[]
  /** Investors and programmes backing this company. */
  backers?: ExperienceBacker[]
  /** Marks the company as the current employer for highlighting. */
  isCurrentEmployer?: boolean
}
