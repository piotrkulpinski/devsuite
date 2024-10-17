import { DollarSignIcon, SparkleIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"
import type { ToolMany } from "~/api/tools/payloads"
import { Badge } from "~/components/ui/badge"
import { Card, CardDescription, CardStars } from "~/components/ui/card"
import { Favicon } from "~/components/ui/favicon"
import { H4 } from "~/components/ui/heading"
import { Stack } from "~/components/ui/stack"

type ToolCardProps = HTMLAttributes<HTMLElement> & {
  tool: ToolMany
}

export const ToolCard = ({ tool, ...props }: ToolCardProps) => {
  return (
    <Card isFeatured={tool.isFeatured} asChild>
      <Link href={`/tools/${tool.slug}`} prefetch {...props}>
        <Stack size="sm" className="absolute top-0 inset-x-6 z-10 -translate-y-1/2 mx-px">
          {tool.isFeatured && (
            <Badge variant="outline" prefix={<SparkleIcon className="text-yellow-500" />}>
              Featured
            </Badge>
          )}

          {tool.collections.map(collection => (
            <Badge key={collection.id} variant="outline">
              {collection.name}
            </Badge>
          ))}
        </Stack>

        {tool.isFeatured && <CardStars className="brightness-125" />}

        <div className="w-full flex gap-3 items-center justify-between">
          <H4>{tool.name}</H4>
          {tool.faviconUrl && <Favicon src={tool.faviconUrl} className="rounded-full" />}
        </div>

        {tool.tagline && <CardDescription>{tool.tagline}</CardDescription>}

        <Stack size="sm">
          <Badge variant="ghost">
            <DollarSignIcon className="text-green-500" /> free + from $9/mo
          </Badge>
        </Stack>
      </Link>
    </Card>
  )
}
