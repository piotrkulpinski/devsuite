import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const toolSubmitted = inngest.createFunction(
  { id: "tool.submitted" },
  { event: "tool.submitted" },
  async ({ event, step }) => {
    const tool = await step.run("fetch-tool", async () => {
      return prisma.tool.findUniqueOrThrow({ where: { slug: event.data.slug } })
    })

    // TODO: send email to admins and submitter
  },
)
