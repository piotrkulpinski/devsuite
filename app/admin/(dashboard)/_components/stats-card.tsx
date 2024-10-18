import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { prisma } from "~/services/prisma"

export const StatsCard = async () => {
  const stats = await Promise.all([
    prisma.tool.count(),
    prisma.category.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ])

  const statsLabels = {
    0: "Tools",
    1: "Categories",
    2: "Collections",
    3: "Tags",
  }

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader>
            <CardDescription>{statsLabels[index as keyof typeof statsLabels]}</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{stat.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}
