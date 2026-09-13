import { USER } from "@/features/portfolio/data/user"

/**
 * A ticker of the brand adjectives, always rendered on the dark navy scope
 * (see the `dark` class below) regardless of the visitor's chosen site
 * theme — a fixed signature moment rather than something that flips with
 * light/dark mode.
 */
export function TraitsMarquee() {
  return (
    <div className="dark screen-line-bottom overflow-hidden border-x bg-background screen-line-bottom-border">
      <p className="sr-only">{USER.traits.join(", ")}</p>

      <div
        className="flex w-max animate-marquee items-center py-2.5 hover:[animation-play-state:paused] motion-reduce:animate-none"
        aria-hidden
      >
        {[0, 1].map((rep) => (
          <ul className="flex shrink-0 items-center" key={rep}>
            {USER.traits.map((trait) => (
              <li
                className="flex items-center gap-6 pr-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"
                key={trait}
              >
                {trait}
                <span className="text-border">·</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
