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

      <Grid>
        {[...Array(6)].map((_, index) => (
          <ToolSkeleton key={index} />
        ))}
      </Grid>
    </Wrapper>
  )
}
