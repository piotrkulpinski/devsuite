"use client"

import type { HTMLAttributes } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { subscribe } from "~/actions/subscribe"
import { Button, type ButtonProps } from "~/components/ui/button"
import { Input, type InputProps } from "~/components/ui/forms/input"
import { cx } from "~/utils/cva"

const NewsletterButton = ({ ...props }: ButtonProps) => {
  const { pending } = useFormStatus()

  return <Button isPending={pending} {...props} />
}

type NewsletterProps = HTMLAttributes<HTMLFormElement> & {
  medium?: string
  placeholder?: string
  size?: InputProps["size"]
  buttonProps?: ButtonProps
}

export const NewsletterForm = ({
  className,
  medium = "subscribe_form",
  placeholder = "Your email here...",
  size = "md",
  buttonProps = { variant: "primary", children: "Subscribe" },
  ...props
}: NewsletterProps) => {
  const [state, formAction] = useFormState(subscribe, null)
  const isLargeSize = size === "lg"

  if (state?.message) {
    return <p className="text-sm text-green-600">{state.message}</p>
  }

  return (
    <>
      <form
        action={formAction}
        className={cx(
          "flex w-full border border-foreground/15 transition rounded-lg overflow-clip focus-within:ring-[3px] focus-within:ring-foreground/10 focus-within:border-foreground/25",
          isLargeSize ? "max-w-96" : "max-w-64",
          className,
        )}
        noValidate
        {...props}
      >
        <Input
          type="email"
          name="email"
          placeholder={placeholder}
          data-1p-ignore
          required
          size={size}
          className="flex-1 min-w-0 border-0 focus-visible:ring-0"
        />

        <NewsletterButton
          type="submit"
          size="md"
          className={cx("shrink-0", isLargeSize ? "text-sm/tight px-4 m-1" : "px-3 m-0.5")}
          {...buttonProps}
        />
      </form>

      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
    </>
  )
}
