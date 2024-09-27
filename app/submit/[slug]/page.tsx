import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Plan } from "~/components/ui/plan"

export default function SubmitPackages() {
  return (
    <>
      <Intro alignment="center">
        <IntroTitle>Choose a package</IntroTitle>

        <IntroDescription>
          A high-quality website curation is the most important aspect for us. We can&apos;t list
          all sites since it&apos;s a highly curated directory.
        </IntroDescription>
      </Intro>

      <div className="grid gap-6 md:grid-cols-2">
        <Plan
          name="Free"
          description="Free listing with a basic description and a link to your website."
          price={0}
          features={[
            { text: "Basic description", type: "neutral" },
            { text: "Link to your website", type: "neutral" },
            { text: "No featured spot", type: "negative" },
            { text: "No detailed description", type: "negative" },
          ]}
        >
          <Button variant="primary" className="mt-auto w-full opacity-75" asChild>
            <Link href="/submit/thanks">Submit</Link>
          </Button>
        </Plan>

        <Plan
          name="Premium"
          description="Premium listing with a detailed description and a verified badge."
          price={6700}
          discount={27}
          features={[
            { text: "Detailed description", type: "positive" },
            { text: "Link to your website", type: "positive" },
            { text: "Featured spot on homepage", type: "positive" },
            { text: "Verified badge", type: "positive" },
          ]}
          isFeatured
        >
          <Button variant="fancy" className="mt-auto w-full">
            Purchase
          </Button>
        </Plan>
      </div>
    </>
  )
}
