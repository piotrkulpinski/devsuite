import { findCategories } from "~/api/categories/queries"
import { CategoryCard } from "~/components/web/cards/category-card"
import { EmptyList } from "~/components/web/empty-list"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"

export default async function Categories() {
  const categories = await findCategories({})

  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">Developer Tools by Category</IntroTitle>

        <IntroDescription>
          Browse top categories of developer tools. Stop wasting time and money by developing tools
          that already exist.
        </IntroDescription>
      </Intro>

      <Grid>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            href={`/categories/${category.slug}`}
            category={category}
          />
        ))}

        {!categories.length && <EmptyList>No categories found.</EmptyList>}
      </Grid>
    </Wrapper>
  )
}
