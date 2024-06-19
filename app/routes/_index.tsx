/** eslint-disable @typescript-eslint/no-unused-vars */
import type { MetaFunction } from "@remix-run/node"
import { Intro } from "~/components/Intro"
import { Stars } from "~/components/Stars"
import { Badge } from "~/components/Badge"
import { NewsletterForm } from "~/partials/NewsletterForm"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categories = [
    "Analytics",
    "API Development",
    "APIs",
    "Authentication",
    "Backend-as-a-Service",
    "Background Jobs",
    "CI/CD",
    "Cloud Cost Management",
    "Code Boilerplates",
    "Copilots & Autopilots",
    "Databases & Spreadsheets",
    "Debug & Get Help",
    "Deployment & Hosting",
    "Developer Portal",
    "Documentation",
    "Environment & Secret Management",
    "Feature Flags",
    "File Handling",
    "IDEs & Environment",
    "Internal Tooling",
    "Issue Tracknig",
    "Localization",
    "Mail",
    "Media",
    "Messaging",
    "Misc",
    "Monitoring",
    "Mono Fonts",
    "Observability",
    "Onboarding",
    "Payment & Pricing",
    "Realtime API",
    "Repository Management",
    "Search API",
    "Workflow Automation",
  ]

  return (
    <>
      <Stars className="relative w-full h-96 mx-auto scale-y-flip -my-44 md:-my-40 md:-mb-60" />
      <Badge className="-mb-10 self-center">Coming soon</Badge>

      <Intro
        title={
          <>
            A suite of developer tools that help you{" "}
            <span className="underline decoration-from-font decoration-foreground/25">
              ship faster
            </span>{" "}
            🚀
          </>
        }
        description="Find the best tools to help you build faster and more efficiently. Stop wasting time and money by developing tools that already exist."
        alignment="center"
        className="relative z-10 max-w-2xl text-pretty"
      >
        {/* <div className="mt-4 relative w-full max-w-md mx-auto">
          <Input
            size="lg"
            shape="rounded"
            placeholder="Search for tools..."
            className="w-full pr-10"
          />

          <SearchIcon className="absolute top-1/2 right-4 -translate-y-1/2 size-4 pointer-events-none" />
        </div> */}
      </Intro>

      <div className="flex flex-col items-center text-center gap-2 w-full mx-auto">
        <NewsletterForm className="mt-0" buttonLabel="Get notified" />
      </div>

      {/* <Grid>
        <H3 className="relative z-10 -mt-10 col-span-full text-center">Categories</H3>

        {categories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </Grid> */}
    </>
  )
}
