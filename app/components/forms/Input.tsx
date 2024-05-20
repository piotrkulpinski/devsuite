import { type InputHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const inputVariants = cva({
  base: [
    "rounded-full border appearance-none px-5 py-2.5 text-base/tight bg-background text-foreground transition duration-200 placeholder:text-inherit placeholder:text-muted disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-border focus-visible:border-border-dark focus-visible:z-10",
  ],

  variants: {
    hoverable: {
      true: "bg-background enabled:cursor-pointer enabled:hover:bg-card enabled:hover:border-border-dark",
    },
  },
})

export type InputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, hoverable, ...rest } = props

  return <input ref={ref} className={cx(inputVariants({ hoverable, className }))} {...rest} />
})

Input.displayName = "Input"
