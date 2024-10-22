"use server"

import { slugify } from "@curiousleaf/utils"
import { createServerAction } from "zsa"
import { subscribeToNewsletter } from "~/actions/subscribe"
import { submitToolSchema } from "~/api/schemas"
import { inngest } from "~/services/inngest"
import { prisma } from "~/services/prisma"

/**
 * Submit a tool to the database
 * @param input - The tool data to submit
 * @returns The tool that was submitted
 */
export const submitTool = createServerAction()
  .input(submitToolSchema)
  .handler(async ({ input }) => {
    const { newsletterOptIn, ...data } = input

    const tool = await prisma.tool.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
    })

    if (newsletterOptIn) {
      await subscribeToNewsletter({
        email: data.submitterEmail,
        utm_medium: "submit_form",
        send_welcome_email: false,
      })
    }

    // Send an event to the Inngest pipeline
    await inngest.send({ name: "tool.submitted", data: { slug: tool.slug } })

    return tool
  })
