import { Prisma } from "@prisma/client"

export const collectionOnePayload = Prisma.validator<Prisma.CollectionInclude>()({
  tools: {
    where: { publishedAt: { lte: new Date() } },
    orderBy: [{ isFeatured: "desc" }, { name: "desc" }],
  },
})

export const collectionManyPayload = Prisma.validator<Prisma.CollectionInclude>()({
  _count: { select: { tools: { where: { publishedAt: { lte: new Date() } } } } },
})

export type CollectionOne = Prisma.CollectionGetPayload<{ include: typeof collectionOnePayload }>
export type CollectionMany = Prisma.CollectionGetPayload<{ include: typeof collectionManyPayload }>
