import type { Prisma } from "@prisma/client"
import { toolManyPayload, toolOnePayload } from "~/api/tools/payloads"
import { prisma } from "~/services/prisma"

export const findTools = async ({ where, ...args }: Prisma.ToolFindManyArgs) => {
  return await prisma.tool.findMany({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
    include: toolManyPayload,
  })
}

export const findToolSlugs = async ({ where, orderBy, ...args }: Prisma.ToolFindManyArgs) => {
  return await prisma.tool.findMany({
    ...args,
    orderBy: { name: "asc", ...orderBy },
    where: { publishedAt: { lte: new Date() }, ...where },
    select: { slug: true },
  })
}

export const countTools = async ({ where, ...args }: Prisma.ToolCountArgs) => {
  return await prisma.tool.count({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
  })
}

export const findUniqueTool = async ({ where, ...args }: Prisma.ToolFindUniqueArgs) => {
  return await prisma.tool.findUnique({
    ...args,
    where: { publishedAt: { lte: new Date() }, ...where },
    include: toolOnePayload,
  })
}
