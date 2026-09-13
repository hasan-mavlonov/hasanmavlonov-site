export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string
  title: string
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /** Public URL (site, repository, demo, or video). */
  link: string
  /** Tags/technologies for chips or filtering. */
  skills: string[]
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string
  /** Logo image URL (absolute or path under /public). Takes precedence over `icon`. */
  logo?: string
  /** Inline SVG icon, framed in a tile. Used only when `logo` is unset. */
  icon?: React.ReactElement
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean
  /** Who the project belongs to, shown as a mono caption under the name. */
  owner?: string
  /** Your role on it, shown as a bordered chip. */
  role?: string
  /** Status word for the index strip, e.g. "live", "shipped", "research". */
  status?: string
  /** Named actions; the first is primary. Defaults to a single "Open" on `link`. */
  actions?: { label: string; href: string }[]
}
