import type { Prisma } from "@prisma/client"
import { countTools, findTools } from "~/api/tools/queries"
import { ToolFilters } from "~/app/tools/(tools)/filters"
import { ToolCard } from "~/components/cards/tool-card"
import { EmptyList } from "~/components/empty-list"
import { Pagination } from "~/components/pagination"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Wrapper } from "~/components/ui/wrapper"
import { toolSearchParamsCache } from "~/lib/search-params"

type ToolsPageProps = {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { q, page, sort, perPage } = toolSearchParamsCache.parse(searchParams)

  const skip = (page - 1) * perPage
  const take = perPage
  const sortArray = sort.split("_")
  const sortBy = sortArray[0]
  const sortOrder = sortArray[1]

  const where = q
    ? ({
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      } as Prisma.ToolWhereInput)
    : undefined

  const [tools, totalCount] = await Promise.all([
    findTools({
      orderBy: { [sortBy]: sortOrder },
      where,
      skip,
      take,
    }),

    countTools({
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

          {!tools.length && <EmptyList>No tools found{q ? ` for "${q}"` : ""}.</EmptyList>}
        </Grid>
      </div>

      <Pagination pageSize={perPage} totalCount={totalCount} />
    </Wrapper>
  )
}
