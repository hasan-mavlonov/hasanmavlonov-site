import { LANGUAGES } from "../data/languages"
import { Panel, PanelHeader, PanelTitle } from "./panel"
import { PanelTitleCopy } from "./panel-title-copy"

const ID = "languages"

/** Two-column tabular rows: name on the left, level on the right. No prose. */
export function Languages() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Languages</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-8">
        {LANGUAGES.map((language, index) => (
          <div
            key={language.name}
            className="col-span-2 grid grid-cols-subgrid items-baseline border-b border-line px-4 py-3.5 last:border-none"
          >
            <dt className="flex items-baseline gap-3">
              <span
                className="font-mono text-xs text-muted-foreground/80 select-none"
                aria-hidden
              >
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="font-medium">{language.name}</span>
            </dt>
            <dd className="text-right type-label text-muted-foreground">
              {language.level}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  )
}
