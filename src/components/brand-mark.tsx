/**
 * "HM" monogram: two slab letterforms on a 448x256 canvas. The M is a single
 * outline rather than stacked rectangles so the vee stays legible at favicon
 * sizes, where a stepped approximation reads as a notch instead of a letter.
 */
const MARK_PATH =
  "M0 0h56v256H0zM56 100h56v56H56zM112 0h56v256h-56zM224 0h56l56 120 56-120h56v256h-56V96l-36 84h-40l-36-84v160h-56z"

export function BrandMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 448 256"
      aria-hidden
      {...props}
    >
      <path fill="currentColor" d={MARK_PATH} />
    </svg>
  )
}

export function getBrandMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 448 256"><path fill="currentColor" d="${MARK_PATH}"/></svg>`
}
