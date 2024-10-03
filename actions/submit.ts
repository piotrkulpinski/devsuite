"use server"

import { slugify } from "@curiousleaf/utils"
import { unstable_noStore as noStore } from "next/cache"
import type { z } from "zod"
import { subscribeToNewsletter } from "~/actions/subscribe"
import { submitToolSchema } from "~/api/schemas"
import { getErrorMessage } from "~/lib/errors"
import { prisma } from "~/services/prisma"

/**
 * Submit a tool to the database
 * @param input - The tool data to submit
 * @returns The tool that was submitted
 */
export const submitTool = async (input: z.infer<typeof submitToolSchema>) => {
  noStore()

  try {
    const { newsletterOptIn, ...data } = submitToolSchema.parse(input)

    const tool = await prisma.tool.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
    })

    if (newsletterOptIn) {
      try {
        await subscribeToNewsletter({
          email: data.submitterEmail,
          utm_medium: "submit_form",
        })
      } catch {}
    }

    return {
      data: tool,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
