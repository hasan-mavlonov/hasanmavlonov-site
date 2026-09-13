import { USER } from "@/features/portfolio/data/user"

import { Avatar } from "./avatar"
import { FlipSentences } from "./flip-sentences"
import { IsometricMonogram } from "./isometric-monogram"
import { PronounceMyName } from "./pronounce-my-name"
import { TechnicalGrid } from "./technical-grid"

const INITIALS = `${USER.firstName.at(0) ?? ""}${USER.lastName.at(0) ?? ""}`

/**
 * The homepage hero. Always rendered on the dark navy scope (the `dark`
 * class) regardless of the visitor's chosen site theme — the one fixed
 * brand moment on an otherwise theme-aware page, in place of the licensed
 * video header this was originally modeled on.
 */
export function ProfileHeader() {
  return (
    <div className="dark screen-line-bottom relative isolate grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x bg-background screen-line-bottom-border text-foreground after:z-1">
      <TechnicalGrid className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-border" />

      <figure className="relative col-span-2 flex items-center justify-center p-2 sm:col-span-1 sm:col-start-2 sm:p-4">
        <IsometricMonogram className="h-28 w-auto text-foreground/40 sm:h-44" />
      </figure>

      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line">
          <Avatar
            className="mx-0.5 my-0.75"
            initials={INITIALS}
            name={USER.displayName}
            photo={USER.photo}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight">
              {USER.displayName}
            </h1>

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>
      </div>
    </div>
  )
}
