import { config } from "~/config"
import EmailToolScheduled from "~/emails/tool-scheduled"
import { sendEmails } from "~/lib/email"
import { generateContent } from "~/lib/generate-content"
import { uploadFavicon, uploadScreenshot } from "~/lib/media"
import { getSocialsFromUrl } from "~/lib/socials"
import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const toolScheduled = inngest.createFunction(
  { id: "tool.scheduled", concurrency: { limit: 2 } },
  { event: "tool.scheduled" },
  async ({ event, step }) => {
    const tool = await step.run("fetch-tool", async () => {
      return prisma.tool.findUniqueOrThrow({ where: { slug: event.data.slug } })
    })

    // Run steps in parallel
    await Promise.all([
      step.run("generate-content", async () => {
        const { tags, ...content } = await generateContent(tool)

        return prisma.tool.update({
          where: { id: tool.id },
          data: {
            ...content,
            // categories: { set: categories.map(({ id }) => ({ id })) },
            tags: {
              connectOrCreate: tags.map(slug => ({
                where: { slug },
                create: { name: slug, slug },
              })),
            },
          },
        })
      }),

      step.run("upload-favicon", async () => {
        const { id, slug, websiteUrl } = tool
        const faviconUrl = await uploadFavicon(websiteUrl, `tools/${slug}/favicon`)

        return prisma.tool.update({
          where: { id },
          data: { faviconUrl },
        })
      }),

      step.run("upload-screenshot", async () => {
        const { id, slug, websiteUrl } = tool
        const screenshotUrl = await uploadScreenshot(websiteUrl, `tools/${slug}/screenshot`)

        return prisma.tool.update({
          where: { id },
          data: { screenshotUrl },
        })
      }),

      step.run("get-socials", async () => {
        const socials = await getSocialsFromUrl(tool.websiteUrl)

        return prisma.tool.update({
          where: { id: tool.id },
          data: {
            xHandle: socials.X?.[0]?.user,
            socials: Object.entries(socials).map(([name, links]) => ({
              name,
              url: links[0].url,
            })),
          },
        })
      }),
    ])

    // Disconnect from DB
    await step.run("disconnect-from-db", async () => {
      return prisma.$disconnect()
    })

    // Send email
    await step.run("send-email", async () => {
      if (!tool.submitterEmail) return

      const to = tool.submitterEmail
      const subject = `Great news! ${tool.name} is scheduled for publication on ${config.site.name}`

      return sendEmails({
        to,
        subject,
        react: EmailToolScheduled({ to, subject, tool }),
      })
    })
  },
)
