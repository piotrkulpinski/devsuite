import { GiftIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { findToolSlugs, findUniqueTool } from "~/api/tools/queries"
import { SubmitProducts } from "~/app/(web)/submit/[tool]/products"
import { PlanSkeleton } from "~/components/plan"
import { Badge } from "~/components/ui/badge"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Ping } from "~/components/ui/ping"
import { Prose } from "~/components/ui/prose"
import { Wrapper } from "~/components/ui/wrapper"
import { config } from "~/config"
import { isToolPublished } from "~/lib/tools"

export async function generateStaticParams() {
  const tools = await findToolSlugs({})
  return tools.map(({ slug }) => ({ tool: slug }))
}

type SubmitPackagesProps = {
  params: { tool: string }
}

export default async function SubmitPackages({ params }: SubmitPackagesProps) {
  const tool = await findUniqueTool({
    where: {
      slug: params.tool,
      publishedAt: undefined,
      isFeatured: false,
    },
  })

  if (!tool) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center">
        {isToolPublished(tool) ? (
          <>
            <IntroTitle>Boost {tool.name}'s Visibility</IntroTitle>

            <IntroDescription>
              You can upgrade {tool.name}'s listing on {config.site.name} to benefit from a featured
              badge, a prominent placement, and a do-follow link.
            </IntroDescription>
          </>
        ) : (
          <>
            <IntroTitle>Choose a submission package</IntroTitle>

            <IntroDescription>
              Maximize {tool.name}'s impact from day one. Select a package that suits your goals -
              from free listing to premium features.
            </IntroDescription>
          </>
        )}

        <Badge
          size="lg"
          variant="success"
          prefix={<GiftIcon />}
          className="relative mt-1 gap-2 text-sm"
        >
          50% off — Early Bird offer
          <Ping className="absolute -top-1 -left-1 text-yellow-500" />
        </Badge>
      </Intro>

      <div className="flex flex-wrap justify-center gap-6">
        <Suspense fallback={[...Array(3)].map((_, index) => <PlanSkeleton key={index} />)}>
          <SubmitProducts tool={tool} />
        </Suspense>
      </div>

      <Intro alignment="center">
        <IntroTitle size="h3">Have questions?</IntroTitle>

        <Prose>
          <p>
            If you have any questions, please contact us at{" "}
            <Link href={`mailto:${config.site.email}`}>{config.site.email}</Link>.
          </p>
        </Prose>
      </Intro>
    </Wrapper>
  )
}
