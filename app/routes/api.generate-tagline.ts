import { generateObject } from "ai"
import { openai } from "~/services.server/openai"
import { prisma } from "~/services.server/prisma"
import { z } from "zod"
import { getMetaTags } from "~/utils/metatags"

export const loader = async () => {
  const model = openai.chat("gpt-3.5-turbo")
  const tools = await prisma.tool.findMany()

  await Promise.all(
    tools.map(async (tool) => {
      let newTagline = ""

      if (!tool.websiteUrl) {
        return
      }

      const metadata = await getMetaTags(tool.websiteUrl)

      if (!tool.tagline) {
        const prompt = `
          Extract tagline from the following title and description from the metadata description.
          Title: ${metadata.title}
          Description: ${metadata.description}
        `

        const { object } = await generateObject({
          model,
          prompt,
          schema: z.object({
            tagline: z.string(),
            description: z.string(),
          }),
        })

        newTagline = object.tagline
      }

      return prisma.tool.update({
        where: { id: tool.id },
        data: {
          tagline: newTagline,
          description: metadata.description,
          imageUrl: metadata.image,
        },
      })
    })
  )

  // console.log(metadata)

  return null
}
