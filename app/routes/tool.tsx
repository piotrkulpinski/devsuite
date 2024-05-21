import type { MetaFunction } from "@remix-run/node"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "~/components/Button"
import { Favicon } from "~/components/Favicon"
import { Intro } from "~/components/Intro"
import { Wrapper } from "~/components/Wrapper"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Tool() {
  return (
    <Wrapper>
      <Intro
        prefix={
          <Favicon
            src={`https://www.google.com/s2/favicons?sz=128&domain_url=posthog.com`}
            style={{ viewTransitionName: "tool-favicon" }}
            className="size-10"
          />
        }
        suffix={
          <Button size="md" variant="primary" suffix={<ArrowUpRightIcon />} className="ml-auto">
            www.posthog.com
          </Button>
        }
        title="Posthog"
        description="PostHog provides open-source product analytics, session recording, feature flagging and A/B testing that you can self-host."
        headingProps={{ size: "h2", as: "h1" }}
        className="text-pretty"
      />
    </Wrapper>
  )
}
