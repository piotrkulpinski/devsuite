/** eslint-disable @typescript-eslint/no-unused-vars */
import { json, useLoaderData } from "@remix-run/react"
import { Intro } from "~/components/Intro"
import { LoaderFunctionArgs } from "@remix-run/node"
import { prisma } from "~/services.server/prisma"
import { categoryOnePayload } from "~/services.server/api"
import { JSON_HEADERS } from "~/utils/constants"
import { Grid } from "~/components/Grid"
import { ToolCard } from "~/partials/cards/ToolCard"

export const loader = async ({ params: { slug } }: LoaderFunctionArgs) => {
  try {
    const [category, tools] = await Promise.all([
      prisma.category.findUniqueOrThrow({
        where: { slug },
        include: categoryOnePayload,
      }),

      prisma.tool.findMany({
        where: { categories: { some: { slug } }, publishedAt: { lte: new Date() } },
      }),
    ])

    // const meta = {
    //   title: `${tool.name}: Open Source Alternative ${
    //     alternatives.length
    //       ? `to ${alternatives.map(({ alternative }) => alternative?.name).join(", ")}`
    //       : ""
    //   }`,
    // }

    return json({ category, tools }, { headers: JSON_HEADERS })
  } catch (error) {
    console.error(error)
    throw json(null, { status: 404, statusText: "Not Found" })
  }
}

export default function CategoryPage() {
  const { category, tools } = useLoaderData<typeof loader>()

  return (
    <>
      <Intro
        title={`${category.name}`}
        description={category.description}
        className="max-w-2xl mx-auto text-pretty"
        alignment="center"
      />

      <Grid>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </Grid>
    </>
  )
}
