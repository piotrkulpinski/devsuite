import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Plan } from "~/components/ui/plan"
import { Wrapper } from "~/components/ui/wrapper"

export default function SubmitPackages() {
  return (
    <Wrapper>
      <Intro alignment="center">
        <IntroTitle>Choose a package</IntroTitle>

        <IntroDescription>
          A high-quality website curation is the most important aspect for us. We can&apos;t list
          all sites since it&apos;s a highly curated directory.
        </IntroDescription>
      </Intro>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Plan
          name="Free"
          description="Free listing with a basic description and a link to your website."
          price={0}
          features={[
            { text: "2 weeks processing time", type: "neutral" },
            { text: "Link to your website", type: "neutral" },
            { text: "No featured spot", type: "negative" },
            { text: "No featured badge", type: "negative" },
          ]}
        >
          <Button variant="secondary" className="mt-auto w-full" asChild>
            <Link href="/submit/thanks">Submit for free</Link>
          </Button>
        </Plan>

        <Plan
          name="Standard"
          description="Skips the queue and gets your site published on the site within 24 hours."
          price={6700}
          discount={27}
          features={[
            { text: "24h processing time", type: "positive" },
            { text: "Do-follow link to your website", type: "positive" },
            { text: "No featured spot", type: "negative" },
            { text: "No featured badge", type: "negative" },
          ]}
        >
          <Button variant="primary" className="mt-auto w-full">
            Purchase
          </Button>
        </Plan>

        <Plan
          name="Featured"
          description="Featured listing with a homepage spot and a featured badge."
          price={20400}
          discount={27}
          features={[
            { text: "12h processing time", type: "positive" },
            { text: "Do-follow link to your website", type: "positive" },
            { text: "Featured spot on homepage", type: "positive" },
            { text: "Featured badge", type: "positive" },
          ]}
          isSubscription
          isFeatured
        >
          <Button variant="primary" className="mt-auto w-full">
            Subscribe
          </Button>
        </Plan>
      </div>
    </Wrapper>
  )
}
