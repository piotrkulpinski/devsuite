"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { useServerAction } from "zsa-react"
import { subscribeToNewsletter } from "~/actions/subscribe"
import { newsletterSchema } from "~/api/schemas"
import { Form, FormControl, FormField } from "~/components/common/form"
import { Hint } from "~/components/common/hint"
import { Button, type ButtonProps } from "~/components/web/ui/button"
import { Input } from "~/components/web/ui/input"
import { cx } from "~/utils/cva"

type NewsletterProps = HTMLAttributes<HTMLFormElement> & {
  medium?: string
  placeholder?: string
  buttonProps?: ButtonProps
}

export const NewsletterForm = ({
  className,
  medium = "subscribe_form",
  placeholder = "Your email here...",
  buttonProps = { variant: "primary", children: "Subscribe" },
  ...props
}: NewsletterProps) => {
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", utm_medium: medium },
  })

  const { execute, isPending } = useServerAction(subscribeToNewsletter, {
    onSuccess: ({ data }) => {
      form.reset()
      toast.success(data)
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => execute(data))}
        className={cx("flex flex-col gap-3 w-full max-w-sm", className)}
        noValidate
        {...props}
      >
        <div className="flex w-full border border-foreground/15 transition rounded-lg overflow-clip focus-within:ring-[3px] focus-within:ring-foreground/10 focus-within:border-foreground/25">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormControl>
                <Input
                  type="email"
                  placeholder={placeholder}
                  size="lg"
                  className="flex-1 min-w-0 border-0 focus-visible:ring-0"
                  data-1p-ignore
                  {...field}
                />
              </FormControl>
            )}
          />

          <Button
            type="submit"
            size="md"
            isPending={isPending}
            disabled={isPending}
            className="shrink-0 text-sm/tight px-4 m-1"
            {...buttonProps}
          />
        </div>

        {form.formState.errors.email && <Hint>{form.formState.errors.email.message}</Hint>}
      </form>
    </Form>
  )
}
