import { notFound } from "next/navigation"
import { findCategorySlugs, findUniqueCategory } from "~/api/categories/queries"
import { findTools } from "~/api/tools/queries"
import { ToolCard } from "~/components/cards/tool-card"
import { EmptyList } from "~/components/empty-list"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Wrapper } from "~/components/ui/wrapper"

export async function generateStaticParams() {
  const categories = await findCategorySlugs({})
  return categories.map(({ slug }) => ({ slug }))
}

export default async function CategoryPage({ params: { slug } }: { params: { slug: string } }) {
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
