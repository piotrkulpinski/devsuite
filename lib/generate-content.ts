import { createAnthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { isTruthy, slugify } from "@curiousleaf/utils"
import type { Tool } from "@prisma/client"
import { generateObject } from "ai"
import type { Jsonify } from "inngest/helpers/jsonify"
import { z } from "zod"
import { config } from "~/config"
import { getErrorMessage } from "~/lib/handle-error"
import { firecrawlClient } from "~/services/firecrawl"
import { prisma } from "~/services/prisma"

/**
 * Generates content for a tool.
 * @param tool The tool to generate content for.
 * @returns The generated content.
 */
export const generateContent = async (tool: Tool | Jsonify<Tool>) => {
  const model = createAnthropic()("claude-3-5-sonnet-20240620")
  const categories = await prisma.category.findMany()

  try {
    const scrapedData = await firecrawlClient.scrapeUrl(tool.websiteUrl, {
      formats: ["markdown"],
    })

    if (!scrapedData.success) {
      throw new Error(scrapedData.error)
    }

    const schema = z.object({
      tagline: z
        .string()
        .describe(
          "A tagline (up to 60 characters) that captures the essence of the tool. Should not include the tool name.",
        ),
      description: z
        .string()
        .describe(
          "A concise description (up to 160 characters) that highlights the main features and benefits. Should not include the tool name.",
        ),
      content: z
        .string()
        .describe(
          "A detailed and engaging longer description with key benefits (up to 1000 characters). Can be Markdown formatted, but should start with paragraph and not use headings. Make sure the lists use correct Markdown syntax.",
        ),
      categories: z
        .array(z.string())
        .max(2)
        .transform(a => a.map(slug => categories.find(c => c.slug === slug)).filter(isTruthy))
        .describe("A list of categories for the tool."),
      tags: z
        .array(z.string().transform(name => ({ name, slug: slugify(name) })))
        .max(10)
        .describe(
          "A list (max 10) of tags for the tool. Should be short, descriptive and related to software development",
        ),
    })

    const { object } = await generateObject({
      model,
      schema,
      system: `
        You are an expert content creator specializing in developer tool software products.
        Your task is to generate high-quality, engaging content to display on a directory website.
        You do not use any catchphrases like "Empower", "Streamline" etc.
        You also assign the project to specified categories and collections.
        DO NOT force it to be in a category or collection if it does not belong to any.
        DO NOT assign to any categories or collections that do not exist.
      `,
      prompt: `
        Provide me details for the following data:
        title: ${scrapedData.metadata?.title}
        description: ${scrapedData.metadata?.description}
        content: ${scrapedData.markdown}

        Here is the list of categories to assign to the tool:
        ${categories.map(({ name }) => name).join("\n")}
      `,
      temperature: 0.3,
    })

    return object
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

/**
 * Generates a launch tweet for a tool.
 * @param tool The tool to generate a launch tweet for.
 * @returns The launch tweet.
 */
export const generateLaunchTweet = async (tool: Tool | Jsonify<Tool>) => {
  const model = openai("gpt-4o")

  const { object } = await generateObject({
    model,
    schema: z.object({
      tweet: z.string().max(280).describe("The launch tweet"),
    }),
    system: `
      You are an expert content creator.
      Use new lines to separate paragraphs.
      Tweet should do not exceed 240 characters.
      Use the following template:
      "
      🚀 Just published — {name} ({X handle}): {tagline}

      {description}

      {links}
      "
    `,
    prompt: `
      Generate a tweet to announce the publication of the following developer tool software product:

      Name: "${tool.name}"
      Tagline: "${tool.tagline}"
      Description: "${tool.description}"
      X Handle: "${tool.xHandle}"
      Link: "${config.site.url}/tools/${tool.slug}"
    `,
  })

  return object
}

/**
 * Finds the Twitter handle from a list of links.
 * @param links The list of links.
 * @returns The Twitter handle, or undefined if not found.
 */
export const findTwitterHandle = (urls: string[]) => {
  const regex = /^https?:\/\/(?:www\.)?(twitter|x)\.com\/(@?[a-zA-Z0-9_]{1,25})/i

  for (const url of urls) {
    const match = url.match(regex)
    if (match) {
      return match[2]?.startsWith("@") ? match[2].slice(1) : match[2]
    }
  }

  return undefined
}
