import { Prisma } from "@prisma/client"

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
