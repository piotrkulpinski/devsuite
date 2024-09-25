"use server"

import { z } from "zod"
import { env } from "~/env"

/**
 * Subscribes a user to a mailing list using provided form data.
 * @param _ Unused parameter.
 * @param formData The form data containing the email and optional groups.
 * @returns An object with either a success message or an error message.
 */
export const subscribe = async (_: any, formData: FormData) => {
  const subscriberSchema = z.object({
    email: z.string().email().min(1),
    groups: z.array(z.string()).optional(),
  })

  const parsed = subscriberSchema.safeParse({
    email: formData.get("email"),
    groups: formData.getAll("groups"),
  })

  if (!parsed.success) {
    if (parsed.error.flatten().fieldErrors.email) {
      return { error: "Please provide a valid email." }
    }

    return { error: "We had trouble signing you up. Please try again." }
  }

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.MAILERLITE_API_TOKEN}`,
      },
      body: JSON.stringify(parsed.data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.log("error", error)
    return { error: "We had trouble signing you up. Please try again." }
  }

  return { message: "Thank you for subscribing!" }
}
