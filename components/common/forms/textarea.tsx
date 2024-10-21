import { type TextareaHTMLAttributes, forwardRef } from "react"
import { inputVariants } from "~/components/common/forms/input"
import { type VariantProps, cx } from "~/utils/cva"

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof inputVariants>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, ...rest } = props

  return <textarea ref={ref} className={cx(inputVariants({ className }))} {...rest} />
})

TextArea.displayName = "TextArea"
