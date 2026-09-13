import { cn } from "@/lib/utils"

/**
 * The name set as a script signature that writes itself in once, left to
 * right. The reveal is a pure CSS clip on a text node, so it needs no client
 * boundary and starts without waiting for hydration.
 */
export function Signature({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "animate-signature-draw font-handwritten text-signature select-none motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
}
