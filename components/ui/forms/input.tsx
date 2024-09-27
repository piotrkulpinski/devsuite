import { type InputHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "border border-foreground/15 appearance-none text-base/tight bg-transparent text-foreground rounded-lg transition duration-150 placeholder:text-inherit placeholder:opacity-25 disabled:opacity-25",
    "resize-none [field-sizing:content]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/10 focus-visible:border-foreground/25 focus-visible:z-10",
  ],

  variants: {
    size: {
      sm: "px-2 py-1 text-[13px]/none font-normal rounded-md",
      md: "px-4 py-2",
      lg: "px-5 py-2.5",
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
