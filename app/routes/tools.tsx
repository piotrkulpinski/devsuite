import type { MetaFunction } from "@remix-run/node"
import { Grid } from "~/components/Grid"
import { Intro } from "~/components/Intro"
import { ToolCard } from "~/partials/cards/ToolCard"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Tools() {
  return (
    <>
      <Intro
        title="Workflow Automation Tools"
        description="A collection of hand-curated developer tools to help you automate your workflow and increase productivity."
        className="max-w-2xl mx-auto text-pretty"
        alignment="center"
      />

      <Grid>
        {Array.from({ length: 18 }).map((_, i) => (
          <ToolCard key={i} />
        ))}
      </Grid>
    </>
  )
}
