import { Form, useFetcher, useLocation } from "@remix-run/react"
import { SparkleIcon } from "lucide-react"
import { useId } from "react"
import { Button } from "~/components/Button"
import { Intro, IntroDescription, IntroTitle } from "~/components/Intro"
import { Input } from "~/components/forms/Input"
import { Label } from "~/components/forms/Label"
import { TextArea } from "~/components/forms/TextArea"

export default function Submit() {
  const id = useId()
  const { key } = useLocation()
  const { data, state } = useFetcher<unknown>({ key: `${id}-${key}` })

  return (
    <>
      <Intro alignment="center">
        <IntroTitle>Submit a Tool</IntroTitle>

        <IntroDescription>
          A high-quality website curation is the most important aspect for us. We can&apos;t list
          all sites since it&apos;s a highly curated directory.
        </IntroDescription>
      </Intro>

      <Form
        method="GET"
        action="/submit/packages"
        className="grid w-full gap-6 md:grid-cols-2"
        noValidate
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" isRequired>
            Your Name:
          </Label>

          <Input type="text" name="name" id="name" placeholder="John Doe" data-1p-ignore required />

          {data?.error?.name && (
            <p className="text-xs text-red-600">{data.error.name?._errors[0]}</p>
          )}
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

          {data?.error?.name && (
            <p className="text-xs text-red-600">{data.error.name?._errors[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="website" isRequired>
            Website:
          </Label>

          <Input
            type="url"
            name="website"
            id="website"
            placeholder="https://posthog.com"
            required
          />

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
          <Button
            variant="fancy"
            suffix={<SparkleIcon />}
            isPending={state !== "idle"}
            className="flex ml-auto min-w-32"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  )
}
