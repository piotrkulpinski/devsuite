import type { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"

export const Wrapper = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return <div className={cx("w-full max-w-screen-sm mx-auto", className)} {...props} />
}
