import { getRandomElement } from "@curiousleaf/utils"
import type { Prisma } from "@prisma/client"
import type { ToolOne } from "~/api/tools/payloads"
import { findTools } from "~/api/tools/queries"
import { H4 } from "~/components/common/heading"
import { ToolCard } from "~/components/web/cards/tool-card"
import { Grid } from "~/components/web/ui/grid"
import { prisma } from "~/services/prisma"

export const RelatedTools = async ({ tool }: { tool: ToolOne }) => {
  const take = 4
  const where = {
    categories: { some: { slug: { in: tool.categories.map(({ slug }) => slug) } } },
    NOT: { slug: tool.slug },
  } satisfies Prisma.ToolWhereInput

  const itemCount = await prisma.tool.count({ where })
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - take)
  const properties = ["id", "name"] satisfies (keyof Prisma.ToolOrderByWithRelationInput)[]
  const orderBy = getRandomElement(properties)
  const orderDir = getRandomElement(["asc", "desc"] as const)

  const tools = await findTools({
    where,
    take,
    skip,
    orderBy: { [orderBy]: orderDir },
  })

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8">
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
