export type User = {
  firstName: string
  lastName: string
  /** Preferred public-facing name */
  displayName: string
  /** Handle/username used in links or mentions */
  username: string
  /** Omit to leave gender and pronouns off the profile. */
  gender?: "male" | "female" | "non-binary"
  /** e.g. "he/him", "she/her", "they/them" */
  pronouns?: string
  bio: string
  /** One-line thesis under the name in the hero, set in the display face. */
  statement: string
  /** Supporting sentence under the statement. */
  subtitle: string
  /** General location for display */
  address: string
  /** E.164 format, base64 encoded. Omit to hide the phone row. */
  phoneNumberB64?: string
  /** base64 encoded (https://t.io.vn/base64-string-converter) */
  emailB64: string
  /** Personal/homepage URL */
  website: string
  /** Primary/current role shown on profile */
  jobTitle: string
  /** Work history entries */
  jobs: {
    title: string
    company: string
    /** Omit when `experienceId` links to an on-page section instead. */
    website?: string
    experienceId?: string
  }[]
  /** Rich about section; supports Markdown */
  about: string
  /** Public URL or /public path to the avatar image */
  avatar: string
  /** Portrait for the hero; omit to show initials. */
  photo?: string
  /** Open Graph image URL for social sharing */
  ogImage: string
  /** Audio URL for name pronunciation. Omit to hide the play button. */
  namePronunciationUrl?: string
  /** SEO keywords list for metadata */
  keywords: string[]
  /** Time zone in IANA format (e.g., "Asia/Shanghai") */
  timeZone: string
  /** Profile/site start date in YYYY-MM-DD */
  dateCreated: string
}
