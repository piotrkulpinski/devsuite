import { Link, json, useLoaderData } from "@remix-run/react"
import { ArrowUpRightIcon, DollarSignIcon, HashIcon, SparkleIcon } from "lucide-react"
import { Button } from "~/components/Button"
import { Favicon } from "~/components/Favicon"
import { Gallery } from "~/components/Gallery"
import { H2 } from "~/components/Heading"
import { Prose } from "~/components/Prose"
import { Series } from "~/components/Series"
import { Wrapper } from "~/components/Wrapper"
import { Nav } from "~/partials/Nav"
import { LoaderFunctionArgs } from "@remix-run/node"
import { prisma } from "~/services.server/prisma"
import { toolOnePayload } from "~/services.server/api"
import { JSON_HEADERS, SITE_NAME } from "~/utils/constants"
import { getUrlHostname } from "~/utils/helpers"
import { Badge } from "~/components/Badge"
import { slugify } from "@curiousleaf/utils"
import { updateUrlWithSearchParams } from "~/utils/query-string"

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  try {
    const tool = await prisma.tool.findUniqueOrThrow({
      where: { slug },
      include: toolOnePayload,
    })

    const [prevTool, nextTool] = await Promise.all([
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

    // const meta = {
    //   title: `${tool.name}: Open Source Alternative ${
    //     alternatives.length
    //       ? `to ${alternatives.map(({ alternative }) => alternative?.name).join(", ")}`
    //       : ""
    //   }`,
    // }

    return json({ tool, previous: prevTool?.slug, next: nextTool?.slug }, { headers: JSON_HEADERS })
  } catch (error) {
    console.error(error)
    throw json(null, { status: 404, statusText: "Not Found" })
  }
}

export default function ToolPage() {
  const { tool, previous, next } = useLoaderData<typeof loader>()

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
      <Wrapper className="flex flex-col gap-12 flex-1">
        <div className="flex w-full flex-col gap-y-4" style={{ viewTransitionName: "tool" }}>
          <Series size="lg" className="relative w-full">
            {tool.faviconUrl && (
              <Favicon
                src={tool.faviconUrl}
                style={{ viewTransitionName: "tool-favicon" }}
                className="size-10"
              />
            )}

            <H2 as="h1" className="relative flex-1" style={{ viewTransitionName: "tool-name" }}>
              {tool.name}
            </H2>

            {websiteUrl && (
              <Button
                size="md"
                variant="primary"
                suffix={<ArrowUpRightIcon />}
                className="ml-auto"
                asChild
              >
                <a
                  href={updateUrlWithSearchParams(websiteUrl, { ref: slugify(SITE_NAME) })}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  {getUrlHostname(websiteUrl)}
                </a>
              </Button>
            )}
          </Series>

          <h2
            className="text-foreground/70 md:text-lg"
            style={{ viewTransitionName: "tool-description" }}
          >
            {tool.description}
          </h2>

          <Series className="mt-4">
            {tool.isOpenSource && (
              <Badge>
                <SparkleIcon className="inline-flex text-yellow-500" /> Open Source
              </Badge>
            )}

            <span className="flex items-center gap-1 text-xs">
              <DollarSignIcon className="inline-flex text-green-500" /> free + from $9/mo
            </span>
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

      {/* <Grid>
          {Array.from({ length: 3 }).map((_, i) => (
            <ToolCard key={i} />
          ))}
        </Grid> */}
    </>
  )
}
