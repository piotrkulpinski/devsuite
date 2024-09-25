import { Card, CardDescription } from "~/components/ui/card"
import { Favicon } from "~/components/ui/favicon"
import { H4 } from "~/components/ui/heading"
import { Skeleton } from "~/components/ui/skeleton"
import { Stack } from "~/components/ui/stack"

export const ToolSkeleton = () => {
  return (
    <Card hover={false} className="items-stretch">
      <div className="w-full flex gap-3 items-start justify-between">
        <H4 className="w-2/3">
          <Skeleton>&nbsp;</Skeleton>
        </H4>

        <Favicon src={null} className="animate-pulse rounded-full" />
      </div>

      <CardDescription className="flex flex-col gap-0.5">
        <Skeleton className="h-5 w-4/5">&nbsp;</Skeleton>
        <Skeleton className="h-5 w-1/2">&nbsp;</Skeleton>
      </CardDescription>

      <Stack size="sm">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </Stack>
    </Card>
  )
}
