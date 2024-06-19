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
    <Card isRevealed={false} className="mt-auto md:py-8 md:px-10">
      <div className={cx("flex flex-col gap-4 max-w-lg", className)} {...props}>
        {title && <H3>{title}</H3>}
        {description && <p className="text-foreground/50">{description}</p>}

        <NewsletterForm />
      </div>
    </Card>
  )
}
