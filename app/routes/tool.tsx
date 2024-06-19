import type { MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { ArrowUpRightIcon, HashIcon } from "lucide-react"
import { Button } from "~/components/Button"
import { Favicon } from "~/components/Favicon"
import { Gallery } from "~/components/Gallery"
import { Grid } from "~/components/Grid"
import { H2 } from "~/components/Heading"
import { Prose } from "~/components/Prose"
import { Series } from "~/components/Series"
import { Wrapper } from "~/components/Wrapper"
import { Nav } from "~/partials/Nav"
import { ToolCard } from "~/partials/cards/ToolCard"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Tool() {
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
      <Wrapper className="flex flex-col gap-12">
        <div className="flex w-full flex-col gap-y-4">
          <Series size="lg" className="relative w-full">
            <Favicon
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=posthog.com`}
              style={{ viewTransitionName: "tool-favicon" }}
              className="size-10"
            />
            <H2 as="h1" className="relative flex-1">
              Posthog
            </H2>
            <Button
              size="md"
              variant="primary"
              suffix={<ArrowUpRightIcon />}
              className="ml-auto"
              asChild
            >
              <a href="https://posthog.com">www.posthog.com</a>
            </Button>
          </Series>

          <h2 className="text-foreground/70 md:text-lg">
            PostHog provides open-source product analytics, session recording, feature flagging and
            A/B testing that you can self-host.
          </h2>
        </div>

        <Gallery
          images={[
            "/media/screenshot-1.webp",
            "/media/screenshot-2.avif",
            "/media/screenshot-1.webp",
            "/media/screenshot-2.avif",
          ]}
        />

        <Prose>
          <p>
            PostHog is an open-source product analytics platform that helps businesses understand
            user behavior and optimize their products for growth. With PostHog, companies can track
            user interactions, analyze product usage, and make data-driven decisions to improve user
            experience and increase retention.
          </p>

          <p>Key features of PostHog include:</p>

          <ol>
            <li>
              Event tracking: Easily track user actions and custom events across web and mobile
              applications.
            </li>
            <li>
              Auto-capture: Automatically record user interactions without the need for manual
              instrumentation.
            </li>
            <li>
              Funnels and paths: Visualize user journeys, identify drop-off points, and optimize
              conversion funnels.
            </li>
            <li>
              Session recording: Replay user sessions to understand user behavior and identify areas
              for improvement.
            </li>
            <li>
              Feature flags: Safely roll out new features to a subset of users and measure their
              impact before full release.
            </li>
            <li>
              Self-hosting: Deploy PostHog on your own infrastructure for complete control over data
              privacy and security.
            </li>
            <li>
              Integrations: Connect PostHog with popular tools like Slack, GitHub, and Stripe for
              seamless workflow integration.
            </li>
          </ol>

          <p>
            PostHog is designed to be developer-friendly and highly customizable, making it suitable
            for businesses of all sizes across various industries. Its open-source nature and
            transparent pricing model make it an attractive alternative to proprietary product
            analytics solutions.
          </p>
        </Prose>

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

      <Nav className="sticky bottom-4 z-30 mx-auto mt-auto" />

      <Grid>
        {Array.from({ length: 3 }).map((_, i) => (
          <ToolCard key={i} />
        ))}
      </Grid>
    </>
  )
}
