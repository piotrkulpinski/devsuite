import { type HTMLAttributes, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const Hint = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cx("-mt-1 text-xs font-medium text-red-500/75", className)}
        {...props}
      />
    )
  },
)
