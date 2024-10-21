import { type InputHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "border border-foreground/15 appearance-none min-h-0 bg-transparent text-foreground rounded-lg transition duration-150 placeholder:text-inherit placeholder:opacity-50 disabled:opacity-25",
    "resize-none [field-sizing:content]",
  ],

  variants: {
    size: {
      sm: "px-2 py-0.5 text-[13px]/normal rounded-md",
      md: "px-3 py-1 text-[13px]/normal rounded-md",
      lg: "px-4 py-2.5 text-sm/normal rounded-lg",
    },
    hover: {
      true: "enabled:cursor-pointer enabled:hover:ring-[3px] enabled:hover:ring-foreground/10 enabled:hover:border-foreground/25",
    },
    focus: {
      true: "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-foreground/10 focus-visible:border-foreground/25 focus-visible:z-10",
    },
  },

  defaultVariants: {
    size: "md",
    hover: false,
    focus: true,
  },
})

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, hover, focus, ...rest } = props

  return (
    <input ref={ref} className={cx(inputVariants({ size, hover, focus, className }))} {...rest} />
  )
})

Input.displayName = "Input"
