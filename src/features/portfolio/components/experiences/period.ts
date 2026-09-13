import { differenceInMonths, parse } from "date-fns"

/** "MM.YYYY" or "YYYY" in, "1y 3m" style out; empty when the span is not positive. */
export function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    return years <= 0 ? "" : `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()
  // +1 counts both the start and end months inclusively.
  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) return ""
  if (totalMonths < 12) return `${totalMonths}m`

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return months === 0 ? `${years}y` : `${years}y ${months}m`
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) return parse(str, "MM.yyyy", new Date())
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}

/** "MM.YYYY" -> "YYYY", "YYYY" unchanged. Gutter dates read as years. */
export function periodYear(value: string) {
  return value.includes(".") ? value.split(".")[1] : value
}
