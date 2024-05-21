import type { MetaFunction } from "@remix-run/node"
import { NavLink } from "@remix-run/react"
import { DollarSignIcon } from "lucide-react"
import { Card } from "~/components/Card"
import { Favicon } from "~/components/Favicon"
import { H5 } from "~/components/Heading"
import { Intro } from "~/components/Intro"
import { Newsletter } from "~/partials/Newsletter"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Tools() {
  return (
    <>
      <Intro
        title="Workflow Automation Tools"
        description="A collection of hand-curated developer tools to help you automate your workflow and increase productivity."
        className="max-w-[40rem] mx-auto text-pretty"
        alignment="center"
      />

      <div className="grid grid-auto-fill-lg gap-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <Card key={i} asChild>
            <NavLink to="/tool" unstable_viewTransition>
              <div className="flex items-center gap-3 overflow-clip">
                {Array.from({ length: 4 }).map((_, j) => (
                  <img
                    key={j}
                    src="https://framerusercontent.com/images/4dKAgLp4CiDi6x2Yoacvyp33JA.webp"
                    alt=""
                    className="size-20 object-cover"
                  />
                ))}
              </div>

              <div className="flex gap-4 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <H5>PostHog</H5>
                  <span className="text-xs text-muted">Product analytics platform</span>
                </div>

                {/* <span className="size-10 grid place-items-center bg-foreground/10 rounded-full p-1 shrink-0"> */}
                <Favicon
                  src={`https://www.google.com/s2/favicons?sz=128&domain_url=posthog.com`}
                  className="rounded-full"
                />
                {/* </span> */}
              </div>

              <span className="flex items-center gap-1 text-xs">
                <DollarSignIcon className="inline-flex text-green-500" /> free + from $9/mo
              </span>
            </NavLink>
          </Card>
        ))}
      </div>

      <Newsletter className="mt-auto" />
    </>
  )
}
