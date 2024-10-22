import { Box } from "~/components/common/box"
import { Skeleton } from "~/components/common/skeleton"
import { ToolSkeleton } from "~/components/web/cards/tool-skeleton"
import { Grid } from "~/components/web/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/web/ui/intro"
import { Wrapper } from "~/components/web/ui/wrapper"

export default function Loading() {
  return (
    <Wrapper>
      <Intro alignment="center" className="max-w-2xl mx-auto text-pretty">
        <IntroTitle className="!leading-none">
          <Skeleton className="w-48">&nbsp;</Skeleton>
        </IntroTitle>

        <IntroDescription>
          <Skeleton className="w-full">&nbsp;</Skeleton>
        </IntroDescription>
      </Intro>

      <div className="flex flex-col gap-6 lg:gap-8">
        <Box className="px-4 py-2.5 text-sm/normal rounded-lg w-full">
          <span>&nbsp;</span>
        </Box>

        <Grid>
          {[...Array(6)].map((_, index) => (
            <ToolSkeleton key={index} />
          ))}
        </Grid>
      </div>
    </Wrapper>
  )
}
