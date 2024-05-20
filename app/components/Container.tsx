import type { HTMLAttributes } from "react"
import { forwardRef } from "react"
import { cx } from "~/utils/cva"

type ContainerProps = HTMLAttributes<HTMLDivElement>

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div ref={ref} className={cx("container mx-auto px-4 md:px-6 lg:px-8", className)} {...rest} />
  )
})

Container.displayName = "Container"
