import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef, isValidElement } from "react"

import { type VariantProps, cva, cx } from "~/utils/cva"

const stackVariants = cva({
  base: "flex",

  variants: {
    size: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-x-3 gap-y-2",
      lg: "gap-x-4 gap-y-3",
    },
    direction: {
      row: "flex-row flex-wrap items-center",
      column: "flex-col items-start",
    },
  },

  defaultVariants: {
    size: "md",
    direction: "row",
  },
})

type StackProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof stackVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { className, asChild, size, direction, ...rest } = props
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return (
    <Component ref={ref} className={cx(stackVariants({ size, direction, className }))} {...rest} />
  )
})

Stack.displayName = "Stack"
