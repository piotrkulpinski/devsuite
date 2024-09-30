import { Prisma } from "@prisma/client"

// Tools
export const toolOnePayload = Prisma.validator<Prisma.ToolInclude>()({
  categories: { select: { id: true, name: true, slug: true } },
  collections: { select: { id: true, name: true, slug: true } },
  tags: { select: { id: true, name: true, slug: true } },
})

export const toolManyPayload = Prisma.validator<Prisma.ToolInclude>()({
  categories: { select: { id: true, name: true, slug: true } },
  collections: { select: { id: true, name: true, slug: true } },
})

export type ToolOne = Prisma.ToolGetPayload<{ include: typeof toolOnePayload }>
export type ToolMany = Prisma.ToolGetPayload<{ include: typeof toolManyPayload }>

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
