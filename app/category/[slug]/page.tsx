import { notFound } from "next/navigation"
import { ToolCard } from "~/components/cards/tool-card"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { categoryOnePayload } from "~/lib/api"
import { prisma } from "~/services/prisma"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, tools] = await Promise.all([
    prisma.category.findUnique({
      where: { slug: params.slug },
      include: categoryOnePayload,
    }),

    prisma.tool.findMany({
      where: {
        categories: { some: { slug: params.slug } },
        publishedAt: { lte: new Date() },
      },
    }),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-12">
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{category.name}</IntroTitle>

        <IntroDescription>{category.description}</IntroDescription>
      </Intro>

      <Grid>
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </Grid>
    </div>
  )
}
