import { SerializeFrom } from "@remix-run/node"
import { NavLink } from "@remix-run/react"
import { DollarSignIcon, SparkleIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import { Badge } from "~/components/Badge"
import { Card } from "~/components/Card"
import { Favicon } from "~/components/Favicon"
import { H4 } from "~/components/Heading"
import { Series } from "~/components/Series"
import { ToolMany } from "~/services.server/api"
import { cx } from "~/utils/cva"

type ToolCardProps = HTMLAttributes<HTMLElement> & {
  tool: SerializeFrom<ToolMany>
}

export const ToolCard = ({ className, tool, ...props }: ToolCardProps) => {
  return (
    <NavLink
      to={`/${tool.slug}`}
      className={cx("group flex", className)}
      prefetch="intent"
      unstable_viewTransition
      {...props}
    >
      {({ isTransitioning }) => (
        <Card style={isTransitioning ? { viewTransitionName: "tool" } : undefined}>
          {/* <div className="flex items-center gap-3 overflow-clip">
          {Array.from({ length: 4 }).map((_, j) => (
            <img
              key={j}
              src="https://framerusercontent.com/images/4dKAgLp4CiDi6x2Yoacvyp33JA.webp"
              alt=""
              className="size-20 object-cover"
            />
          ))}
        </div> */}

          <div className="flex gap-3 items-start justify-between">
            <div className="flex flex-col gap-2">
              <H4
                className="!leading-snug"
                style={isTransitioning ? { viewTransitionName: "tool-name" } : undefined}
              >
                {tool.name}
              </H4>

              <span
                className="text-sm text-foreground/60 text-pretty"
                style={isTransitioning ? { viewTransitionName: "tool-description" } : undefined}
              >
                {tool.tagline}
              </span>
            </div>

            {tool.faviconUrl && (
              <Favicon
                src={tool.faviconUrl}
                className="mt-1 rounded-full"
                style={isTransitioning ? { viewTransitionName: "tool-favicon" } : undefined}
              />
            )}
          </div>

          <Series>
            {tool.isOpenSource && (
              <Badge>
                <SparkleIcon className="inline-flex text-yellow-500" /> Open Source
              </Badge>
            )}

            <span className="flex items-center gap-1 text-xs">
              <DollarSignIcon className="inline-flex text-green-500" /> free + from $9/mo
            </span>
          </Series>
        </Card>
      )}
    </NavLink>
  )
}
