import { z } from "zod"
import { env } from "~/env"
import { isRealEmail } from "~/lib/email"
import { SITE_NAME } from "~/utils/constants"

export const submitToolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  websiteUrl: z.string().min(1, "Website is required").url("Invalid URL"),
  description: z.string().optional(),
  submitterName: z.string().min(1, "Your name is required"),
  submitterEmail: z.string().min(1, "Your email is required").email(),
  newsletterOptIn: z.boolean().optional().default(true),
})

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(isRealEmail, "Invalid email address, please use a real one"),
  referring_site: z.string().optional().default(env.NEXT_PUBLIC_SITE_URL),
  utm_source: z.string().optional().default(SITE_NAME),
  utm_medium: z.string().optional().default("subscribe_form"),
  utm_campaign: z.string().optional().default("organic"),
  double_opt_override: z.string().optional().default("off"),
  reactivate_existing: z.boolean().optional().default(true),
  send_welcome_email: z.boolean().optional().default(true),
})
