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

export const getCollectionsSchema = searchParamsSchema

export type GetCollectionsSchema = z.infer<typeof getCollectionsSchema>

export const collectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  tools: z.array(z.string()).optional(),
})

export type CollectionSchema = z.infer<typeof collectionSchema>
