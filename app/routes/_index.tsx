import type { MetaFunction } from "@remix-run/node"
import { NavLink } from "@remix-run/react"
import { ArrowRightIcon } from "lucide-react"
import { H5 } from "~/components/Heading"
import { Intro } from "~/components/Intro"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Index() {
  return (
    <>
      <Intro
        title="AI design assets for truly independent creators"
        description="We’ve curated some great open source alternatives to tools that your business requires in day-to-day operations."
        alignment="center"
        className="max-w-[40rem] mx-auto text-pretty"
      />

      <div className="grid grid-auto-fill-lg gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <NavLink to="#" key={i} className="flex flex-col gap-4 border rounded-lg p-6">
            <div className="flex items-center gap-2 overflow-clip">
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
                <H5>Design System</H5>
                <span className="text-xs text-muted">22 tools</span>
              </div>

              <span className="size-10 grid place-items-center bg-foreground/10 rounded-full">
                <ArrowRightIcon />
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  )
}
