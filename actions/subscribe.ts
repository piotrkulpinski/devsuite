"use server"

import ky from "ky"
import { createServerAction } from "zsa"
import { newsletterSchema } from "~/api/schemas"
import { env } from "~/env"
import { inngest } from "~/services/inngest"

/**
 * Subscribe to the newsletter
 * @param input - The newsletter data to subscribe to
 * @returns The newsletter that was subscribed to
 */
export const subscribeToNewsletter = createServerAction()
  .input(newsletterSchema)
  .handler(async ({ input: { send_welcome_email, ...json } }) => {
    const url = `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`

    const { data } = await ky
      .post(url, { json, headers: { Authorization: `Bearer ${env.BEEHIIV_API_KEY}` } })
      .json<{ data: { status: string } }>()

    if (data?.status !== "active") {
      throw new Error("Failed to subscribe to newsletter")
    }

    // TODO: Check if the user is already subscribed to prevent duplicate emails
    if (send_welcome_email) {
      // Send event to Inngest pipeline
      await inngest.send({ name: "newsletter.subscribed", data: { email: json.email } })
    }

    return "You've been subscribed to the newsletter!"
  })
