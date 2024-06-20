import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { type VariantProps, cva, cx } from "~/utils/cva"

export const boxVariants = cva({
  base: [
    "border border-foreground/15",
    "hover:[&[href]]:ring-[3px] hover:[&[href]]:ring-foreground/10 hover:[&[href]]:border-foreground/30",
    "group-hover-[&[href]]:ring-[3px] group-hover-[&[href]]:ring-foreground/10 group-hover-[&[href]]:border-foreground/30",
    "hover:[&[type]]:ring-[3px] hover:[&[type]]:ring-foreground/10 hover:[&[type]]:border-foreground/30",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/10 focus-visible:border-foreground/25 focus-visible:z-10",
  ],
})

type BoxProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof boxVariants>

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ className, ...props }, ref) => {
  return <Slot ref={ref} className={cx(boxVariants({ className }))} {...props} />
})

Box.displayName = "Box"
