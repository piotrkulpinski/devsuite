import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef, isValidElement } from "react"

import { type VariantProps, cva, cx } from "~/utils/cva"
import { Box } from "./Box"

export const cardVariants = cva({
  base: "group/card relative w-full flex flex-col gap-4 rounded-lg p-6 overflow-clip transform-gpu",

  variants: {
    isFeatured: {
      true: "bg-foreground/10 border-foreground/25 ring-[3px] ring-foreground/10",
    },
    isRevealed: {
      true: "animate-reveal",
    },
  },

  defaultVariants: {
    isFeatured: false,
    isRevealed: true,
  },
})

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    /**
     * If card to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, asChild, isFeatured, isRevealed, ...rest } = props
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return (
    <Box>
      <Component
        ref={ref}
        className={cx(cardVariants({ isFeatured, isRevealed, className }))}
        {...rest}
      />
    </Box>
  )
})

Card.displayName = "Card"
