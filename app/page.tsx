import Link from "next/link"
import { CategoryCard } from "~/components/cards/category-card"
import { ToolCard } from "~/components/cards/tool-card"
import { NewsletterForm } from "~/components/newsletter-form"
import { Badge } from "~/components/ui/badge"
import { Grid } from "~/components/ui/grid"
import { H3, H4 } from "~/components/ui/heading"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Ping } from "~/components/ui/ping"
import { categoryManyPayload, toolManyPayload } from "~/lib/api"
import { prisma } from "~/services/prisma"
import { SITE_DESCRIPTION, SITE_TAGLINE } from "~/utils/constants"

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: categoryManyPayload,
  })

  const tools = await prisma.tool.findMany({
    where: { isFeatured: true, publishedAt: { lte: new Date() } },
    include: toolManyPayload,
    take: 6,
  })

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

        <Badge
          className="order-first inline-flex items-center gap-1.5 px-2 py-1 rounded-md"
          asChild
        >
          <Link href="/latest">
            <Ping /> {2} new tools added
          </Link>
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
            <CategoryCard key={i} category={category} />
          ))}
        </Grid>
      </div>
    </>
  )
}
