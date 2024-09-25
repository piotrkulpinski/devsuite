import type { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cx("block animate-pulse rounded-md bg-foreground/10", className)} {...props} />
  )
}
