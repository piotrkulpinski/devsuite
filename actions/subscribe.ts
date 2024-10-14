"use server"

import { createServerAction } from "zsa"
import { newsletterSchema } from "~/api/schemas"
import { env } from "~/env"

/**
 * Subscribe to the newsletter
 * @param input - The newsletter data to subscribe to
 * @returns The newsletter that was subscribed to
 */
export const subscribeToNewsletter = createServerAction()
  .input(newsletterSchema)
  .handler(async ({ input }) => {
    const url = `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify(input),
    })

    const { data } = await response.json()

    if (data?.status !== "active") {
      throw new Error("Failed to subscribe to newsletter")
    }

    return "You've been subscribed to the newsletter!"
  })
