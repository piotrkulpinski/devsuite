import { DollarSignIcon, SparkleIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"
import { Badge } from "~/components/ui/badge"
import { Card, CardDescription, CardStars } from "~/components/ui/card"
import { Favicon } from "~/components/ui/favicon"
import { H4 } from "~/components/ui/heading"
import { Stack } from "~/components/ui/stack"
import type { ToolMany } from "~/lib/api"

type ToolCardProps = HTMLAttributes<HTMLElement> & {
  tool: ToolMany
}

export const ToolCard = ({ tool, ...props }: ToolCardProps) => {
  return (
    <Card isFeatured={tool.isFeatured} asChild>
      <Link href={`/${tool.slug}`} prefetch {...props}>
        <Stack size="sm" className="absolute top-0 inset-x-6 z-10 -translate-y-1/2 -mx-0.5">
          {tool.isFeatured && (
            <Badge variant="outline" prefix={<SparkleIcon className="text-yellow-500" />}>
              Featured
            </Badge>
          )}

          {tool.isOpenSource && <Badge variant="outline">Open Source</Badge>}
        </Stack>

        {tool.isFeatured && <CardStars />}

        <div className="w-full flex gap-3 items-start justify-between">
          <H4>{tool.name}</H4>

          {tool.faviconUrl && <Favicon src={tool.faviconUrl} className="rounded-full" />}
        </div>

        {tool.description && <CardDescription>{tool.description}</CardDescription>}

        <Stack size="sm">
          <Badge variant="ghost">
            <DollarSignIcon className="text-green-500" /> free + from $9/mo
          </Badge>
        </Stack>
      </Link>
    </Card>
  )
}
