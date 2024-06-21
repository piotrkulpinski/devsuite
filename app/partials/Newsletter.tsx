import { type HTMLAttributes } from "react"
import { Card } from "~/components/Card"
import { H3 } from "~/components/Heading"
import { cx } from "~/utils/cva"
import { NewsletterForm } from "./NewsletterForm"

type NewsletterProps = HTMLAttributes<HTMLElement> & {
  title?: string
  description?: string
}

export const Newsletter = ({ className, title, description, ...props }: NewsletterProps) => {
  return (
    <div className={cx("overflow-clip", className)} {...props}>
      <Card hover={false} isRevealed={false} className="bg-background lg:p-8">
        <div className="relative z-10 flex flex-col gap-4 max-w-md">
          {title && <H3 as="strong">{title}</H3>}
          {description && <p className="text-foreground/50 text-pretty">{description}</p>}

          <NewsletterForm />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-background to-foreground/5 rounded-lg pointer-events-none hidden dark:block" />

        <div className="absolute -inset-y-px -right-px w-1/2 rounded-lg overflow-clip select-none pointer-events-none max-md:hidden">
          <img
            src="/3d-panels.png"
            alt="Newsletter"
            className="h-auto w-full mix-blend-exclusion"
          />
        </div>
      </Card>
    </div>
  )
}
