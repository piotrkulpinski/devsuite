import { Form, Link, json, useLoaderData, useNavigate } from "@remix-run/react"
import { Favicon } from "~/components/Favicon"
import { H2 } from "~/components/Heading"
import { Series } from "~/components/Series"
import { Wrapper } from "~/components/Wrapper"
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { prisma } from "~/services.server/prisma"
import { toolOnePayload } from "~/services.server/api"
import { JSON_HEADERS } from "~/utils/constants"
import { TextArea } from "~/components/forms/TextArea"
import { getValidatedFormData, useRemixForm } from "remix-hook-form"
import { Controller } from "react-hook-form"
import { Tiptap } from "~/components/forms/Editor"
import { Prose } from "~/components/Prose"
import { Button } from "~/components/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowUpLeftIcon } from "lucide-react"
import { Label } from "~/components/forms/Label"
import { useEffect } from "react"
import hotkeys from "hotkeys-js"
import { z } from "zod"
import { Input } from "~/components/forms/Input"

export const handle = {
  newsletter: false,
}

const schema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  websiteUrl: z.string().url().nullable(),
  affiliateUrl: z.string().url().nullable(),
  tagline: z.string().max(100).nullable(),
  description: z.string().max(200).nullable(),
  content: z.string().nullable(),
})

type FormData = z.infer<typeof schema>

const resolver = zodResolver(schema)

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  try {
    const tool = await prisma.tool.findUniqueOrThrow({
      where: { slug },
      include: toolOnePayload,
    })

    return json({ tool }, { headers: JSON_HEADERS })
  } catch (error) {
    console.error(error)
    throw json(null, { status: 404, statusText: "Not Found" })
  }
}

export const action = async ({ request, params: { slug } }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver)

  if (errors) {
    // The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
    return json({ errors, defaultValues })
  }

  // Destructure the parsed data
  const { tagline, description, content } = data

  try {
    const tool = await prisma.tool.update({
      where: { slug },
      data: { tagline, description, content },
    })

    return redirect(`/${tool.slug}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error(error)
    throw json(null, { status: 404, statusText: "Not Found" })
  }
}

export default function ToolPageEdit() {
  const { tool } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    defaultValues: tool,
  })

  useEffect(() => {
    hotkeys("esc", () => navigate("..", { relative: "path" }))

    return () => hotkeys.unbind("esc")
  }, [])

  return (
    <>
      <Wrapper className="flex flex-col gap-12 flex-1">
        <div className="flex w-full flex-col gap-y-4" style={{ viewTransitionName: "tool" }}>
          <Series size="lg" className="relative w-full">
            {tool.faviconUrl && (
              <Favicon
                src={tool.faviconUrl}
                style={{ viewTransitionName: "tool-favicon" }}
                className="size-10"
              />
            )}

            <H2 as="h1" className="relative flex-1" style={{ viewTransitionName: "tool-name" }}>
              {tool.name}
            </H2>

            <Button
              size="md"
              variant="primary"
              prefix={<ArrowUpLeftIcon />}
              className="ml-auto"
              asChild
            >
              <Link to=".." relative="path" unstable_viewTransition>
                Back to the tool
              </Link>
            </Button>
          </Series>
        </div>

        <Form
          method="POST"
          onSubmit={handleSubmit}
          className="grid w-full gap-6 md:grid-cols-2"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" isRequired>
              Name:
            </Label>

            <Input {...register("name")} placeholder="Enter a name" data-1p-ignore />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="slug" isRequired>
              Slug:
            </Label>

            <Input {...register("slug")} placeholder="Enter a slug" />
            {errors.slug && <p>{errors.slug.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="websiteUrl">Website URL:</Label>

            <Input type="url" {...register("websiteUrl")} />
            {errors.websiteUrl && <p>{errors.websiteUrl.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="affiliateUrl">Affiliate URL:</Label>

            <Input type="url" {...register("affiliateUrl")} />
            {errors.affiliateUrl && <p>{errors.affiliateUrl.message}</p>}
          </div>

          <div className="flex flex-col gap-1 col-span-full">
            <Label htmlFor="tagline">Tagline:</Label>

            <TextArea {...register("tagline")} placeholder="Enter a tagline" />
            {errors.tagline && <p>{errors.tagline.message}</p>}
          </div>

          <div className="flex flex-col gap-1 col-span-full">
            <Label htmlFor="description">Description:</Label>

            <TextArea {...register("description")} placeholder="Enter a description" />
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <div className="flex flex-col gap-1 col-span-full">
            <Label htmlFor="content">Content:</Label>

            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <Prose>
                  <Tiptap value={value ?? ""} onChange={onChange} />
                </Prose>
              )}
            />
          </div>

          <div className="col-span-full">
            <Button variant="fancy" isPending={isSubmitting} className="flex ml-auto min-w-32">
              Update tool
            </Button>
          </div>
        </Form>
      </Wrapper>
    </>
  )
}
