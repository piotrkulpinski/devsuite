import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import plur from "plur"
import type { HTMLAttributes } from "react"
import { Card, CardDescription } from "~/components/ui/card"
import { H5 } from "~/components/ui/heading"
import type { CategoryMany } from "~/lib/api"

type CategoryCardProps = HTMLAttributes<HTMLElement> & {
  category: CategoryMany
}

export const CategoryCard = ({ category, ...props }: CategoryCardProps) => {
  return (
    <Card asChild>
      <Link href={`/categories/${category.slug}`} prefetch {...props}>
        {/* <div className="flex items-center gap-3 overflow-clip mix-blend-overlay">
          {category.tools.map(tool => (
            <Fragment key={tool.id}>
              {tool.images[0] && (
                <img src={tool.images[0]} alt="" className="size-20 object-cover" />
              )}
            </Fragment>
          ))}
        </div> */}

        <div className="w-full flex gap-3 items-start justify-between">
          <div className="flex flex-col gap-1 min-w-0">
            <H5 className="!leading-snug flex-1 truncate">{category.name}</H5>

            <span className="text-xs text-foreground/50">
              {category._count.tools} {plur("tool", category._count.tools)}
            </span>
          </div>

          <span className="size-10 grid place-items-center mt-1 bg-foreground/10 rounded-full shrink-0">
            <ArrowRightIcon />
          </span>
        </div>

        <CardDescription>{category.description}</CardDescription>
      </Link>
    </Card>
  )
}
