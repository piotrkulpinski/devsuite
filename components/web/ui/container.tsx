import type { HTMLAttributes } from "react"
import { forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

const containerVariants = cva({
  base: "relative w-full mx-auto px-6 lg:px-8",

  variants: {
    size: {
      sm: "max-w-screen-md",
      md: "max-w-screen-lg",
      lg: "max-w-screen-xl",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

type ContainerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof containerVariants>

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { className, size, ...rest } = props

  return <div ref={ref} className={cx(containerVariants({ size, className }))} {...rest} />
})

Container.displayName = "Container"
