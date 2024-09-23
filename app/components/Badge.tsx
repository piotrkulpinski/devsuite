import { Slot } from "@radix-ui/react-slot"
import { type HTMLAttributes, isValidElement } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const badgeVariants = cva({
  base: "flex items-center gap-1 rounded",

  variants: {
    variant: {
      soft: "bg-foreground/5 hover:[&[href]]:bg-foreground/10",
      outline: "ring-1 ring-foreground/15 bg-background/25 hover:[&[href]]:ring-foreground/25",
      ghost: "bg-transparent !p-0",
    },
    size: {
      sm: "px-1 py-px text-[10px]/tight",
      md: "px-1.5 py-[3px] text-xs/tight",
      lg: "px-2 py-1 text-sm/tight",
    },
  },

  defaultVariants: {
    variant: "soft",
    size: "md",
  },
})

type BadgeProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof badgeVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Badge = ({ className, asChild, variant, size, ...props }: BadgeProps) => {
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "span"

  return <Component className={cx(badgeVariants({ variant, size, className }))} {...props} />
}
