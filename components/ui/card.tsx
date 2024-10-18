import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef, isValidElement } from "react"

import { Box, type BoxProps } from "~/components/ui/box"
import { H3 } from "~/components/ui/heading"
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

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx("flex flex-col space-y-1.5 p-4 md:p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ ...props }, ref) => <H3 ref={ref} {...props} />,
)
CardTitle.displayName = "CardTitle"

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <p
      className={cx("-tracking-0.5 line-clamp-2 text-sm/normal text-foreground/65", className)}
      {...props}
    />
  )
}

CardDescription.displayName = "CardDescription"

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx("p-4 pt-0 md:p-6 md:pt-0", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("flex items-center p-4 pt-0 md:p-6 md:pt-0", className)}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"

export const CardStars = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return <Stars className={cx("absolute inset-0 -z-10", className)} {...props} />
}
CardStars.displayName = "CardStars"
