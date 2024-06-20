import { SerializeFrom } from "@remix-run/node"
import { NavLink } from "@remix-run/react"
import { ArrowRightIcon } from "lucide-react"
import plur from "plur"
import { HTMLAttributes } from "react"
import { Card } from "~/components/Card"
import { H5 } from "~/components/Heading"
import { CategoryMany } from "~/services.server/api"

type CategoryCardProps = HTMLAttributes<HTMLElement> & {
  category: SerializeFrom<CategoryMany>
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card asChild>
      <NavLink to={`/category/${category.slug}`} unstable_viewTransition>
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

        <div className="flex gap-3 items-start justify-between">
          <div className="flex flex-col gap-2 min-w-0">
            <H5 className="!leading-snug flex-1 truncate">{category.name}</H5>

            <span className="text-xs text-foreground/50">
              {category._count.tools} {plur("tool", category._count.tools)}
            </span>
          </div>

          <span className="size-10 grid place-items-center mt-1 bg-foreground/5 rounded-full shrink-0 dark:bg-foreground/10">
            <ArrowRightIcon />
          </span>
        </div>
      </NavLink>
    </Card>
  )
}
