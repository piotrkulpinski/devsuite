import { ArrowUpRightIcon, HashIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Gallery } from "~/components/ui/gallery"
import { Skeleton } from "~/components/ui/skeleton"
import { Stack } from "~/components/ui/stack"
import { Wrapper } from "~/components/ui/wrapper"

export default function Loading() {
  return (
    <Wrapper size="sm">
      <div className="flex w-full flex-col items-start gap-y-4">
        <Stack size="lg" className="relative w-full justify-between">
          <Stack size="lg">
            <Skeleton className="size-10 rounded-md" />
            <Skeleton className="h-8 w-48" />
          </Stack>

          <Button size="md" variant="primary" suffix={<ArrowUpRightIcon />} disabled>
            <Skeleton className="w-20">&nbsp;</Skeleton>
          </Button>
        </Stack>

        <Stack size="sm" direction="column" className="w-full">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
        </Stack>

        <Stack size="sm" className="mt-4">
          <Skeleton className="h-4 w-24 ml-1" />
          <Skeleton className="h-4 w-32 ml-1" />
        </Stack>
      </div>

      <Gallery images={[""]} />

      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="flex flex-wrap gap-y-2 gap-x-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center gap-0.5 text-foreground/65 text-sm">
            <HashIcon className="opacity-30" />
            <Skeleton key={index} className="h-3 w-12" />
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
