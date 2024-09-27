import { SearchIcon } from "lucide-react"
import Link from "next/link"
import { CategoryCard } from "~/components/cards/category-card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/forms/input"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Ping } from "~/components/ui/ping"
import { categoryManyPayload } from "~/lib/api"
import { prisma } from "~/services/prisma"
import { SITE_DESCRIPTION, SITE_TAGLINE } from "~/utils/constants"

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: categoryManyPayload,
  })

  return (
    <>
      <Intro alignment="center" className="max-w-2xl my-[2vh] text-pretty">
        <IntroTitle>{SITE_TAGLINE}</IntroTitle>
        <IntroDescription>{SITE_DESCRIPTION}</IntroDescription>

        <div className="mt-4 relative w-full max-w-md mx-auto">
          <Input
            size="lg"
            shape="rounded"
            placeholder="Search for tools..."
            className="w-full pr-10"
          />

          <SearchIcon className="absolute top-1/2 right-4 -translate-y-1/2 size-4 pointer-events-none" />
        </div>

        <Badge
          className="order-first inline-flex items-center gap-1.5 px-2 py-1 rounded-md"
          asChild
        >
          <Link href="/latest">
            <Ping /> {2} new tools added
          </Link>
        </Badge>
      </Intro>

      <Grid>
        {categories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </Grid>
    </>
  )
}
