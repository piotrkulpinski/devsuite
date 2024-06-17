import { useFetcher, useLocation } from "@remix-run/react"
import { type ComponentProps, type HTMLAttributes, useId } from "react"
import { Button } from "~/components/Button"
import { Card } from "~/components/Card"
import { H3 } from "~/components/Heading"
import { Input } from "~/components/forms/Input"
import { cx } from "~/utils/cva"

type NewsletterProps = HTMLAttributes<HTMLElement> & {
  placeholder?: string
  buttonVariant?: ComponentProps<typeof Button>["variant"]
}

export const Newsletter = ({
  className,
  placeholder = "Enter your email...",
  buttonVariant = "primary",
  ...props
}: NewsletterProps) => {
  const id = useId()
  const { key } = useLocation()
  const { data, state, Form } = useFetcher<unknown>({ key: `${id}-${key}` })

  return (
    <Card isRevealed={false} className="md:py-8 md:px-10">
      <div className={cx("flex flex-col gap-4 max-w-lg", className)} {...props}>
        <H3>Subscribe to our newsletter</H3>

        <p className="text-foreground/50">
          Stay updated with the newest additions to our digital assets library, upcoming promotions
          or discounts.
        </p>

        {data?.type !== "success" && (
          <Form
            method="POST"
            action="/api/subscribe"
            className="mt-2 relative w-full max-w-sm"
            noValidate
          >
            <Input
              type="email"
              name="email"
              placeholder={placeholder}
              data-1p-ignore
              required
              shape="rounded"
              className="w-full pr-32"
            />

            <Button
              type="submit"
              size="md"
              variant={buttonVariant}
              isPending={state !== "idle"}
              className="absolute inset-y-1 right-1 px-5"
            >
              Subscribe
            </Button>
          </Form>
        )}

        {data?.type === "error" && (
          <p className="text-xs text-red-600">{data.error.email?._errors[0]}</p>
        )}

        {data?.type === "success" && <p className="text-sm text-green-600">{data.message}</p>}
      </div>
    </Card>
  )
}
