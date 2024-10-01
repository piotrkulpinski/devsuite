import type { Prisma } from "@prisma/client"
import { collectionManyPayload, collectionOnePayload } from "~/api/collections/payloads"
import { prisma } from "~/services/prisma"

export const findCollections = async ({ orderBy, ...args }: Prisma.CollectionFindManyArgs) => {
  return await prisma.collection.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    include: collectionManyPayload,
  })
}

export const findCollectionSlugs = async ({ orderBy, ...args }: Prisma.CollectionFindManyArgs) => {
  return await prisma.collection.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    select: { slug: true },
  })
}

export const findUniqueCollection = async ({ ...args }: Prisma.CollectionFindUniqueArgs) => {
  return await prisma.collection.findUnique({
    ...args,
    include: collectionOnePayload,
  })
}
