import type { MetaFunction } from "@remix-run/node"
import { Grid } from "~/components/Grid"
import { Intro } from "~/components/Intro"
import { CategoryCard } from "~/partials/cards/CategoryCard"
import { Input } from "~/components/forms/Input"
import { SearchIcon } from "lucide-react"

export const meta: MetaFunction = () => {
  return [
    { title: "A Suite of Developer Tools to Help you Ship Faster – DevSuite" },
    {
      name: "description",
      content:
        "Find the best tools to help you build faster and more efficiently. Stop wasting time and money by developing tools that already exist.",
    },
  ]
}

export default function Index() {
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
        className="max-w-2xl text-pretty md:mb-12"
      >
        <div className="mt-4 relative w-full max-w-md mx-auto">
          <Input
            size="lg"
            shape="rounded"
            placeholder="Search for tools..."
            className="w-full pr-10"
          />

          <SearchIcon className="absolute top-1/2 right-4 -translate-y-1/2 size-4 pointer-events-none" />
        </div>
      </Intro>

      <Grid>
        {categories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </Grid>
    </>
  )
}
