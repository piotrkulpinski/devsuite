import { DollarSignIcon, SparkleIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"
import { Badge } from "~/components/ui/badge"
import { Card, CardDescription } from "~/components/ui/card"
import { Favicon } from "~/components/ui/favicon"
import { H4 } from "~/components/ui/heading"
import { Stack } from "~/components/ui/stack"
import type { ToolMany } from "~/lib/api"

type ToolCardProps = HTMLAttributes<HTMLElement> & {
  tool: ToolMany
}

export const ToolCard = ({ tool, ...props }: ToolCardProps) => {
  return (
    <Card asChild>
      <Link href={`/${tool.slug}`} prefetch {...props}>
        <div className="w-full flex gap-3 items-start justify-between">
          <H4>{tool.name}</H4>

          {tool.faviconUrl && <Favicon src={tool.faviconUrl} className="rounded-full" />}
        </div>

        {tool.description && <CardDescription>{tool.description}</CardDescription>}

        <Stack size="sm">
          {tool.isOpenSource && (
            <Badge variant="outline">
              <SparkleIcon className="text-yellow-500" /> Open Source
            </Badge>
          )}

          <Badge variant="ghost">
            <DollarSignIcon className="text-green-500" /> free + from $9/mo
          </Badge>
        </Stack>
      </Link>
    </Card>
  )
}
