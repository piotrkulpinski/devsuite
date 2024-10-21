"use server"

import "server-only"
import { slugify } from "@curiousleaf/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { categorySchema } from "~/app/admin/(dashboard)/categories/_lib/validations"
import { authedProcedure } from "~/lib/safe-actions"
import { prisma } from "~/services/prisma"

export const createCategory = authedProcedure
  .createServerAction()
  .input(categorySchema)
  .handler(async ({ input: { tools, ...input } }) => {
    const category = await prisma.category.create({
      data: {
        ...input,
        slug: input.slug || slugify(input.name),

        // Relations
        tools: { connect: tools?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/categories")

    return category
  })

export const updateCategory = authedProcedure
  .createServerAction()
  .input(categorySchema.extend({ id: z.string() }))
  .handler(async ({ input: { id, tools, ...input } }) => {
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...input,

        // Relations
        tools: { set: tools?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/categories")
    revalidatePath(`/admin/categories/${category.slug}`)

    return category
  })

export const updateCategories = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()), data: categorySchema.partial() }))
  .handler(async ({ input: { ids, data } }) => {
    await prisma.category.updateMany({
      where: { id: { in: ids } },
      data,
    })

    revalidatePath("/admin/categories")

    return true
  })

export const deleteCategories = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()) }))
  .handler(async ({ input: { ids } }) => {
    await prisma.category.deleteMany({
      where: { id: { in: ids } },
    })

    revalidatePath("/admin/categories")

    return true
  })
