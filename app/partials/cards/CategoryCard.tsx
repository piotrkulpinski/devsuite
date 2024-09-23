import { SerializeFrom } from "@remix-run/node"
import { Link, unstable_useViewTransitionState } from "@remix-run/react"
import { ArrowRightIcon } from "lucide-react"
import plur from "plur"
import { HTMLAttributes } from "react"
import { Card, CardDescription } from "~/components/Card"
import { H5 } from "~/components/Heading"
import { CategoryMany } from "~/services.server/api"

type CategoryCardProps = HTMLAttributes<HTMLElement> & {
  category: SerializeFrom<CategoryMany>
}

export const CategoryCard = ({ category, ...props }: CategoryCardProps) => {
  const to = `/category/${category.slug}`
  const vt = unstable_useViewTransitionState(to)

  return (
    <Card style={{ viewTransitionName: vt ? "category" : undefined }} asChild>
      <Link to={to} prefetch="intent" unstable_viewTransition {...props}>
        {/* <div className="flex items-center gap-3 overflow-clip mix-blend-overlay">
          {category.tools.map((tool) => (
            <Fragment key={tool.id}>
              {tool.images[0] && (
                <img src={tool.images[0]} alt="" className="size-20 object-cover" />
              )}
            </Fragment>
          ))}
        </div> */}

        <div className="w-full flex gap-3 items-start justify-between">
          <div className="flex flex-col gap-2 min-w-0">
            <H5
              className="!leading-snug flex-1 truncate"
              style={{ viewTransitionName: vt ? "category-name" : undefined }}
            >
              {category.name}
            </H5>

            <span className="text-xs text-foreground/50">
              {category._count.tools} {plur("tool", category._count.tools)}
            </span>
          </div>

          <span className="size-10 grid place-items-center mt-1 bg-foreground/5 rounded-full shrink-0 dark:bg-foreground/10">
            <ArrowRightIcon />
          </span>
        </div>

        <CardDescription style={{ viewTransitionName: vt ? "category-description" : undefined }}>
          {category.description}
        </CardDescription>
      </Link>
    </Card>
  )
}
