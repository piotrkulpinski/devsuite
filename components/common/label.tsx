"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const labelVariants = cva({
  base: "block self-start text-sm font-semibold text-foreground [&[for]]:cursor-pointer",

  variants: {
    isRequired: {
      true: "after:ml-0.5 after:text-red-500/75 after:content-['*']",
    },
  },
})

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, isRequired, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cx(labelVariants({ isRequired, className }))}
      aria-label="Label"
      {...props}
    />
  )
})
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
