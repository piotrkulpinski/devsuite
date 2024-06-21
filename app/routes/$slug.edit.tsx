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
import { Hint } from "~/components/forms/Hint"
import { Checkbox } from "~/components/forms/Checkbox"

export const handle = {
  newsletter: false,
  bottomBlur: false,
}

const schema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  websiteUrl: z.string().trim().url(),
  affiliateUrl: z.union([z.literal(""), z.string().trim().url()]).nullish(),
  tagline: z.string().max(100).nullish(),
  description: z.string().max(200).nullish(),
  content: z.string().nullish(),
  categories: z.array(z.string()).nullish(),
})

type FormData = z.infer<typeof schema>

const resolver = zodResolver(schema)

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  try {
    const [tool, categories] = await Promise.all([
      prisma.tool.findUniqueOrThrow({
        where: { slug },
        include: toolOnePayload,
      }),
      prisma.category.findMany({
        select: { name: true },
        orderBy: { name: "asc" },
      }),
    ])

    return json({ tool, categories }, { headers: JSON_HEADERS })
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
    return json({ errors, defaultValues })
  }

  const { categories, ...toolData } = data

  const tool = await prisma.tool.update({
    where: { slug },
    data: {
      ...toolData,
      categories: { set: categories?.map((name) => ({ name })) },
    },
  })

  return redirect(`/${tool.slug}`)
}

export default function ToolPageEdit() {
  const { tool, categories } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    defaultValues: { ...tool, categories: tool.categories.map(({ name }) => name) },
  })

  useEffect(() => {
    hotkeys("esc", () => navigate("..", { relative: "path", unstable_viewTransition: true }))

    return () => hotkeys.unbind("esc")
  }, [navigate])

  return (
    <>
      <Wrapper className="flex flex-col gap-12 flex-1">
        <div className="flex w-full flex-col gap-y-4" style={{ viewTransitionName: "tool" }}>
          <Series size="lg" className="relative w-full justify-between">
            <Series>
              {tool.faviconUrl && (
                <Favicon
                  src={tool.faviconUrl}
                  style={{ viewTransitionName: "tool-favicon" }}
                  className="size-10"
                />
              )}

              <H2
                as="h1"
                className="!leading-snug -my-1.5"
                style={{ viewTransitionName: "tool-name" }}
              >
                {tool.name}
              </H2>
            </Series>

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
            {errors.name && <Hint>{errors.name.message}</Hint>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="slug" isRequired>
              Slug:
            </Label>

            <Input {...register("slug")} placeholder="Enter a slug" />
            {errors.slug && <Hint>{errors.slug.message}</Hint>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="websiteUrl" isRequired>
              Website URL:
            </Label>

            <Input type="url" {...register("websiteUrl")} />
            {errors.websiteUrl && <Hint>{errors.websiteUrl.message}</Hint>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="affiliateUrl">Affiliate URL:</Label>

            <Input type="url" {...register("affiliateUrl")} />
            {errors.affiliateUrl && <Hint>{errors.affiliateUrl.message}</Hint>}
          </div>

          <div className="flex flex-col gap-1 col-span-full">
            <Label htmlFor="categories">Categories:</Label>

            <Controller
              control={control}
              name="categories"
              render={({ field: { value, onChange } }) => (
                <div className="grid grid-auto-fill-xs gap-x-4 gap-y-2 mt-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 text-foreground/70 cursor-pointer transition-colors hover:text-foreground"
                    >
                      <Checkbox
                        value={category.name}
                        checked={value?.includes(category.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onChange([...(value ?? []), category.name])
                          } else {
                            onChange(value?.filter((v) => v !== category.name))
                          }
                        }}
                      />

                      <span className="flex-1 truncate text-[13px]">{category.name}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.categories && <Hint>{errors.categories.message}</Hint>}
          </div>

          <div className="flex flex-col gap-1 col-span-full">
            <Label htmlFor="tagline">Tagline:</Label>

            <TextArea {...register("tagline")} placeholder="Enter a tagline" />
            {errors.tagline && <Hint>{errors.tagline.message}</Hint>}
          </div>

          <div className="flex flex-col gap-1 col-span-full">
            <Label htmlFor="description">Description:</Label>

            <TextArea {...register("description")} placeholder="Enter a description" />
            {errors.description && <Hint>{errors.description.message}</Hint>}
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
            {errors.content && <Hint>{errors.content.message}</Hint>}
          </div>

          <div>
            <Button variant="fancy" isPending={isSubmitting} className="min-w-32">
              Update tool
            </Button>
          </div>
        </Form>
      </Wrapper>
    </>
  )
}
