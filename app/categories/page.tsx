import { CategoryCard } from "~/components/cards/category-card"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Wrapper } from "~/components/ui/wrapper"
import { categoryManyPayload } from "~/lib/api"
import { prisma } from "~/services/prisma"

export default async function Categories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: categoryManyPayload,
  })

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
          <CategoryCard key={category.id} category={category} />
        ))}

        {!categories.length && (
          <p className="col-span-full mt-2 text-center text-foreground/65">No categories found.</p>
        )}
      </Grid>
    </Wrapper>
  )
}
