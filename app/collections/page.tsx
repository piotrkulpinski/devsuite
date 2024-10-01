import { findCollections } from "~/api/collections/queries"
import { CategoryCard } from "~/components/cards/category-card"
import { EmptyList } from "~/components/empty-list"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Wrapper } from "~/components/ui/wrapper"

export default async function Collections() {
  const collections = await findCollections({})

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">Developer Tools by Collection</IntroTitle>

        <IntroDescription>
          Browse top collections of developer tools. Stop wasting time and money by developing tools
          that already exist.
        </IntroDescription>
      </Intro>

      <Grid>
        {collections.map(collection => (
          <CategoryCard
            key={collection.id}
            href={`/collections/${collection.slug}`}
            category={collection}
          />
        ))}

        {!collections.length && <EmptyList>No collections found.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
