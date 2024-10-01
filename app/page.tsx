import Link from "next/link"
import { findCategories } from "~/api/categories/queries"
import { findTools } from "~/api/tools/queries"
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
  const [categories, tools] = await Promise.all([
    findCategories({}),
    findTools({ where: { isFeatured: true }, take: 6 }),
  ])

  return (
    <>
      <Intro alignment="center" className="max-w-2xl mb-[2.5vh] text-pretty">
        <IntroTitle>{SITE_TAGLINE}</IntroTitle>
        <IntroDescription>{SITE_DESCRIPTION}</IntroDescription>

        <NewsletterForm
          size="lg"
          buttonProps={{ children: "Join our community", size: "md" }}
          className="mt-4 mx-auto"
        />

        <Badge size="lg" prefix={<Ping />} className="order-first" asChild>
          <Link href="/tools">{2} new tools added</Link>
        </Badge>
      </Intro>

      <div className="flex flex-col gap-8">
        <H4 className="text-center">Featured Tools</H4>

        <Grid>
          {tools.map((tool, i) => (
            <ToolCard key={i} tool={tool} />
          ))}
        </Grid>
      </div>

      <div className="flex flex-col gap-6">
        <H3 className="text-center">Browse Categories</H3>

        <Grid>
          {categories.map((category, i) => (
            <CategoryCard key={i} href={`/categories/${category.slug}`} category={category} />
          ))}
        </Grid>
      </div>
    </>
  )
}
