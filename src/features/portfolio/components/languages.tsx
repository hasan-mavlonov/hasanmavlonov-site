import { LanguagesIcon } from "lucide-react"

import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/base/ui/separator"
import { LANGUAGES } from "@/features/portfolio/data/languages"

import { Panel, PanelHeader, PanelTitle } from "./panel"
import { PanelTitleCopy } from "./panel-title-copy"

const ID = "languages"

export function Languages() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Languages</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <dl>
        {LANGUAGES.map((language) => (
          <div
            key={language.name}
            className="screen-line-bottom flex items-center"
          >
            <IconTile className="mx-4">
              <LanguagesIcon />
            </IconTile>

            <div className="flex flex-1 items-center gap-2 border-l border-dashed border-line p-4 pr-2">
              <dt className="flex-1 font-medium">{language.name}</dt>

              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />

              <dd className="text-sm text-muted-foreground">
                {language.level}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </Panel>
  )
}
