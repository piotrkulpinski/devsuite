"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { redirect } from "next/navigation"
import type React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useServerAction } from "zsa-react"
import { createTag, updateTag } from "~/app/admin/(dashboard)/tags/_lib/actions"
import type { getTagBySlug, getTools } from "~/app/admin/(dashboard)/tags/_lib/queries"
import { type TagSchema, tagSchema } from "~/app/admin/(dashboard)/tags/_lib/validations"
import { RelationSelector } from "~/components/admin/relation-selector"
import { Button } from "~/components/admin/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/common/forms/form"
import { Input } from "~/components/common/forms/input"
import { cx } from "~/utils/cva"
import { nullsToUndefined } from "~/utils/helpers"

type TagFormProps = React.HTMLAttributes<HTMLFormElement> & {
  tag?: Awaited<ReturnType<typeof getTagBySlug>>
  tools: Awaited<ReturnType<typeof getTools>>
}

export function TagForm({ children, className, tag, tools, ...props }: TagFormProps) {
  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      ...nullsToUndefined(tag),
      tools: tag?.tools.map(({ id }) => id),
    },
  })

  // Create tag
  const { execute: createTagAction, isPending: isCreatingTag } = useServerAction(createTag, {
    onSuccess: ({ data }) => {
      toast.success("Tag successfully created")
      redirect(`/admin/tags/${data.slug}`)
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  // Update tag
  const { execute: updateTagAction, isPending: isUpdatingTag } = useServerAction(updateTag, {
    onSuccess: ({ data }) => {
      toast.success("Tag successfully updated")
      redirect(`/admin/tags/${data.slug}`)
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  const onSubmit = form.handleSubmit(data => {
    tag ? updateTagAction({ id: tag.id, ...data }) : createTagAction(data)
  })

  const isPending = isCreatingTag || isUpdatingTag

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={cx("grid grid-cols-1 gap-4 max-w-3xl sm:grid-cols-2", className)}
        noValidate
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tools"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Tools</FormLabel>
              <RelationSelector
                relations={tools}
                selectedIds={field.value ?? []}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4 col-span-full">
          <Button variant="outline" asChild>
            <Link href="/admin/tags">Cancel</Link>
          </Button>

          <Button isPending={isPending} disabled={isPending}>
            {tag ? "Update tag" : "Create tag"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
