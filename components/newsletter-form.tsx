"use client"

import type { ComponentProps, HTMLAttributes } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { subscribe } from "~/actions/subscribe"
import { Button, type ButtonProps } from "~/components/ui/button"
import { Input } from "~/components/ui/forms/input"
import { cx } from "~/utils/cva"

const NewsletterButton = ({ ...props }: ButtonProps) => {
  const { pending } = useFormStatus()

  return <Button isPending={pending} {...props} />
}

type NewsletterProps = HTMLAttributes<HTMLFormElement> & {
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
  const [state, formAction] = useFormState(subscribe, null)

  if (state?.message) {
    return <p className="text-sm text-green-600">{state.message}</p>
  }

  return (
    <>
      <form
        action={formAction}
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
          className="w-full pr-32 rounded-xl"
        />

        <NewsletterButton
          type="submit"
          size="md"
          variant={buttonVariant}
          className="absolute inset-y-1 right-1 px-5"
        >
          {buttonLabel}
        </NewsletterButton>
      </form>

      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
    </>
  )
}
