"use server"

import { unstable_noStore as noStore } from "next/cache"
import type { z } from "zod"
import { newsletterSchema } from "~/api/schemas"
import { env } from "~/env"
import { getErrorMessage } from "~/lib/errors"

/**
 * Subscribe to the newsletter
 * @param input - The newsletter data to subscribe to
 * @returns The newsletter that was subscribed to
 */
export const subscribeToNewsletter = async (input: z.infer<typeof newsletterSchema>) => {
  noStore()

  try {
    const data = await newsletterSchema.parseAsync(input)
    const url = `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify(data),
    })

    return {
      message: "You've been subscribed to the newsletter!",
      error: null,
    }
  } catch (err) {
    return {
      message: null,
      error: getErrorMessage(err),
    }
  }
}
