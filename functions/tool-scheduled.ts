import { generateContent } from "~/lib/generate-content"
import { uploadFavicon, uploadScreenshot } from "~/lib/media"
import { getSocialsFromUrl } from "~/lib/socials"
import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const toolScheduled = inngest.createFunction(
  { id: "tool.scheduled" },
  { event: "tool.scheduled" },
  async ({ event, step }) => {
    const tool = await step.run("fetch-tool", async () => {
      return prisma.tool.findUniqueOrThrow({ where: { slug: event.data.slug } })
    })

    const contentPromise = step.run("generate-content", async () => {
      return generateContent(tool)
    })

    const faviconPromise = step.run("upload-favicon", async () => {
      return uploadFavicon(tool.websiteUrl, `tools/${tool.slug}/favicon`)
    })

    const screenshotPromise = step.run("upload-screenshot", async () => {
      return uploadScreenshot(tool.websiteUrl, `tools/${tool.slug}/screenshot`)
    })

    const socialsPromise = step.run("get-socials", async () => {
      return getSocialsFromUrl(tool.websiteUrl)
    })

    const [{ categories, tags, ...content }, faviconUrl, screenshotUrl, socials] =
      await Promise.all([contentPromise, faviconPromise, screenshotPromise, socialsPromise])

    await step.run("update-tool", async () => {
      return prisma.tool.update({
        where: { id: tool.id },
        data: {
          ...content,
          faviconUrl,
          screenshotUrl,
          xHandle: socials.X?.[0]?.user,
          socials: Object.entries(socials).map(([name, links]) => ({ name, url: links[0].url })),
          categories: { set: categories.map(({ slug }) => ({ slug })) },
          tags: { connectOrCreate: tags.map(slug => ({ where: { slug }, create: { slug } })) },
        },
      })
    })
  },
)
