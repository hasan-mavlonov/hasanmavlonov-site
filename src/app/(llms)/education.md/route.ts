import { EDUCATION } from "@/features/portfolio/data/education"

const content = `# Education

${EDUCATION.map((item) => {
  const heading =
    [item.degree, item.fieldOfStudy].filter(Boolean).join(", ") || item.school
  const school = heading === item.school ? "" : ` | ${item.school}`
  const period = item.period
    ? `\n\n${item.period.start} - ${item.period.end || "Present"}`
    : ""
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `## ${heading}${school}${period}${description}`
}).join("\n\n")}
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
