import { Link, json, unstable_useViewTransitionState, useLoaderData } from "@remix-run/react"
import { ArrowUpRightIcon, DollarSignIcon, HashIcon, SparkleIcon } from "lucide-react"
import { Button } from "~/components/Button"
import { Favicon } from "~/components/Favicon"
import { Gallery } from "~/components/Gallery"
import { H2, H4 } from "~/components/Heading"
import { Prose } from "~/components/Prose"
import { Series } from "~/components/Series"
import { Wrapper } from "~/components/Wrapper"
import { Nav } from "~/partials/Nav"
import { LoaderFunctionArgs } from "@remix-run/node"
import { prisma } from "~/services.server/prisma"
import { getRelatedTools, toolOnePayload } from "~/services.server/api"
import { JSON_HEADERS, SITE_NAME } from "~/utils/constants"
import { getUrlHostname } from "~/utils/helpers"
import { Badge } from "~/components/Badge"
import { slugify } from "@curiousleaf/utils"
import { updateUrlWithSearchParams } from "~/utils/query-string"
import { ToolCard } from "~/partials/cards/ToolCard"
import { Grid } from "~/components/Grid"

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  try {
    const tool = await prisma.tool.findUniqueOrThrow({
      where: { slug, publishedAt: { lte: new Date() } },
      include: toolOnePayload,
    })

    const [prevTool, nextTool, relatedTools] = await Promise.all([
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

      getRelatedTools(tool),
    ])

    // const meta = {
    //   title: `${tool.name}: Open Source Alternative ${
    //     alternatives.length
    //       ? `to ${alternatives.map(({ alternative }) => alternative?.name).join(", ")}`
    //       : ""
    //   }`,
    // }

    return json(
      { tool, previous: prevTool?.slug, next: nextTool?.slug, relatedTools },
      { headers: JSON_HEADERS }
    )
  } catch (error) {
    console.error(error)
    throw json(null, { status: 404, statusText: "Not Found" })
  }
}

export default function ToolPage() {
  const { tool, previous, next, relatedTools } = useLoaderData<typeof loader>()
  const vt = unstable_useViewTransitionState(`/${tool.slug}`)

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
      <Wrapper
        className="flex flex-col gap-12 flex-1"
        style={{ viewTransitionName: vt ? `tool-${tool.id}` : undefined }}
      >
        <div className="flex w-full flex-col items-start gap-y-4">
          <Series size="lg" className="relative w-full justify-between">
            <Series>
              {tool.faviconUrl && (
                <Favicon
                  src={tool.faviconUrl}
                  style={{ viewTransitionName: vt ? `tool-${tool.id}-favicon` : undefined }}
                  className="size-10"
                />
              )}

              <H2
                as="h1"
                className="!leading-snug -my-1.5"
                style={{ viewTransitionName: vt ? `tool-${tool.id}-name` : undefined }}
              >
                {tool.name}
              </H2>
            </Series>

            <Button size="md" variant="primary" suffix={<ArrowUpRightIcon />} asChild>
              <a
                href={updateUrlWithSearchParams(websiteUrl, { ref: slugify(SITE_NAME) })}
                target="_blank"
                rel="nofollow noreferrer"
              >
                {getUrlHostname(websiteUrl)}
              </a>
            </Button>
          </Series>

          <h2
            className="text-foreground/70 md:text-lg"
            style={{ viewTransitionName: vt ? `tool-${tool.id}-description` : undefined }}
          >
            {tool.description}
          </h2>

          <Series
            size="sm"
            className="mt-4"
            style={{ viewTransitionName: vt ? `tool-${tool.id}-features` : undefined }}
          >
            {tool.isOpenSource && (
              <Badge>
                <SparkleIcon className="text-yellow-500" /> Open Source
              </Badge>
            )}

            <Badge variant="ghost">
              <DollarSignIcon className="text-green-500" /> free + from $9/mo
            </Badge>
          </Series>
        </div>

        <Gallery images={tool.images} />

        {tool.content && <Prose dangerouslySetInnerHTML={{ __html: tool.content }} />}

        <nav className="flex flex-wrap gap-y-2 gap-x-4">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag}`}
              className="flex items-center gap-0.5 text-foreground/70 text-sm hover:text-foreground"
            >
              <HashIcon className="opacity-30" />
              {tag}
            </Link>
          ))}
        </nav>
      </Wrapper>

      <Nav className="sticky bottom-4 z-30 mx-auto mt-auto" previous={previous} next={next} />

      {!!relatedTools.length && (
        <Series size="lg" direction="column" className="items-center">
          <H4 as="h3" className="text-center">
            Other Alternatives to {tool.name}:
          </H4>

          <Grid className="w-full">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} isRelated />
            ))}
          </Grid>
        </Series>
      )}
    </>
  )
}
