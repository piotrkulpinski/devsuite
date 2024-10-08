import { GiftIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { findToolSlugs, findUniqueTool } from "~/api/tools/queries"
import { Plan } from "~/components/plan"
import { Badge } from "~/components/ui/badge"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Ping } from "~/components/ui/ping"
import { Prose } from "~/components/ui/prose"
import { Wrapper } from "~/components/ui/wrapper"
import { config } from "~/config"

export async function generateStaticParams() {
  const tools = await findToolSlugs({})
  return tools.map(({ slug }) => ({ slug }))
}

type SubmitPackagesProps = {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}

export default async function SubmitPackages({ params, searchParams }: SubmitPackagesProps) {
  const tool = await findUniqueTool({
    where: {
      slug: params.slug,
      publishedAt: undefined,
      isFeatured: false,
    },
  })

  if (!tool) {
    notFound()
  }

  const isPublished = tool.publishedAt && tool.publishedAt <= new Date()

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>
          {isPublished ? `Boost ${tool.name}'s Visibility` : `Choose a package for ${tool.name}`}
        </IntroTitle>

        <IntroDescription>
          {isPublished
            ? `Elevate ${tool.name}'s presence on ${config.site.name}. Choose a featured package to increase visibility, attract more users, and stand out from the competition. Benefit from premium placement, a featured badge, and a do-follow link.`
            : `Maximize ${tool.name}'s impact from day one. Select a package that suits your goals - from free listings to premium features. Expedite your launch, gain visibility, and start connecting with your target audience faster.`}
        </IntroDescription>

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
        <Plan
          name="Free"
          description="Free listing with a basic description and a link to your website."
          prices={[]}
          features={[
            { text: "30-day processing time", type: "neutral" },
            { text: "Link to your website", type: "neutral" },
            { text: "No content updates", type: "negative" },
            { text: "No featured spot", type: "negative" },
            { text: "No featured badge", type: "negative" },
          ]}
          buttonProps={{
            variant: "secondary",
            disabled: true,
            children: "Current package",
          }}
        />

        {!isPublished && (
          <Plan
            name="Standard"
            description="Skip the queue and get your site published on the site within 24 hours."
            prices={[{ price: 9700, priceId: "price_1Q7CtHDUyMoajCx1CWZch7qn" }]}
            features={[
              { text: "24h processing time", type: "positive" },
              { text: "Unlimited content updates", type: "positive" },
              { text: "Do-follow link to your website", type: "negative" },
              { text: "No featured spot", type: "negative" },
              { text: "No featured badge", type: "negative" },
            ]}
            isFeatured={!isPublished}
            buttonProps={{
              variant: "primary",
              children: "Expedite Listing",
            }}
          />
        )}

        <Plan
          name="Featured"
          description="Featured listing with a homepage spot and a featured badge."
          prices={[
            { interval: "month", price: 19700, priceId: "price_1Q7CwiDUyMoajCx14a53vJJF" },
            { interval: "year", price: 197000, priceId: "price_1Q7CwiDUyMoajCx1M48a1Fv4" },
          ]}
          features={[
            { text: "12h processing time", type: "positive" },
            { text: "Unlimited content updates", type: "positive" },
            { text: "Do-follow link to your website", type: "positive" },
            { text: "Featured spot on homepage", type: "positive" },
            { text: "Featured badge", type: "positive" },
          ]}
          isFeatured={!!isPublished}
          buttonProps={{
            variant: "primary",
            children: tool.publishedAt ? "Upgrade to Featured" : "List as Featured",
          }}
        />
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
