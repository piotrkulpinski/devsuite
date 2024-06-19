/** eslint-disable @typescript-eslint/no-unused-vars */
import { json, type MetaFunction } from "@remix-run/node"
import { Grid } from "~/components/Grid"
import { Intro } from "~/components/Intro"
import { CategoryCard } from "~/partials/cards/CategoryCard"
import { Input } from "~/components/forms/Input"
import { SearchIcon } from "lucide-react"
import { prisma } from "~/services.server/prisma"
import { categoryManyPayload } from "~/services.server/api"
import { useLoaderData } from "@remix-run/react"
import { JSON_HEADERS, SITE_NAME } from "~/utils/constants"

export const meta: MetaFunction = () => {
  return [
    { title: `A Suite of Developer Tools to Help you Ship Faster – ${SITE_NAME}` },
    {
      name: "description",
      content:
        "Find the best tools to help you build faster and more efficiently. Stop wasting time and money by developing tools that already exist.",
    },
  ]
}

export const loader = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: categoryManyPayload,
  })

  const meta = {
    title: "Open Source Software Categories",
    description: "Browse top categories to find your best Open Source software options.",
  }

  return json({ meta, categories }, { headers: JSON_HEADERS })
}

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { meta, categories } = useLoaderData<typeof loader>()

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
