import Link from "next/link"
import { notFound } from "next/navigation"
import { findUniqueTool } from "~/api/tools/queries"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"
import { config } from "~/config"

type SubmitThanksProps = {
  params: { tool: string }
}

export default async function SubmitThanks({ params }: SubmitThanksProps) {
  const tool = await findUniqueTool({
    where: {
      slug: params.tool,
      publishedAt: undefined,
    },
  })

  if (!tool) {
    notFound()
  }

  return (
    <Wrapper size="md">
      <Intro alignment="center">
        {tool.isFeatured ? (
          <>
            <IntroTitle>Thank you for your payment!</IntroTitle>

            <IntroDescription>
              We've received your payment. {tool.name} should be featured on {config.site.name}{" "}
              shortly. If you have any questions, please contact us at{" "}
              <Link href={`mailto:${config.site.email}`}>{config.site.email}</Link>.
            </IntroDescription>
          </>
        ) : (
          <>
            <IntroTitle>Thank you for submitting {tool.name}!</IntroTitle>

            <IntroDescription>
              We've received your submission. We'll review it shortly and get back to you with any
              questions or feedback.
            </IntroDescription>
          </>
        )}
      </Intro>

      <img src="/_static/3d-heart.webp" alt="" className="max-w-64 w-2/3 h-auto mx-auto" />
    </Wrapper>
  )
}
