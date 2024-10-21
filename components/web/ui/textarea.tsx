import { type TextareaHTMLAttributes, forwardRef } from "react"
import { inputVariants } from "~/components/web/ui/input"
import { type VariantProps, cx } from "~/utils/cva"

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof inputVariants>

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, ...rest } = props

  return <textarea ref={ref} className={cx(inputVariants({ className }))} {...rest} />
})

Textarea.displayName = "Textarea"
