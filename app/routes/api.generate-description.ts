import { generateObject } from "ai"
import { z } from "zod"
import { groq } from "~/services.server/openai"

export const loader = async () => {
  const model = groq("gemma-7b-it")
  // const tools = (await prisma.tool.findMany()).splice(0, 10)

  // const descriptions = await Promise.all(
  //   tools.map(async (tool) => {
  const prompt = `find me links related to Supabase, its website and social profiles`

  const { object } = await generateObject({
    model,
    prompt,
    schema: z.array(z.object({ name: z.string(), url: z.string().url() })).max(5),
  })

  return object
  // })
  // )

  // console.log(metadata)

  // return json(descriptions)
}
