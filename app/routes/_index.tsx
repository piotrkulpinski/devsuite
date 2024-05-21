import type { MetaFunction } from "@remix-run/node"
import { NavLink } from "@remix-run/react"
import { ArrowRightIcon, SearchIcon } from "lucide-react"
import { H5 } from "~/components/Heading"
import { Intro } from "~/components/Intro"
import { Input } from "~/components/forms/Input"

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
        className="py-12 max-w-[40rem] mx-auto text-pretty"
      >
        <div className="mt-4 relative w-full max-w-md mx-auto">
          <Input shape="rounded" placeholder="Search for tools..." className="w-full pr-10" />

          <SearchIcon className="absolute top-1/2 right-4 -translate-y-1/2 size-4 pointer-events-none" />
        </div>
      </Intro>

      <div className="grid grid-auto-fill-lg gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <NavLink
            to="/tool"
            key={i}
            className="fade-in flex flex-col gap-4 border rounded-lg p-6 hover:ring-[3px] hover:ring-card-dark hover:border-border-dark"
            unstable_viewTransition
          >
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
