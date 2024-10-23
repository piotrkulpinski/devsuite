import { notFound } from "next/navigation"
import { findCategorySlugs, findUniqueCategory } from "~/api/categories/queries"
import { findTools } from "~/api/tools/queries"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const categories = await findCategorySlugs({})
  return categories.map(({ slug }) => ({ slug }))
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params

  const [category, tools] = await Promise.all([
    findUniqueCategory({ where: { slug } }),
    findTools({ where: { categories: { some: { slug } } } }),
  ])

  if (!category) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{category.name}</IntroTitle>

        <IntroDescription>{category.description}</IntroDescription>
      </Intro>

      <Grid>
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {!tools.length && <EmptyList>No tools found in the category.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
