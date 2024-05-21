import { type HTMLAttributes } from "react"
import { cx } from "~/utils/cva"
import { Container } from "~/components/Container"
import { Logo } from "~/components/Logo"

export const Footer = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cx("relative z-20 w-full py-4 border-t border-t-border/50", className)}
      {...props}
    >
      <Container className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6">
        <Logo />

        <p className="text-xs text-muted">This site may contain affiliate links.</p>
      </Container>
    </div>
  )
}
