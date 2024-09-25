import type { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"

export const Hint = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return <p className={cx("mt-1 text-xs text-red-600", className)} {...props} />
}
