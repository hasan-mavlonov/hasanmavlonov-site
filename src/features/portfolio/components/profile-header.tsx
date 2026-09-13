import { USER } from "@/features/portfolio/data/user"

import { Avatar } from "./avatar"
import { FlipSentences } from "./flip-sentences"
import { PronounceMyName } from "./pronounce-my-name"
import { ReachPlate } from "./reach-plate"
import { Signature } from "./signature"

const INITIALS = `${USER.firstName.at(0) ?? ""}${USER.lastName.at(0) ?? ""}`

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x screen-line-bottom-border after:z-1">
      <figure className="relative col-span-2 flex items-center justify-center gap-4 p-2 sm:col-span-1 sm:col-start-2 sm:p-4 sm:pr-12">
        <ReachPlate className="hidden h-24 w-auto max-w-[40%] shrink sm:block" />

        <Signature className="text-[2.25rem]/none min-[24rem]:text-[2.75rem]/none sm:text-[3.25rem]/none">
          {USER.displayName}
        </Signature>

        <figcaption className="pointer-events-none absolute right-2 bottom-2 text-sm leading-none tracking-wide text-[color-mix(in_oklab,var(--muted-foreground)_60%,var(--background))] tabular-nums select-none sm:right-4 sm:bottom-4">
          Fig. 1.
        </figcaption>
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
