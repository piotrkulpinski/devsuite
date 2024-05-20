import { type HTMLAttributes } from "react"
import { cx } from "~/utils/cva"
import { Container } from "~/components/Container"

export const Footer = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cx("sticky top-0 z-10 w-full mb-12 py-4 border-t", className)} {...props}>
      <Container className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6"></Container>
    </div>
  )
}
