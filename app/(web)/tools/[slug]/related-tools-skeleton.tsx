import { H4 } from "~/components/common/heading"
import { ToolSkeleton } from "~/components/web/cards/tool-skeleton"
import { Grid } from "~/components/web/ui/grid"

export const RelatedToolsSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8">
      <H4 as="h3" className="text-center">
        Other Alternatives:
      </H4>

      <Grid className="w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <ToolSkeleton key={index} />
        ))}
      </Grid>
    </div>
  )
}
