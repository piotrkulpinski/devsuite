import type { MetaFunction } from "@remix-run/node"
import { SearchIcon } from "lucide-react"
import { Grid } from "~/components/Grid"
import { Intro } from "~/components/Intro"
import { Input } from "~/components/forms/Input"
import { CategoryCard } from "~/partials/cards/CategoryCard"
import { Newsletter } from "~/partials/Newsletter"
import { Stars } from "~/components/Stars"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Index() {
  const categories = [
    "Workflow Automation",
    "Repository Management",
    "Documentation",
    "Emails",
    "Internal Tooling",
    "Mono Fonts",
    "Background Jobs",
    "Notifications",
    "Onboarding",
    "Hosting",
    "API Development",
    "Low-Code & No-Code",
    "Code Boilerplates",
  ]

  return (
    <>
      <Intro
        title={
          <>
            A suite of developer tools that help you{" "}
            <span className="underline decoration-from-font decoration-foreground/25">
              ship faster
            </span>
          </>
        }
        description="Find the best tools to help you build faster and more efficiently. Stop wasting time and money by developing tools that already exist."
        alignment="center"
        className="relative z-10 max-w-2xl text-pretty"
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

      <Stars className="relative w-full h-96 mx-auto -my-44 md:-my-40" />

      <Grid>
        {categories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </Grid>

      <Newsletter className="mt-auto" />
    </>
  )
}
