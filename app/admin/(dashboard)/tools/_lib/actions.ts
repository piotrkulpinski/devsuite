"use server"

import "server-only"
import { slugify } from "@curiousleaf/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { toolSchema } from "~/app/admin/(dashboard)/tools/_lib/validations"
import { uploadFavicon, uploadScreenshot } from "~/lib/media"
import { authedProcedure } from "~/lib/safe-actions"
import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const createTool = authedProcedure
  .createServerAction()
  .input(toolSchema)
  .handler(async ({ input: { categories, collections, tags, ...input } }) => {
    const tool = await prisma.tool.create({
      data: {
        ...input,
        slug: input.slug || slugify(input.name),

        // Relations
        categories: { connect: categories?.map(id => ({ id })) },
        collections: { connect: collections?.map(id => ({ id })) },
        tags: { connect: tags?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/tools")

    // Send an event to the Inngest pipeline
    if (tool.publishedAt) {
      await inngest.send({ name: "tool.published", data: { slug: tool.slug } })
    }

    return tool
  })

export const updateTool = authedProcedure
  .createServerAction()
  .input(toolSchema.extend({ id: z.string() }))
  .handler(async ({ input: { id, categories, collections, tags, ...input } }) => {
    const tool = await prisma.tool.update({
      where: { id },
      data: {
        ...input,

        // Relations
        categories: { set: categories?.map(id => ({ id })) },
        collections: { set: collections?.map(id => ({ id })) },
        tags: { set: tags?.map(id => ({ id })) },
      },
    })

    revalidatePath("/admin/tools")
    revalidatePath(`/admin/tools/${tool.slug}`)

    return tool
  })

export const updateTools = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()), data: toolSchema.partial() }))
  .handler(async ({ input: { ids, data } }) => {
    await prisma.tool.updateMany({
      where: { id: { in: ids } },
      data,
    })

    revalidatePath("/admin/tools")

    return true
  })

export const deleteTools = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()) }))
  .handler(async ({ input: { ids } }) => {
    const tools = await prisma.tool.findMany({
      where: { id: { in: ids } },
      select: { slug: true },
    })

    await prisma.tool.deleteMany({
      where: { id: { in: ids } },
    })

    revalidatePath("/admin/tools")

    // Send an event to the Inngest pipeline
    for (const tool of tools) {
      await inngest.send({ name: "tool.deleted", data: { slug: tool.slug } })
    }

    return true
  })

export const scheduleTools = authedProcedure
  .createServerAction()
  .input(z.object({ ids: z.array(z.string()), publishedAt: z.date() }))
  .handler(async ({ input: { ids, publishedAt } }) => {
    const tools = await prisma.tool.findMany({
      where: { id: { in: ids } },
      select: { slug: true },
    })

    await prisma.tool.updateMany({
      where: { id: { in: ids } },
      data: { publishedAt },
    })

    revalidatePath("/admin/tools")

    // Send an event to the Inngest pipeline
    for (const tool of tools) {
      await inngest.send({ name: "tool.scheduled", data: { slug: tool.slug } })
    }

    return true
  })

export const reuploadToolAssets = authedProcedure
  .createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input: { id } }) => {
    const tool = await prisma.tool.findUniqueOrThrow({ where: { id } })

    const [faviconUrl, screenshotUrl] = await Promise.all([
      uploadFavicon(tool.websiteUrl, `tools/${tool.slug}/favicon`),
      uploadScreenshot(tool.websiteUrl, `tools/${tool.slug}/screenshot`),
    ])

    await prisma.tool.update({
      where: { id: tool.id },
      data: { faviconUrl, screenshotUrl },
    })
  })
