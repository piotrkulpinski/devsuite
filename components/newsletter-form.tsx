"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type HTMLAttributes, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { subscribeToNewsletter } from "~/actions/subscribe"
import { newsletterSchema } from "~/api/schemas"
import { Button, type ButtonProps } from "~/components/ui/button"
import { Form, FormControl, FormField } from "~/components/ui/form"
import { Hint } from "~/components/ui/forms/hint"
import { Input, type InputProps } from "~/components/ui/forms/input"
import { cx } from "~/utils/cva"

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
  const [isPending, startTransition] = useTransition()
  const isLarge = size === "lg"

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = (input: z.infer<typeof newsletterSchema>) => {
    startTransition(async () => {
      const { error, message } = await subscribeToNewsletter(input)

      if (error) {
        toast.error(error)
        return
      }

      if (message) {
        toast.success(message)
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cx("flex flex-col gap-3 w-full", isLarge ? "max-w-sm" : "max-w-64", className)}
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
                  size={size}
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
            className={cx("shrink-0", isLarge ? "text-sm/tight px-4 m-1" : "px-3 m-0.5")}
            {...buttonProps}
          />
        </div>

        {form.formState.errors.email && <Hint>{form.formState.errors.email.message}</Hint>}
      </form>
    </Form>
  )
}
