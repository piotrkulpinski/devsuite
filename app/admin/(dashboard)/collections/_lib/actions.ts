"use server"

import "server-only"
import { slugify } from "@curiousleaf/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { collectionSchema } from "~/app/admin/(dashboard)/collections/_lib/validations"
import { authedProcedure } from "~/lib/safe-actions"
import { prisma } from "~/services/prisma"

export const createCollection = authedProcedure
  .createServerAction()
  .input(collectionSchema)
  .handler(async ({ input: { tools, ...input } }) => {
    const collection = await prisma.collection.create({
      data: {
        ...input,
        slug: input.slug || slugify(input.name),

        // Relations
        tools: { connect: tools?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/collections")

    return collection
  })

export const updateCollection = authedProcedure
  .createServerAction()
  .input(collectionSchema.extend({ id: z.string() }))
  .handler(async ({ input: { id, tools, ...input } }) => {
    const collection = await prisma.collection.update({
      where: { id },
      data: {
        ...input,

        // Relations
        tools: { set: tools?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/collections")
    revalidatePath(`/admin/collections/${collection.slug}`)

    return collection
  })

export const updateCollections = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()), data: collectionSchema.partial() }))
  .handler(async ({ input: { ids, data } }) => {
    await prisma.collection.updateMany({
      where: { id: { in: ids } },
      data,
    })

    revalidatePath("/admin/collections")

    return true
  })

export const deleteCollections = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()) }))
  .handler(async ({ input: { ids } }) => {
    await prisma.collection.deleteMany({
      where: { id: { in: ids } },
    })

    revalidatePath("/admin/collections")

    return true
  })
