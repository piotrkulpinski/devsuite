"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { prisma } from "~/services/prisma"

export const searchItems = createServerAction()
  .input(
    z.object({
      query: z.string(),
    }),
  )
  .handler(async ({ input: { query } }) => {
    const [tools, categories, collections, tags] = await Promise.all([
      prisma.tool.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.category.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.collection.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        orderBy: { name: "asc" },
        take: 5,
      }),
      prisma.tag.findMany({
        where: { slug: { contains: query, mode: "insensitive" } },
        orderBy: { slug: "asc" },
        take: 5,
      }),
    ])

    return {
      tools,
      categories,
      collections,
      tags,
    }
  })
