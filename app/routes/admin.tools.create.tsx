import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { useRemixForm, getValidatedFormData } from "remix-hook-form"
import slugify from "@sindresorhus/slugify"
import { Form } from "@remix-run/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Wrapper } from "~/components/Wrapper"
import { prisma } from "~/services.server/prisma"
import { z } from "zod"
import { Input } from "~/components/forms/Input"
import { Prisma } from "@prisma/client"
import { Button } from "~/components/Button"

const schema = z.object({
  name: z.string().min(1),
  websiteUrl: z.string().url().min(1),
  description: z.string().min(10).max(256),
})

type FormData = z.infer<typeof schema>

const resolver = zodResolver(schema)

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data } = await getValidatedFormData<FormData>(request, resolver)

  if (errors) {
    console.log(errors)
    return json({ errors })
  }

  try {
    await prisma.tool.create({
      data: {
        ...data,
        slug: slugify(data.name, { decamelize: false }),
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.meta?.target) {
      const schemaKeys = Object.keys(schema.shape)
      const name = (e.meta?.target as string[]).find((t) => schemaKeys.includes(t)) || "name"

      if (name && e.code === "P2002") {
        return json({
          type: "error",
          error: { [name]: { _errors: [`That ${name} has already been submitted.`] } },
        } as unknown)
      }
    }

    throw e
  }

  return redirect(`/admin`)
}

export default function AdminToolsCreate() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({ mode: "onSubmit", resolver })

  console.log(errors)

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
        <div>
          <label htmlFor="name">Name</label>
          <Input type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="websiteUrl">Website URL</label>
          <Input type="url" {...register("websiteUrl")} />
          {errors.websiteUrl && <p>{errors.websiteUrl.message}</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <Input type="text" {...register("description")} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <Button type="submit">Create Tool</Button>
      </Form>
    </Wrapper>
  )
}
