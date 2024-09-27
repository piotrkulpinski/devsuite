import { type InputHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "border border-foreground/15 appearance-auto min-h-0 bg-transparent text-foreground rounded-lg transition duration-150 placeholder:text-inherit placeholder:opacity-25 disabled:opacity-25",
    "resize-none [field-sizing:content]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/10 focus-visible:border-foreground/25 focus-visible:z-10",
  ],

  variants: {
    size: {
      sm: "px-2 py-0.5 text-[13px]/normal rounded-md",
      md: "px-3 py-1 text-[13px]/normal rounded-md",
      lg: "px-4 py-2.5 text-sm/normal rounded-lg",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, ...rest } = props

  return <input ref={ref} className={cx(inputVariants({ size, className }))} {...rest} />
})

Input.displayName = "Input"
