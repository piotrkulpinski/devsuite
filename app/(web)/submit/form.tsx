"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import type { HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { useServerAction } from "zsa-react"
import { submitTool } from "~/actions/submit"
import { submitToolSchema } from "~/api/schemas"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Checkbox } from "~/components/ui/forms/checkbox"
import { Input } from "~/components/ui/forms/input"
import { cx } from "~/utils/cva"

export const SubmitForm = ({ className, ...props }: HTMLAttributes<HTMLFormElement>) => {
  const form = useForm<z.infer<typeof submitToolSchema>>({
    resolver: zodResolver(submitToolSchema),
    defaultValues: {
      name: "",
      websiteUrl: "",
      description: "",
      submitterName: "",
      submitterEmail: "",
      newsletterOptIn: true,
    },
  })

  const { execute, isPending } = useServerAction(submitTool, {
    onSuccess: ({ data }) => {
      form.reset()
      redirect(`/submit/${data.slug}`)
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => execute(data))}
        className={cx("grid w-full gap-6 sm:grid-cols-2", className)}
        noValidate
        {...props}
      >
        <FormField
          control={form.control}
          name="submitterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Your Name:</FormLabel>
              <FormControl>
                <Input size="lg" placeholder="John Doe" data-1p-ignore {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="submitterEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Your Email:</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  size="lg"
                  placeholder="john@doe.com"
                  data-1p-ignore
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Name:</FormLabel>
              <FormControl>
                <Input size="lg" placeholder="PostHog" data-1p-ignore {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Website URL:</FormLabel>
              <FormControl>
                <Input type="url" size="lg" placeholder="https://posthog.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="A platform that helps engineers build better products"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newsletterOptIn"
          render={({ field }) => (
            <FormItem className="flex-row items-center col-span-full">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">I'd like to receive free email updates</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <Button
            variant="primary"
            isPending={isPending}
            disabled={isPending}
            className="flex min-w-32"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
