import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef, isValidElement } from "react"

import { Box, type BoxProps } from "~/components/ui/box"
import { Stars } from "~/components/ui/stars"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const cardVariants = cva({
  base: "group/card relative w-full flex flex-col items-start gap-4 rounded-lg p-6 backdrop-blur-lg transform-gpu",

  variants: {
    isFeatured: {
      true: "",
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
  BoxProps &
  VariantProps<typeof cardVariants> & {
    /**
     * If card to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, hover = true, focus = true, asChild, isFeatured, isRevealed, ...rest } = props
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return (
    <Box hover={hover} focus={focus}>
      <Component
        ref={ref}
        className={cx(cardVariants({ isFeatured, isRevealed, className }))}
        {...rest}
      />
    </Box>
  )
})

Card.displayName = "Card"

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <p
      className={cx("-tracking-0.5 line-clamp-2 text-sm/normal text-foreground/65", className)}
      {...props}
    />
  )
}

CardDescription.displayName = "CardDescription"

export const CardStars = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return <Stars className={cx("absolute inset-y-0 -inset-x-12 -z-10", className)} {...props} />
}
CardStars.displayName = "CardStars"
