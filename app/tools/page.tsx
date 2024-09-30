import type { Prisma } from "@prisma/client"
import { ToolFilters } from "~/app/tools/filters"
import { ToolCard } from "~/components/cards/tool-card"
import { Pagination } from "~/components/pagination"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Wrapper } from "~/components/ui/wrapper"
import { toolManyPayload } from "~/lib/api"
import { searchParamsCache } from "~/lib/search-params"
import { prisma } from "~/services/prisma"

type ToolsPageProps = {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { q, page, perPage } = searchParamsCache.parse(searchParams)

  const skip = (page - 1) * perPage
  const take = perPage

  const where = {
    OR: [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ],
  } as Prisma.ToolWhereInput

  const [tools, totalCount] = await Promise.all([
    prisma.tool.findMany({
      orderBy: { name: "asc" },
      include: toolManyPayload,
      where,
      skip,
      take,
    }),

    prisma.tool.count({
      where,
    }),
  ])

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">Browse Top Developer Tools</IntroTitle>

        <IntroDescription>
          Browse top developer tools. Stop wasting time and money by developing tools that already
          exist.
        </IntroDescription>
      </Intro>

      <div className="flex flex-col gap-6">
        <ToolFilters />

        <Grid>
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}

          {!tools.length && (
            <p className="col-span-full mt-2 text-center text-foreground/65">
              No tools found{q ? ` for "${q}"` : ""}.
            </p>
          )}
        </Grid>
      </div>

      <Pagination pageSize={perPage} totalCount={totalCount} />
    </Wrapper>
  )
}
