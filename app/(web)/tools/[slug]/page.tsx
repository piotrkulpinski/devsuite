import { getUrlHostname } from "@curiousleaf/utils"
import { formatDistanceToNowStrict } from "date-fns"
import { ArrowUpRightIcon, DollarSignIcon, HashIcon, SparkleIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { z } from "zod"
import { findFirstTool, findToolSlugs, findUniqueTool } from "~/api/tools/queries"
import { RelatedTools } from "~/app/(web)/tools/[slug]/related-tools"
import { H2, H4 } from "~/components/common/heading"
import { Markdown } from "~/components/common/markdown"
import { Stack } from "~/components/common/stack"
import { ToolSkeleton } from "~/components/web/cards/tool-skeleton"
import { Nav } from "~/components/web/nav"
import { Badge } from "~/components/web/ui/badge"
import { Button } from "~/components/web/ui/button"
import { FaviconImage } from "~/components/web/ui/favicon"
import { Gallery } from "~/components/web/ui/gallery"
import { Grid } from "~/components/web/ui/grid"
import { IntroDescription } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"

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
    findFirstTool({
      where: { id: { lt: tool.id } },
      select: { slug: true },
      orderBy: { id: "desc" },
    }),

    findFirstTool({
      where: { id: { gt: tool.id } },
      select: { slug: true },
      orderBy: { id: "asc" },
    }),
  ])

  const websiteUrl = tool.affiliateUrl || tool.websiteUrl

  const socials = z
    .array(z.object({ url: z.string(), name: z.string() }))
    .nullable()
    .safeParse(tool.socials)

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

            <Stack size="sm" className="items-stretch">
              <Button size="md" variant="primary" suffix={<ArrowUpRightIcon />} asChild>
                <a href={websiteUrl} target="_blank" rel="nofollow noreferrer">
                  {getUrlHostname(websiteUrl)}
                </a>
              </Button>
            </Stack>
          </Stack>

          <IntroDescription>{tool.description}</IntroDescription>

          <div className="flex items-center justify-between gap-4 w-full mt-4">
            <Stack>
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

              {tool.pricing && (
                <Badge variant="ghost" prefix={<DollarSignIcon className="text-green-500" />}>
                  {tool.pricing}
                </Badge>
              )}
            </Stack>

            {/* {!!socials.data?.length && (
              <Stack size="sm">
                {socials.data.map(({ url, name }) => (
                  <Button key={url} size="md" variant="secondary" suffix={<EllipsisIcon />}>
                    More
                  </Button>
                ))}
              </Stack>
            )} */}
          </div>
        </div>

        {tool.screenshotUrl && <Gallery images={[tool.screenshotUrl]} />}

        {tool.content && <Markdown>{tool.content}</Markdown>}

        {!!tool.tags.length && (
          <nav className="flex flex-wrap gap-y-2 gap-x-4">
            {tool.tags.map(tag => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="flex items-center gap-0.5 text-foreground/65 text-sm hover:text-foreground"
              >
                <HashIcon className="opacity-30" />
                {tag.slug}
              </Link>
            ))}
          </nav>
        )}

        {!!tool.categories.length && (
          <nav className="flex flex-wrap gap-y-2 gap-x-4">
            {tool.categories.map(category => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </nav>
        )}

        {!!tool.collections.length && (
          <nav className="flex flex-wrap gap-y-2 gap-x-4">
            {tool.collections.map(collection => (
              <Link key={collection.id} href={`/collections/${collection.slug}`}>
                {collection.name}
              </Link>
            ))}
          </nav>
        )}

        <p className="text-foreground/50 text-sm">
          Last updated: {formatDistanceToNowStrict(tool.updatedAt, { addSuffix: true })}
        </p>

        <Nav
          className="sticky bottom-4 z-30 mx-auto"
          tool={tool}
          previous={previous?.slug}
          next={next?.slug}
        />
      </Wrapper>

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
