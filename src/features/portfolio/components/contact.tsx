import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { Button } from "@/components/base/ui/button"
import { Separator } from "@/components/base/ui/separator"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { LANGUAGES } from "@/features/portfolio/data/languages"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

import { ContactEmail } from "./contact-email"
import { Panel, PanelContent } from "./panel"

const SPOKEN = LANGUAGES.map(
  (language) => `${language.name} (${language.level})`
).join(" · ")

export function Contact() {
  return (
    <Panel>
      <h2 className="sr-only">Contact</h2>

      <PanelContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted-foreground">
          <span>{USER.address}</span>

          <Separator
            className="data-vertical:h-4 data-vertical:self-center"
            orientation="vertical"
            aria-hidden
          />

          <ContactEmail emailB64={USER.emailB64} />
        </div>

        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.name}>
              <Button
                className="text-foreground/80 shadow-none [&_svg:not([class*='size-'])]:size-4.5"
                variant="outline"
                size="icon-sm"
                nativeButton={false}
                render={
                  <a
                    href={addQueryParams(item.href, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                  >
                    {SOCIAL_ICONS[item.name]}
                    <span className="sr-only">{item.title}</span>
                  </a>
                }
              />
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground">{SPOKEN}</p>
      </PanelContent>
    </Panel>
  )
}
