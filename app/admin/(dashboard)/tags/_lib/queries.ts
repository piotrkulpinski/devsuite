import "server-only"

import type { Prisma } from "@prisma/client"
import { endOfDay, startOfDay } from "date-fns"
import { unstable_noStore as noStore } from "next/cache"
import { prisma } from "~/services/prisma"
import type { GetTagsSchema } from "./validations"

export async function getTags(input: GetTagsSchema) {
  noStore()
  const { page, per_page, sort, name, operator, from, to } = input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page

    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? ["name", "asc"]) as [
      keyof Prisma.TagOrderByWithRelationInput | undefined,
      "asc" | "desc" | undefined,
    ]

    // Convert the date strings to Date objects and adjust the range
    const fromDate = from ? startOfDay(new Date(from)) : undefined
    const toDate = to ? endOfDay(new Date(to)) : undefined

    const where: Prisma.TagWhereInput = {
      // Filter by name
      name: name ? { contains: name, mode: "insensitive" } : undefined,

      // Filter by createdAt
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    }

    // Transaction is used to ensure both queries are executed in a single transaction
    const [tags, tagsTotal] = await prisma.$transaction([
      prisma.tag.findMany({
        where,
        orderBy: column ? { [column]: order } : undefined,
        take: per_page,
        skip: offset,
      }),

      prisma.tag.count({
        where,
      }),
    ])

    const pageCount = Math.ceil(tagsTotal / per_page)
    return { tags, tagsTotal, pageCount }
  } catch (err) {
    return { tags: [], tagsTotal: 0, pageCount: 0 }
  }
}

export async function getTools() {
  noStore()
  try {
    return await prisma.tool.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })
  } catch (err) {
    return []
  }
}

export async function getTagBySlug(slug: string) {
  noStore()
  try {
    return await prisma.tag.findUnique({
      where: { slug },
      include: { tools: true },
    })
  } catch (err) {
    return null
  }
}
