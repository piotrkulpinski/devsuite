import { SerializeFrom } from "@remix-run/node"
import { Link, unstable_useViewTransitionState } from "@remix-run/react"
import { DollarSignIcon, SparkleIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import { Badge } from "~/components/Badge"
import { Card } from "~/components/Card"
import { Favicon } from "~/components/Favicon"
import { H4 } from "~/components/Heading"
import { Series } from "~/components/Series"
import { ToolMany } from "~/services.server/api"

type ToolCardProps = HTMLAttributes<HTMLElement> & {
  tool: SerializeFrom<ToolMany>
}

export const ToolCard = ({ tool, ...props }: ToolCardProps) => {
  const to = `/${tool.slug}`
  const vt = unstable_useViewTransitionState(to)

  return (
    <Card style={{ viewTransitionName: vt ? "tool" : undefined }} asChild>
      <Link to={to} prefetch="intent" unstable_viewTransition {...props}>
        <div className="w-full flex gap-3 items-start justify-between">
          <div className="flex flex-col gap-2">
            <H4
              className="!leading-snug"
              style={{ viewTransitionName: vt ? "tool-name" : undefined }}
            >
              {tool.name}
            </H4>

            <span
              className="text-sm text-foreground/60 text-pretty"
              style={{ viewTransitionName: vt ? "tool-description" : undefined }}
            >
              {tool.tagline}
            </span>
          </div>

          {tool.faviconUrl && (
            <Favicon
              src={tool.faviconUrl}
              className="mt-1 rounded-full"
              style={{ viewTransitionName: vt ? "tool-favicon" : undefined }}
            />
          )}
        </div>

        <Series size="sm" style={{ viewTransitionName: vt ? "tool-features" : undefined }}>
          {tool.isOpenSource && (
            <Badge>
              <SparkleIcon className="text-yellow-500" /> Open Source
            </Badge>
          )}

          <Badge variant="ghost">
            <DollarSignIcon className="text-green-500" /> free + from $9/mo
          </Badge>
        </Series>
      </Link>
    </Card>
  )
}
