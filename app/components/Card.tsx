import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef, isValidElement } from "react"

import { type VariantProps, cva, cx } from "~/utils/cva"

export const cardVariants = cva({
  base: [
    "group/card relative flex flex-col gap-4 border rounded-lg p-6 overflow-clip transform-gpu",
    "hover:[&[href]]:ring-[3px] hover:[&[href]]:ring-card-dark hover:[&[href]]:border-border-dark",
  ],

  variants: {
    isFeatured: {
      true: "bg-card border-border-dark ring-[3px] ring-card-dark",
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
    <Component
      ref={ref}
      className={cx(cardVariants({ isFeatured, isRevealed, className }))}
      {...rest}
    />
  )
})

Card.displayName = "Card"
