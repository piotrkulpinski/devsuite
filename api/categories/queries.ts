import type { Prisma } from "@prisma/client"
import { categoryManyPayload, categoryOnePayload } from "~/api/categories/payloads"
import { prisma } from "~/services/prisma"

export const findCategories = async ({ orderBy, ...args }: Prisma.CategoryFindManyArgs) => {
  return await prisma.category.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    include: categoryManyPayload,
  })
}

export const findCategorySlugs = async ({ orderBy, ...args }: Prisma.CategoryFindManyArgs) => {
  return await prisma.category.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    select: { slug: true },
  })
}

export const findUniqueCategory = async ({ ...args }: Prisma.CategoryFindUniqueArgs) => {
  return await prisma.category.findUnique({
    ...args,
    include: categoryOnePayload,
  })
}
