import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { type VariantProps, cva, cx } from "~/utils/cva"

export const boxVariants = cva({
  base: "border border-foreground/15",

  variants: {
    hover: {
      true: "hover:ring-[3px] hover:ring-foreground/10 hover:border-foreground/30",
    },
    focus: {
      true: "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/10 focus-visible:border-foreground/25 focus-visible:z-10",
    },
    focusWithin: {
      true: "focus-within:outline-none focus-within:ring-[3px] focus-within:ring-foreground/10 focus-within:border-foreground/25 focus-within:z-10",
    },
  },
})

export type BoxProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof boxVariants>

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { hover, focus, focusWithin, className, ...rest } = props

  return (
    <Slot
      ref={ref}
      className={cx(boxVariants({ hover, focus, focusWithin, className }))}
      {...rest}
    />
  )
})

Box.displayName = "Box"
