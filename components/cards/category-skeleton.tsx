import { ArrowRightIcon } from "lucide-react"
import { Card, CardDescription } from "~/components/ui/card"
import { H5 } from "~/components/ui/heading"
import { Skeleton } from "~/components/ui/skeleton"

export const CategorySkeleton = () => {
  return (
    <Card hover={false} className="items-stretch">
      <div className="w-full flex gap-3 items-start justify-between">
        <div className="flex flex-col gap-1 min-w-0">
          <H5 className="!leading-snug flex-1 truncate">
            <Skeleton>&nbsp;</Skeleton>
          </H5>

          <span className="text-xs text-foreground/50">
            <Skeleton className="w-4/5">&nbsp;</Skeleton>
          </span>
        </div>

        <span className="size-10 grid place-items-center mt-1 bg-foreground/10 rounded-full shrink-0">
          <ArrowRightIcon />
        </span>
      </div>

      <CardDescription>
        <Skeleton className="h-5 w-4/5">&nbsp;</Skeleton>
      </CardDescription>
    </Card>
  )
}