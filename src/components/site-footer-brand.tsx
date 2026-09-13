const VIEWBOX_WIDTH = 1410
const VIEWBOX_HEIGHT = 258

/**
 * Oversized site title along the footer's bottom rule. Static by design: the
 * only fill is a fixed foreground tint, so nothing here moves.
 */
export function SiteFooterInteractiveLogotype({ text }: { text: string }) {
  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div className="overflow-hidden">
        <div className="flex w-full translate-y-[37.5%] items-center justify-center">
          <svg
            className="container size-full"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={text}
          >
            {/* textLength pins the wordmark to the viewBox, so the same markup
                works for any site title without re-measuring the glyphs. */}
            <text
              x="0"
              y="210"
              textLength={VIEWBOX_WIDTH}
              lengthAdjust="spacingAndGlyphs"
              className="fill-foreground/10 stroke-foreground/15 font-display font-bold"
              fontSize="232"
              strokeWidth="2"
            >
              {text}
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
