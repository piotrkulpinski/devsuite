"use server"

import "server-only"
import { slugify } from "@curiousleaf/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { tagSchema } from "~/app/admin/(dashboard)/tags/_lib/validations"
import { authedProcedure } from "~/lib/safe-actions"
import { prisma } from "~/services/prisma"

export const createTag = authedProcedure
  .createServerAction()
  .input(tagSchema)
  .handler(async ({ input: { tools, ...input } }) => {
    const tag = await prisma.tag.create({
      data: {
        ...input,
        slug: input.slug || slugify(input.name),

        // Relations
        tools: { connect: tools?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/tags")

    return tag
  })

export const updateTag = authedProcedure
  .createServerAction()
  .input(tagSchema.extend({ id: z.string() }))
  .handler(async ({ input: { id, tools, ...input } }) => {
    const tag = await prisma.tag.update({
      where: { id },
      data: {
        ...input,

        // Relations
        tools: { set: tools?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/tags")
    revalidatePath(`/admin/tags/${tag.slug}`)

    return tag
  })

export const updateTags = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()), data: tagSchema.partial() }))
  .handler(async ({ input: { ids, data } }) => {
    await prisma.tag.updateMany({
      where: { id: { in: ids } },
      data,
    })

    revalidatePath("/admin/tags")

    return true
  })

export const deleteTags = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()) }))
  .handler(async ({ input: { ids } }) => {
    await prisma.tag.deleteMany({
      where: { id: { in: ids } },
    })

    revalidatePath("/admin/tags")

    return true
  })
