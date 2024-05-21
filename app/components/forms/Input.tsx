import { type InputHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "border appearance-none text-base/tight bg-transparent text-foreground transition duration-200 placeholder:text-inherit placeholder:opacity-40 disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-card-dark focus-visible:border-border-dark focus-visible:z-10",
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
    hoverable: {
      true: "bg-background enabled:cursor-pointer enabled:hover:bg-card enabled:hover:border-border-dark",
    },
  },

  defaultVariants: {
    size: "md",
    shape: "square",
    hoverable: false,
  },
})

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, size, shape, hoverable, ...rest } = props

  return (
    <input
      ref={ref}
      className={cx(inputVariants({ size, shape, hoverable, className }))}
      {...rest}
    />
  )
})

Input.displayName = "Input"
