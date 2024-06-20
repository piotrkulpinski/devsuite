import { generateObject } from "ai"
import { openai } from "~/services.server/openai"
import { prisma } from "~/services.server/prisma"
import { z } from "zod"
import { json } from "@remix-run/node"

export const loader = async () => {
  const model = openai.chat("gpt-3.5-turbo")
  const tools = (await prisma.tool.findMany()).splice(0, 10)

  const descriptions = await Promise.all(
    tools.map(async (tool) => {
      const prompt = `
          Give me a description of the following tool.
          All of the provided information relates to a developer tool, but don't include that info in the description.'
          Don't include the name of the tool in the description.
          Name: ${tool.name}
          Website: ${tool.websiteUrl}
        `

      const { object } = await generateObject({
        model,
        prompt,
        schema: z.object({
          description: z.string(),
        }),
      })

      return object.description
    })
  )

  // console.log(metadata)

  return json(descriptions)
}
