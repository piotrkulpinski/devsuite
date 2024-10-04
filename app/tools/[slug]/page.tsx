import { getUrlHostname, slugify } from "@curiousleaf/utils"
import { ArrowUpRightIcon, DollarSignIcon, HashIcon, SparkleIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { findToolSlugs, findUniqueTool } from "~/api/tools/queries"
import { RelatedTools } from "~/app/tools/[slug]/related-tools"
import { ToolSkeleton } from "~/components/cards/tool-skeleton"
import { Nav } from "~/components/nav"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { FaviconImage } from "~/components/ui/favicon"
import { Gallery } from "~/components/ui/gallery"
import { Grid } from "~/components/ui/grid"
import { H2, H4 } from "~/components/ui/heading"
import { IntroDescription } from "~/components/ui/intro"
import { Markdown } from "~/components/ui/markdown"
import { Stack } from "~/components/ui/stack"
import { Wrapper } from "~/components/ui/wrapper"
import { prisma } from "~/services/prisma"
import { SITE_NAME } from "~/utils/constants"
import { updateUrlWithSearchParams } from "~/utils/query-string"

export async function generateStaticParams() {
  const tools = await findToolSlugs({})
  return tools.map(({ slug }) => ({ slug }))
}

export default async function ToolPage({ params: { slug } }: { params: { slug: string } }) {
  const tool = await findUniqueTool({ where: { slug } })

  if (!tool) {
    notFound()
  }

  const [previous, next] = await Promise.all([
    prisma.tool.findFirst({
      select: { slug: true },
      where: { id: { lt: tool.id } },
      orderBy: { id: "desc" },
      take: 1,
    }),

    prisma.tool.findFirst({
      select: { slug: true },
      where: { id: { gt: tool.id } },
      orderBy: { id: "asc" },
      take: 1,
    }),
  ])

  const websiteUrl = tool.affiliateUrl || tool.websiteUrl
  const tags = [
    "ab-testing",
    "analytics",
    "experiments",
    "feature-flags",
    "javascript",
    "python",
    "react",
    "session-replay",
    "typescript",
  ]

  return (
    <>
      <Wrapper size="sm">
        <div className="flex w-full flex-col items-start gap-y-4">
          <Stack size="lg" className="relative w-full justify-between">
            <Stack size="lg">
              {tool.faviconUrl && (
                <FaviconImage src={tool.faviconUrl} className="size-10 rounded-md" />
              )}

              <H2 as="h1" className="!leading-snug -my-1.5">
                {tool.name}
              </H2>
            </Stack>

            <Button size="md" variant="primary" suffix={<ArrowUpRightIcon />} asChild>
              <a
                href={updateUrlWithSearchParams(websiteUrl, { ref: slugify(SITE_NAME) })}
                target="_blank"
                rel="nofollow noreferrer"
              >
                {getUrlHostname(websiteUrl)}
              </a>
            </Button>
          </Stack>

          <IntroDescription>{tool.description}</IntroDescription>

          <Stack className="mt-4">
            {tool.isFeatured && (
              <Badge variant="outline" prefix={<SparkleIcon className="text-yellow-500" />}>
                Featured
              </Badge>
            )}

            {tool.collections.map(collection => (
              <Badge key={collection.id} variant="outline" asChild>
                <Link href={`/collections/${collection.slug}`}>{collection.name}</Link>
              </Badge>
            ))}

            <Badge variant="ghost" prefix={<DollarSignIcon className="text-green-500" />}>
              free + from $9/mo
            </Badge>
          </Stack>
        </div>

        <Gallery images={[...tool.images, ...tool.images, ...tool.images, ...tool.images]} />

        {tool.content && <Markdown>{tool.content}</Markdown>}

        <nav className="flex flex-wrap gap-y-2 gap-x-4">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="flex items-center gap-0.5 text-foreground/65 text-sm hover:text-foreground"
            >
              <HashIcon className="opacity-30" />
              {tag}
            </Link>
          ))}
        </nav>
      </Wrapper>

      <Nav
        className="sticky bottom-4 z-30 mx-auto mt-auto"
        tool={tool}
        previous={previous?.slug}
        next={next?.slug}
      />

      <Suspense
        fallback={
          <div className="flex flex-col gap-6 items-center">
            <H4 as="h3" className="text-center">
              Other Alternatives to {tool.name}:
            </H4>

            <Grid className="w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <ToolSkeleton key={index} />
              ))}
            </Grid>
          </div>
        }
      >
        <RelatedTools tool={tool} />
      </Suspense>
    </>
  )
}
