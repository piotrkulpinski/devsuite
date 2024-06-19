import { useFetcher, useLocation } from "@remix-run/react"
import { type ComponentProps, type HTMLAttributes, useId } from "react"
import { Button } from "~/components/Button"
import { Input } from "~/components/forms/Input"
import { action } from "~/routes/api.subscribe"
import { cx } from "~/utils/cva"

type NewsletterProps = HTMLAttributes<HTMLElement> & {
  placeholder?: string
  buttonVariant?: ComponentProps<typeof Button>["variant"]
  buttonLabel?: string
}

export const NewsletterForm = ({
  className,
  placeholder = "Enter your email...",
  buttonVariant = "primary",
  buttonLabel = "Subscribe",
  ...props
}: NewsletterProps) => {
  const id = useId()
  const { key } = useLocation()
  const { data, state, Form } = useFetcher<typeof action>({ key: `${id}-${key}` })

  if (data?.type === "success") {
    return <p className="text-sm text-green-600">{data.message}</p>
  }

  return (
    <>
      <Form
        method="POST"
        action="/api/subscribe"
        className={cx("mt-2 relative w-full max-w-sm", className)}
        noValidate
        {...props}
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
          {buttonLabel}
        </Button>
      </Form>

      {data?.type === "error" && (
        <p className="text-xs text-red-600">{data.error.email?._errors[0]}</p>
      )}
    </>
  )
}
