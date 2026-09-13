import { cn } from "@/lib/utils"

/**
 * Placeholder for a portrait: the initials on a tinted disc, sized to match the
 * photo it stands in for. Swap this out for an <img> once a photo exists.
 */
export function InitialsAvatar({
  initials,
  name,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  initials: string
  name: string
}) {
  return (
    <div
      className={cn(
        "relative flex size-30 items-center justify-center rounded-full bg-foreground/5 select-none min-[24rem]:size-32 sm:size-40",
        className
      )}
      role="img"
      aria-label={name}
      {...props}
    >
      <span className="text-[2.25rem]/none font-medium tracking-tight text-muted-foreground sm:text-[3rem]/none">
        {initials}
      </span>

      <div
        className="pointer-events-none absolute inset-0 rounded-full inset-ring-1 inset-ring-foreground/10"
        aria-hidden
      />
    </div>
  )
}
