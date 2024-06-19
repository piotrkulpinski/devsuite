import { NavLink } from "@remix-run/react"
import { DollarSignIcon } from "lucide-react"
import { Card } from "~/components/Card"
import { Favicon } from "~/components/Favicon"
import { H5 } from "~/components/Heading"

export const ToolCard = () => {
  return (
    <Card asChild>
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
          <div className="flex flex-col gap-2">
            <H5 className="!leading-snug">PostHog</H5>
            <span className="text-xs text-foreground/50">Product analytics platform</span>
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
  )
}
