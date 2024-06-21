import { type InputHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "border border-foreground/15 appearance-none text-base/tight bg-background text-foreground transition duration-200 placeholder:text-inherit placeholder:opacity-50 disabled:opacity-50",
    "resize-none [field-sizing:content]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/10 focus-visible:border-foreground/30 focus-visible:z-10",
    "dark:bg-transparent",
  ],

  variants: {
    size: {
      md: "px-4 py-2",
      lg: "px-5 py-2.5",
    },
    shape: {
      rounded: "rounded-full",
      square: "rounded-md",
    },
  },

  defaultVariants: {
    size: "md",
    shape: "square",
  },
})

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, shape, ...rest } = props

  return <input ref={ref} className={cx(inputVariants({ size, shape, className }))} {...rest} />
})

Input.displayName = "Input"
