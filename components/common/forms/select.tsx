import { type SelectHTMLAttributes, forwardRef } from "react"
import { inputVariants } from "~/components/common/forms/input"
import { type VariantProps, cx } from "~/utils/cva"

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> &
  VariantProps<typeof inputVariants>

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, size, ...rest } = props

  return (
    <select ref={ref} className={cx(inputVariants({ size, hover: true, className }))} {...rest} />
  )
})

Select.displayName = "Input"
