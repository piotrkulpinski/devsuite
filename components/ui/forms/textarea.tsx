import { type TextareaHTMLAttributes, forwardRef } from "react"
import { inputVariants } from "~/components/ui/forms/input"
import { type VariantProps, cx } from "~/utils/cva"

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof inputVariants>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <textarea ref={ref} className={cx("!leading-normal", inputVariants({ className }))} {...rest} />
  )
})

TextArea.displayName = "TextArea"
