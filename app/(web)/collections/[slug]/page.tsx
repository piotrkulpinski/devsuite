import { notFound } from "next/navigation"
import { findCollectionSlugs, findUniqueCollection } from "~/api/collections/queries"
import { findTools } from "~/api/tools/queries"
import { ToolCard } from "~/components/web/cards/tool-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const collections = await findCollectionSlugs({})
  return collections.map(({ slug }) => ({ slug }))
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params

  const [collection, tools] = await Promise.all([
    findUniqueCollection({ where: { slug } }),
    findTools({ where: { collections: { some: { slug } } } }),
  ])

  if (!collection) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">{collection.name}</IntroTitle>

        <IntroDescription>{collection.description}</IntroDescription>
      </Intro>

      <Grid>
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {!tools.length && <EmptyList>No tools found in the collection.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
