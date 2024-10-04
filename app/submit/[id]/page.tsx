import Link from "next/link"
import { notFound } from "next/navigation"
import { findToolSlugs, findUniqueTool } from "~/api/tools/queries"
import { Plan } from "~/components/plan"
import { Button } from "~/components/ui/button"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Prose } from "~/components/ui/prose"
import { Wrapper } from "~/components/ui/wrapper"
import { SITE_EMAIL } from "~/utils/constants"

export async function generateStaticParams() {
  const tools = await findToolSlugs({ where: { publishedAt: null } })
  return tools.map(({ slug }) => ({ slug }))
}

export default async function SubmitPackages({ params: { id } }: { params: { id: string } }) {
  const tool = await findUniqueTool({
    where: { id, publishedAt: null },
  })

  if (!tool) {
    notFound()
  }

  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>Choose a package for {tool.name}</IntroTitle>

        <IntroDescription>
          A high-quality website curation is the most important aspect for us. We can&apos;t list
          all sites since it&apos;s a highly curated directory.
        </IntroDescription>
      </Intro>

      <div className="flex flex-wrap justify-center gap-6">
        <Plan
          name="Free"
          description="Free listing with a basic description and a link to your website."
          price={0}
          features={[
            { text: "2 weeks processing time", type: "neutral" },
            { text: "Link to your website", type: "neutral" },
            { text: "No content updates", type: "negative" },
            { text: "No featured spot", type: "negative" },
            { text: "No featured badge", type: "negative" },
          ]}
        >
          <Button variant="secondary" className="mt-auto w-full" asChild>
            <Link href="/submit/thanks">Submit for Free</Link>
          </Button>
        </Plan>

        <Plan
          name="Standard"
          description="Skips the queue and gets your site published on the site within 24 hours."
          price={4700}
          // discount={27}
          features={[
            { text: "24h processing time", type: "positive" },
            { text: "Do-follow link to your website", type: "positive" },
            { text: "Unlimited content updates", type: "positive" },
            { text: "No featured spot", type: "negative" },
            { text: "No featured badge", type: "negative" },
          ]}
        >
          <Button variant="primary" className="mt-auto w-full">
            Expedite Submission
          </Button>
        </Plan>

        <Plan
          name="Featured"
          description="Featured listing with a homepage spot and a featured badge."
          price={[
            { interval: "month", price: 9700, priceId: "" },
            { interval: "year", price: 97000, priceId: "" },
          ]}
          // discount={27}
          features={[
            { text: "12h processing time", type: "positive" },
            { text: "Do-follow link to your website", type: "positive" },
            { text: "Unlimited content updates", type: "positive" },
            { text: "Featured spot on homepage", type: "positive" },
            { text: "Featured badge", type: "positive" },
          ]}
          isSubscription
          isFeatured
        >
          <Button variant="primary" className="mt-auto w-full">
            Feature Submission
          </Button>
        </Plan>
      </div>

      <Intro alignment="center">
        <IntroTitle size="h3">Frequently Asked Questions</IntroTitle>
      </Intro>

      <Intro alignment="center">
        <IntroTitle size="h3">Have questions?</IntroTitle>

        <Prose>
          <p>
            If you have any questions, please contact us at{" "}
            <Link href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</Link>.
          </p>
        </Prose>
      </Intro>
    </Wrapper>
  )
}
