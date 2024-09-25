import { getRandomElement } from "@curiousleaf/utils"
import type { Prisma } from "@prisma/client"
import { ToolCard } from "~/components/cards/tool-card"
import { Grid } from "~/components/ui/grid"
import { H4 } from "~/components/ui/heading"
import { type ToolOne, toolManyPayload } from "~/lib/api"
import { prisma } from "~/services/prisma"

export const RelatedTools = async ({ tool }: { tool: ToolOne }) => {
  const take = 3
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

  const tools = await prisma.tool.findMany({
    where: relatedWhereClause,
    include: toolManyPayload,
    take,
    skip,
    orderBy: { [orderBy]: orderDir },
  })

  return (
    <div className="flex flex-col gap-6 items-center">
      <H4 as="h3" className="text-center">
        Other Alternatives to {tool.name}:
      </H4>

      <Grid className="w-full">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </Grid>
    </div>
  )
}
