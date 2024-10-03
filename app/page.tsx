import { formatNumber } from "@curiousleaf/utils"
import { subDays } from "date-fns"
import Link from "next/link"
import plur from "plur"
import { findCategories } from "~/api/categories/queries"
import { countTools, findTools } from "~/api/tools/queries"
import { CategoryCard } from "~/components/cards/category-card"
import { ToolCard } from "~/components/cards/tool-card"
import { NewsletterForm } from "~/components/newsletter-form"
import { Badge } from "~/components/ui/badge"
import { Grid } from "~/components/ui/grid"
import { H3, H4 } from "~/components/ui/heading"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Ping } from "~/components/ui/ping"
import { SITE_DESCRIPTION, SITE_TAGLINE } from "~/utils/constants"

export default async function Home() {
  const [categories, tools, toolsCount, newToolsCount] = await Promise.all([
    findCategories({}),
    findTools({ where: { isFeatured: true }, take: 6 }),
    countTools({ where: { publishedAt: { lte: new Date() } } }),
    countTools({ where: { publishedAt: { lte: new Date(), gte: subDays(new Date(), 7) } } }),
  ])

  return (
    <>
      <Intro alignment="center" className="mb-[2.5vh] text-pretty">
        <IntroTitle className="max-w-2xl">{SITE_TAGLINE}</IntroTitle>
        <IntroDescription>{SITE_DESCRIPTION}</IntroDescription>

        <NewsletterForm
          buttonProps={{ children: "Join our community", size: "md" }}
          className="mt-4 mx-auto"
        />

        <Badge size="lg" prefix={<Ping className="mr-1" />} className="order-first" asChild>
          <Link href="/tools?sort=publishedAt_desc">
            {newToolsCount
              ? `${newToolsCount} new ${plur("tool", newToolsCount)} added`
              : `${formatNumber(toolsCount)}+ developer tools`}
          </Link>
        </Badge>
      </Intro>

      {!!tools.length && (
        <div className="flex flex-col gap-8">
          <H4 className="text-center">Featured Tools</H4>

          <Grid>
            {tools.map((tool, i) => (
              <ToolCard key={i} tool={tool} />
            ))}
          </Grid>
        </div>
      )}

      {!!categories.length && (
        <div className="flex flex-col gap-6">
          <H3 className="text-center">Browse Categories</H3>

          <Grid>
            {categories.map((category, i) => (
              <CategoryCard key={i} href={`/categories/${category.slug}`} category={category} />
            ))}
          </Grid>
        </div>
      )}
    </>
  )
}
