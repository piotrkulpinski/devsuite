import { ToolSkeleton } from "~/components/cards/tool-skeleton"
import { Grid } from "~/components/ui/grid"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Skeleton } from "~/components/ui/skeleton"
import { Wrapper } from "~/components/ui/wrapper"

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
