import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(50),
  sort: z.string().optional(),
  name: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getToolsSchema = searchParamsSchema

export type GetToolsSchema = z.infer<typeof getToolsSchema>

export const socialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Must be a valid URL"),
})

export const toolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  websiteUrl: z.string().url("Invalid URL").min(1, "Website URL is required"),
  affiliateUrl: z.string().url("Invalid URL").optional(),
  faviconUrl: z.string().url("Invalid URL").optional(),
  screenshotUrl: z.string().url("Invalid URL").optional(),
  socials: z.array(socialSchema).optional(),
  isFeatured: z.boolean().default(false),
  xHandle: z.string().optional(),
  submitterName: z.string().optional(),
  submitterEmail: z.string().email("Invalid email").optional(),
  publishedAt: z.date().nullable(),
  categories: z.array(z.string()).optional(),
  collections: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
})

export type ToolSchema = z.infer<typeof toolSchema>
