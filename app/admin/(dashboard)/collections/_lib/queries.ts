import "server-only"

import type { Prisma } from "@prisma/client"
import { endOfDay, startOfDay } from "date-fns"
import { unstable_noStore as noStore } from "next/cache"
import { prisma } from "~/services/prisma"
import type { GetCollectionsSchema } from "./validations"

export async function getCollections(input: GetCollectionsSchema) {
  noStore()
  const { page, per_page, sort, name, operator, from, to } = input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page

    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? ["name", "asc"]) as [
      keyof Prisma.CollectionOrderByWithRelationInput | undefined,
      "asc" | "desc" | undefined,
    ]

    // Convert the date strings to Date objects and adjust the range
    const fromDate = from ? startOfDay(new Date(from)) : undefined
    const toDate = to ? endOfDay(new Date(to)) : undefined

    const where: Prisma.CollectionWhereInput = {
      // Filter by name
      name: name ? { contains: name, mode: "insensitive" } : undefined,

      // Filter by createdAt
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    }

    // Transaction is used to ensure both queries are executed in a single transaction
    const [collections, collectionsTotal] = await prisma.$transaction([
      prisma.collection.findMany({
        where,
        orderBy: column ? { [column]: order } : undefined,
        take: per_page,
        skip: offset,
      }),

      prisma.collection.count({
        where,
      }),
    ])

    const pageCount = Math.ceil(collectionsTotal / per_page)
    return { collections, collectionsTotal, pageCount }
  } catch (err) {
    return { collections: [], collectionsTotal: 0, pageCount: 0 }
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

export async function getCollectionById(id: string) {
  noStore()
  try {
    return await prisma.collection.findUnique({
      where: { id },
      include: { tools: true },
    })
  } catch (err) {
    return null
  }
}
