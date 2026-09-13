import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * The portrait disc. Falls back to the initials when there is no photo, so the
 * header keeps its shape either way.
 */
export function Avatar({
  initials,
  name,
  photo,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  initials: string
  name: string
  photo?: string
}) {
  return (
    <div
      className={cn(
        "relative flex size-30 items-center justify-center overflow-hidden rounded-full bg-foreground/5 select-none min-[24rem]:size-32 sm:size-40",
        className
      )}
      role="img"
      aria-label={name}
      {...props}
    >
      {photo ? (
        <Image
          alt=""
          className="size-full object-cover"
          height={320}
          priority
          src={photo}
          width={320}
        />
      ) : (
        <span className="text-[2.25rem]/none font-medium tracking-tight text-muted-foreground sm:text-[3rem]/none">
          {initials}
        </span>
      )}

      <div
        className="pointer-events-none absolute inset-0 rounded-full inset-ring-1 inset-ring-foreground/10"
        aria-hidden
      />
    </div>
  )
}
