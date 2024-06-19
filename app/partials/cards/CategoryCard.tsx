import { Card } from "~/components/Card"
import { H5 } from "~/components/Heading"

export const CategoryCard = ({ category }: { category: string }) => {
  return (
    <Card>
      {/* <NavLink to="/tools" unstable_viewTransition> */}
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

      {/* <div className="flex gap-4 items-center justify-between"> */}
      {/* <div className="flex flex-col gap-1"> */}
      <H5 className="-my-2 truncate">{category}</H5>
      {/* <span className="text-xs text-foreground/50">22 tools</span> */}
      {/* </div> */}

      {/* <span className="size-10 grid place-items-center bg-foreground/5 rounded-full shrink-0 dark:bg-foreground/10">
          <ArrowRightIcon />
        </span> */}
      {/* </div> */}
      {/* </NavLink> */}
    </Card>
  )
}
