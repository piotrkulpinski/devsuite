import { Slot } from "@radix-ui/react-slot"
import { LoaderIcon } from "lucide-react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Children, forwardRef, isValidElement } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"
import { Slottable } from "./Slottable"

export const buttonVariants = cva({
  base: [
    "group relative inline-flex items-center justify-center font-medium -tracking-micro rounded-full",
    "hover:ring-[3px]",
    "disabled:opacity-60 disabled:pointer-events-none",
  ],

  variants: {
    variant: {
      fancy: "bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:ring-blue-500/25",
      primary: "text-background bg-foreground hover:opacity-90 hover:ring-border",
      secondary:
        "border bg-background text-foreground hover:bg-card hover:border-border-dark hover:ring-border",
    },
    size: {
      sm: "text-sm/none gap-[0.5ch] py-1 px-2",
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
  base: "shrink-0 size-[1.1em]",
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
    <Component
      ref={ref}
      disabled={disabled ?? isPending}
      className={cx(buttonVariants({ variant, size, isAffixOnly, isPending, className }))}
      {...rest}
    >
      <Slottable child={children} asChild={asChild}>
        {(child) => (
          <>
            <Slot className={buttonAffixVariants()}>{prefix}</Slot>
            {!isChildrenEmpty(child) && <span className="truncate">{child}</span>}
            <Slot className={buttonAffixVariants()}>{suffix}</Slot>

            {!!isPending && <LoaderIcon className="absolute size-[1.25em] animate-spin" />}
          </>
        )}
      </Slottable>
    </Component>
  )
})

Button.displayName = "Button"