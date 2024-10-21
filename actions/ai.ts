"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createServerAction } from "zsa"
import { generateContent } from "~/lib/generate-content"
import { getSocialsFromUrl } from "~/lib/socials"
import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

export const publishTool = createServerAction()
  .input(z.object({ slug: z.string() }))
  .handler(async ({ input }) => {
    const tool = await prisma.tool.findUniqueOrThrow({
      where: { slug: input.slug },
    })

    await prisma.tool.update({
      where: { id: tool.id },
      data: { publishedAt: new Date() },
    })

    await inngest.send({ name: "tool.scheduled", data: { slug: tool.slug } })

    revalidatePath(`/tools/${tool.slug}`)
  })

// TODO: remove later
export const generateToolContent = createServerAction()
  .input(z.object({ slug: z.string() }))
  .handler(async ({ input }) => {
    const tool = await prisma.tool.findUniqueOrThrow({
      where: { slug: input.slug },
    })

    const [{ categories, tags, ...content }, socials] = await Promise.all([
      generateContent(tool),
      getSocialsFromUrl(tool.websiteUrl),
    ])

    await prisma.tool.update({
      where: { id: tool.id },
      data: {
        ...content,
        xHandle: socials.X?.[0]?.user,
        socials: Object.entries(socials).map(([name, links]) => ({ name, url: links[0].url })),
        categories: { set: categories.map(({ slug }) => ({ slug })) },
        tags: {
          connectOrCreate: tags.map(({ name, slug }) => ({
            where: { slug },
            create: { name, slug },
          })),
        },
      },
    })

    revalidatePath(`/tools/${tool.slug}`)

    return content
  })

// import Firecrawl from "@mendable/firecrawl-js"
// import type { Tool } from "@prisma/client"
// import { generateObject } from "ai"
// import { z } from "zod"
// import { env } from "~/env"
// import { openai } from "~/services/openai"
// import { prisma } from "~/services/prisma"

// // const model = groq("llama3-70b-8192")
// const model = openai("gpt-4o")
// const firecrawl = new Firecrawl({ apiKey: env.FIRECRAWL_API_KEY })
// // const anthropic = createAnthropic()
// // const model = anthropic("claude-3-5-sonnet-20240620")

// export const generateContent = async () => {
//   const tools = await prisma.tool.findMany({
//     where: { publishedAt: { not: null } },
//     orderBy: { createdAt: "desc" },
//     take: 1,
//   })

//   return await processToolsInBatches(tools, 3)
// }

// const processToolsInBatches = async (tools: Tool[], batchSize: number) => {
//   const batches = []
//   const responses = []

//   for (let i = 0; i < tools.length; i += batchSize) {
//     const batch = tools.slice(i, i + batchSize)
//     batches.push(batch)
//   }

//   for (const batch of batches) {
//     console.log(`Processing ${batches.indexOf(batch) + 1} of ${batches.length} batches...`)

//     const promises = batch.map(async tool => {
//       try {
//         const scrapedData = await firecrawl.scrapeUrl(tool.websiteUrl, {
//           formats: ["markdown"],
//         })

//         if (!scrapedData.success) {
//           return null
//         }

//         const { object } = await generateObject({
//           model,
//           system: `
//             You are an expert content creator specializing in open source products.
//             Your task is to generate high-quality, engaging content to display on a directory website.
//             You do not use any catchphrases like "Empower", "Streamline" etc.
//           `,
//           prompt: `
//             Provide me details for the following data: ${scrapedData.markdown}
//           `,
//           schema: z.object({
//             tagline: z
//               .string()
//               .describe(
//                 "A tagline (up to 60 characters) that captures the essence of the tool. Should not include the tool name.",
//               ),
//             description: z
//               .string()
//               .describe(
//                 "A concise description (up to 160 characters) that is suitable for a SEO description. Should not include the tool name.",
//               ),
//             content: z
//               .string()
//               .describe(
//                 "A detailed longer description (up to 1000 characters) of the tool describing what it is and . Can be Markdown formatted, but should start with paragraph. Make sure the lists use correct Markdown syntax.",
//               ),
//             links: z
//               .array(z.object({ name: z.string(), url: z.string().url() }))
//               .describe(
//                 "A list of relevant links to pricing information, documentation, social profiles and other resources. Make sure to include the name of the link and the URL. Social profiles should be last. Skip landing page and Github repository links.",
//               ),
//             tags: z
//               .array(z.string())
//               .optional()
//               .describe("A recommended list of tags that describe the tool."),
//             testimonials: z
//               .array(
//                 z.object({
//                   author: z.string().describe("The name of the user who provided the testimonial."),
//                   role: z
//                     .string()
//                     .describe("The role and company of the user who provided the testimonial."),
//                   content: z.string().describe("The testimonial content."),
//                 }),
//               )
//               .optional()
//               .describe("An optional list of testimonials from users of the tool."),
//             trustedBy: z
//               .array(
//                 z.object({
//                   name: z.string(),
//                   logo: z.string().url(),
//                   url: z.string().url(),
//                 }),
//               )
//               .optional()
//               .describe("An optional list of companies or organizations that trust the tool."),
//           }),
//         })

//         console.log(`${tool.id} scraped and content generated successfully.`)

//         return object

//         // return await prisma.tool.update({
//         //   where: { id: tool.id },
//         //   data: {
//         //     tagline: object.tagline,
//         //     description: object.description,
//         //     content: object.content,
//         //     links: object.links,
//         //   },
//         // })
//       } catch (e) {
//         console.error(`Tool content generation failed for ${tool.name}: `, e)
//         return null
//       }
//     })

//     responses.push(await Promise.all(promises))

//     console.log("Waiting for 60 seconds before processing the next batch...")

//     // Sleep
//     // await new Promise((res) => setTimeout(res, 60_000))
//   }

//   return responses
// }
