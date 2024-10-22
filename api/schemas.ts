import { z } from "zod"
import { config } from "~/config"
import { isRealEmail } from "~/utils/helpers"

export const submitToolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  websiteUrl: z.string().min(1, "Website is required").url("Invalid URL"),
  submitterName: z.string().min(1, "Your name is required"),
  submitterEmail: z.string().min(1, "Your email is required").email(),
  newsletterOptIn: z.boolean().optional().default(true),
})

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(isRealEmail, "Invalid email address, please use a real one"),
  referring_site: z.string().optional().default(config.site.url),
  utm_source: z.string().optional().default(config.site.name),
  utm_medium: z.string().optional().default("subscribe_form"),
  utm_campaign: z.string().optional().default("organic"),
  double_opt_override: z.string().optional().default("off"),
  reactivate_existing: z.boolean().optional().default(true),
  send_welcome_email: z.boolean().optional().default(true),
})
