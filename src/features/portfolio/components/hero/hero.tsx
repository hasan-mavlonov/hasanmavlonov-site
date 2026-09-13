import { urlToName } from "@/utils/url"

import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

import { HeroEmail } from "./hero-email"
import { HeroPortrait } from "./hero-portrait"
import { TraitInstrument } from "./trait-instrument"

/**
 * "Split instrument" hero: the statement on the left, the live OCEAN trait
 * instrument on the right as evidence, and contact above the fold. Nothing
 * here transforms on scroll; the hero simply leaves.
 */
export function Hero() {
  return (
    <section
      data-slot="hero"
      className="screen-line-bottom border-x screen-line-bottom-border after:z-1"
    >
      <div className="grid gap-x-[72px] gap-y-8 px-5 pt-14 pb-10 md:px-8 md:pt-24 md:pb-16 lg:grid-cols-[7fr_5fr]">
        <div className="min-w-0">
          <HeroPortrait />

          <p className="mb-6 type-label text-[11px] text-brand md:mb-8 md:text-xs md:tracking-[0.16em]">
            {USER.jobTitle} · {USER.address}
          </p>

          <h1 className="mb-5 font-display text-[clamp(44px,13.3vw,52px)]/[0.94] font-bold tracking-[-0.035em] text-balance md:mb-7 md:text-[96px]/[0.92] md:tracking-[-0.04em]">
            {USER.firstName}
            <br />
            {USER.lastName}
          </h1>

          <p className="mb-5 max-w-[21ch] font-display text-2xl/[1.25] font-medium tracking-[-0.02em] text-balance md:mb-9 md:text-4xl/[1.2] md:tracking-[-0.025em]">
            {USER.statement}
          </p>

          <p className="max-w-[46ch] text-[15px]/[1.55] text-muted-foreground md:text-[17px]/[1.55]">
            {USER.subtitle}
          </p>
        </div>

        {/* One instrument: under the sub on small screens, the right column
            from lg up, by grid placement rather than a duplicate. */}
        <TraitInstrument className="lg:col-start-2 lg:row-start-1 lg:self-start" />
      </div>

      <dl className="mx-5 grid grid-cols-2 gap-px border-y border-line bg-line md:mx-8 md:grid-cols-4">
        <ContactCell label="Email">
          <HeroEmail emailB64={USER.emailB64} />
        </ContactCell>
        <ContactCell label="Code">
          <ContactLink href={SOCIAL.github.href}>
            {urlToName(SOCIAL.github.href)}
          </ContactLink>
        </ContactCell>
        <ContactCell label="Research">
          <ContactLink href={SOCIAL.huggingface.href}>
            huggingface.co/{SOCIAL.huggingface.handle}
          </ContactLink>
        </ContactCell>
        <ContactCell label="Also">
          <ContactLink href={SOCIAL.x.href}>{SOCIAL.x.handle}</ContactLink>
          <span className="text-muted-foreground"> · B.Sc. AI, ECUST</span>
        </ContactCell>
      </dl>
    </section>
  )
}

function ContactCell({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-11 flex-col justify-center bg-background px-4 py-3.5 md:px-0 md:py-5 md:not-first:pl-5 md:first:pl-0">
      <dt className="mb-1.5 type-label text-[10.5px] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm md:text-base">{children}</dd>
    </div>
  )
}

function ContactLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      className="text-brand link hover:text-brand-hover"
      href={href}
      target="_blank"
      rel="noopener"
    >
      {children}
    </a>
  )
}
