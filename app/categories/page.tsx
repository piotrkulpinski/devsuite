import { CategoryCard } from "~/components/cards/category-card"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { categoryManyPayload } from "~/lib/api"
import { prisma } from "~/services/prisma"

export default async function Categories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: categoryManyPayload,
  })

  return (
    <div className="flex flex-col gap-12">
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
      </Grid>
    </div>
  )
}
