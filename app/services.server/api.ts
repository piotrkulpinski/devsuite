import { Prisma } from "@prisma/client"
import { prisma } from "./prisma"
import { getRandomElement } from "@curiousleaf/utils"

// Categories
export const categoryOnePayload = Prisma.validator<Prisma.CategoryInclude>()({
  tools: {
    where: { publishedAt: { lte: new Date() } },
    orderBy: [{ isFeatured: "desc" }, { name: "desc" }],
  },
})

export const categoryManyPayload = Prisma.validator<Prisma.CategoryInclude>()({
  _count: { select: { tools: { where: { publishedAt: { lte: new Date() } } } } },
  tools: {
    where: { publishedAt: { lte: new Date() }, images: { isEmpty: false } },
    select: { id: true, images: true },
    take: 3,
  },
})

export type CategoryOne = Prisma.CategoryGetPayload<{ include: typeof categoryOnePayload }>
export type CategoryMany = Prisma.CategoryGetPayload<{ include: typeof categoryManyPayload }>

// Tools
export const toolOnePayload = Prisma.validator<Prisma.ToolInclude>()({
  categories: {
    select: { id: true, name: true, slug: true },
  },
})
export const toolManyPayload = Prisma.validator<Prisma.ToolInclude>()({})

export type ToolOne = Prisma.ToolGetPayload<{ include: typeof toolOnePayload }>
export type ToolMany = Prisma.ToolGetPayload<{ include: typeof toolManyPayload }>

/**
 * Get a random tool from the database
 * @param tool - The tool to exclude from the results
 * @param take - The number of tools to return
 * @returns A random tools from the database
 */
export const getRelatedTools = async (tool: ToolOne, take = 3) => {
  const relatedWhereClause = {
    categories: { some: { slug: { in: tool.categories.map(({ slug }) => slug) } } },
    publishedAt: { lte: new Date() },
    NOT: { slug: tool.slug },
  } satisfies Prisma.ToolWhereInput

  const itemCount = await prisma.tool.count({ where: relatedWhereClause })
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - take)
  const properties = ["id", "name"] satisfies (keyof Prisma.ToolOrderByWithRelationInput)[]
  const orderBy = getRandomElement(properties)
  const orderDir = getRandomElement(["asc", "desc"] as const)

  return prisma.tool.findMany({
    where: relatedWhereClause,
    include: toolManyPayload,
    take,
    skip,
    orderBy: { [orderBy]: orderDir },
  })
}
