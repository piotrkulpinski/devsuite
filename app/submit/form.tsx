"use client"

import { SparkleIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { data } from "tailwindcss/defaultTheme"
import { submit } from "~/actions/submit"
import { Button, type ButtonProps } from "~/components/ui/button"
import { Input } from "~/components/ui/forms/input"
import { Label } from "~/components/ui/forms/label"
import { TextArea } from "~/components/ui/forms/textarea"
import { cx } from "~/utils/cva"

const SubmitFormButton = ({ ...props }: ButtonProps) => {
  const { pending } = useFormStatus()

  return <Button isPending={pending} {...props} />
}

type SubmitProps = HTMLAttributes<HTMLFormElement> & {
  placeholder?: string
}
export const SubmitForm = ({ className, ...props }: SubmitProps) => {
  const [state, formAction] = useFormState(submit, null)

  return (
    <form
      action={formAction}
      className={cx("grid w-full gap-6 md:grid-cols-2", className)}
      noValidate
      {...props}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="name" isRequired>
          Your Name:
        </Label>

        <Input type="text" name="name" id="name" placeholder="John Doe" data-1p-ignore required />

        {data?.error?.name && <p className="text-xs text-red-600">{data.error.name?._errors[0]}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email" isRequired>
          Your Email:
        </Label>

        <Input type="url" name="email" id="email" placeholder="john@example.com" required />

        {data?.error?.website && (
          <p className="text-xs text-red-600">{data.error.website?._errors[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="name" isRequired>
          Tool Name:
        </Label>

        <Input type="text" name="name" id="name" placeholder="PostHog" data-1p-ignore required />

        {data?.error?.name && <p className="text-xs text-red-600">{data.error.name?._errors[0]}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="website" isRequired>
          Website:
        </Label>

        <Input type="url" name="website" id="website" placeholder="https://posthog.com" required />

        {data?.error?.website && (
          <p className="text-xs text-red-600">{data.error.website?._errors[0]}</p>
        )}
      </div>

      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="description" isRequired>
          Description:
        </Label>

        <TextArea
          name="description"
          id="description"
          rows={3}
          placeholder="A platform that helps engineers build better products"
          required
        />

        {data?.error?.description && (
          <p className="text-xs text-red-600">{data.error.description?._errors[0]}</p>
        )}
      </div>

      <div className="col-span-full">
        <SubmitFormButton
          variant="fancy"
          suffix={<SparkleIcon />}
          className="flex ml-auto min-w-32"
        >
          Submit
        </SubmitFormButton>
      </div>
    </form>
  )
}
