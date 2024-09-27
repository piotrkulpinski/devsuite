import { Slot } from "@radix-ui/react-slot"
import { LoaderIcon } from "lucide-react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Children, forwardRef, isValidElement } from "react"
import { Box } from "~/components/ui/box"
import { Slottable } from "~/components/ui/slottable"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const buttonVariants = cva({
  base: [
    "group/button relative inline-flex items-center justify-center font-medium -tracking-micro rounded-lg",
    "disabled:opacity-60 disabled:pointer-events-none",
  ],

  variants: {
    variant: {
      fancy:
        "border-0 bg-gradient-to-br from-[#6B5298]/75 to-[#31236F]/75 text-white hover:!ring-[#6B5298]/25",
      primary: "border-0 text-background bg-foreground hover:opacity-90",
      secondary: "",
    },
    size: {
      sm: "text-xs/none gap-[0.5ch] py-1.5 px-2.5",
      md: "text-sm/tight gap-[0.75ch] py-1.5 px-3",
      lg: "text-base/tight gap-[1ch] py-2 px-5",
    },
    isAffixOnly: {
      true: "",
    },
    isPending: {
      true: "[&>*:not(.animate-spin)]:text-transparent select-none",
    },
  },

  compoundVariants: [
    // Is affix only
    { size: "sm", isAffixOnly: true, class: "px-1" },
    { size: "md", isAffixOnly: true, class: "px-1.5" },
    { size: "lg", isAffixOnly: true, class: "px-2" },
  ],

  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
})

export const buttonAffixVariants = cva({
  base: "shrink-0 size-[1.1em] group-hover/button:last:rotate-12",
})

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "prefix"> &
  Omit<VariantProps<typeof buttonVariants>, "isAffixOnly"> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean

    /**
     * If set to `true`, the button will be rendered in the pending state.
     */
    isPending?: boolean

    /**
     * The slot to be rendered before the label.
     */
    prefix?: ReactNode

    /**
     * The slot to be rendered after the label.
     */
    suffix?: ReactNode
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    asChild,
    isPending,
    prefix,
    suffix,
    variant,
    size,
    ...rest
  } = props

  const isChildrenEmpty = (children: ReactNode) => {
    return Children.count(children) === 0
  }

  const useAsChild = asChild && isValidElement(children)
  const Component = useAsChild ? Slot : "button"

  // Determine if the button has affix only.
  const isAffixOnly = isChildrenEmpty(children) && (!prefix || !suffix)

  return (
    <Box hover focus>
      <Component
        ref={ref}
        disabled={disabled ?? isPending}
        className={cx(buttonVariants({ variant, size, isAffixOnly, isPending, className }))}
        {...rest}
      >
        <Slottable child={children} asChild={asChild}>
          {child => (
            <>
              <Slot className={buttonAffixVariants()}>{prefix}</Slot>
              {!isChildrenEmpty(child) && <span className="truncate">{child}</span>}
              <Slot className={buttonAffixVariants()}>{suffix}</Slot>

              {!!isPending && <LoaderIcon className="absolute size-[1.25em] animate-spin" />}
            </>
          )}
        </Slottable>
      </Component>
    </Box>
  )
})

Button.displayName = "Button"
