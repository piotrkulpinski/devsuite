import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const toolDeleted = inngest.createFunction(
  { id: "tool.deleted" },
  { event: "tool.deleted" },
  async ({ event, step }) => {
    const tool = await step.run("fetch-tool", async () => {
      return prisma.tool.findUniqueOrThrow({ where: { slug: event.data.slug } })
    })

    // TODO: remove assets from s3
  },
)
