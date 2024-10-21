import { Slot } from "@radix-ui/react-slot"
import { LoaderIcon } from "lucide-react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Children, forwardRef, isValidElement } from "react"
import { Box } from "~/components/common/box"
import { Slottable } from "~/components/common/slottable"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const buttonVariants = cva({
  base: [
    "group/button relative max-w-80 inline-flex items-center justify-center font-display font-semibold text-left -tracking-micro rounded-md",
    "disabled:opacity-60 disabled:pointer-events-none",
  ],

  variants: {
    variant: {
      primary: "border-transparent text-background bg-foreground opacity-90 hover:opacity-100",
      secondary: "hover:text-foreground",
    },
    size: {
      sm: "px-2 py-0.5 gap-[0.66ch] text-[13px]/normal",
      md: "px-3 py-1 gap-[0.75ch] text-[13px]/normal",
      lg: "px-4 py-2 gap-[1ch] text-[13px]/normal sm:text-sm/normal",
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
  base: "shrink-0 size-[1.1em] my-[0.2em]",
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
              {!isChildrenEmpty(child) && (
                <span className="flex-1 truncate only:text-center">{child}</span>
              )}
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
