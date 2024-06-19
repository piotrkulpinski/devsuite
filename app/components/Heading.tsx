import { Slot } from "@radix-ui/react-slot"
import { type ElementType, type HTMLAttributes, forwardRef, isValidElement } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const headingVariants = cva({
  base: "text-foreground font-display font-[599] tracking-micro",

  variants: {
    size: {
      h1: "text-3xl md:text-4xl lg:text-5xl",
      h2: "text-2xl md:text-3xl lg:text-4xl",
      h3: "text-2xl lg:text-3xl",
      h4: "text-xl lg:text-2xl font-medium",
      h5: "text-base lg:text-lg font-medium",
      h6: "text-sm font-medium",
    },
  },

  defaultVariants: {
    size: "h3",
  },
})

export type HeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, "size"> &
  VariantProps<typeof headingVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    as?: ElementType

    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { className, as, asChild, size, ...rest } = props

  const useAsChild = asChild && isValidElement(rest.children)
  const Comp = useAsChild ? Slot : as ?? size ?? "h2"

  return <Comp ref={ref} className={cx(headingVariants({ size, className }))} {...rest} />
})

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading ref={ref} size="h1" {...props} />
})

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading ref={ref} size="h2" {...props} />
})

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading ref={ref} size="h3" {...props} />
})

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading ref={ref} size="h4" {...props} />
})

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading ref={ref} size="h5" {...props} />
})

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading ref={ref} size="h6" {...props} />
})

Heading.displayName = "Heading"
H1.displayName = "H1"
H2.displayName = "H2"
H3.displayName = "H3"
H4.displayName = "H4"
H5.displayName = "H5"
H6.displayName = "H6"
