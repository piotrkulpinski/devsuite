import { EventSchemas, Inngest } from "inngest"
import { config } from "~/config"

type ToolEventData = { slug: string }
type NewsletterEventData = { email: string }

type Events = {
  "tool.submitted": { data: ToolEventData }
  "tool.expedited": { data: ToolEventData }
  "tool.featured": { data: ToolEventData }
  "tool.scheduled": { data: ToolEventData }
  "tool.published": { data: ToolEventData }
  "tool.deleted": { data: ToolEventData }
  "newsletter.subscribed": { data: NewsletterEventData }
}

export const inngest = new Inngest({
  id: config.site.name,
  schemas: new EventSchemas().fromRecord<Events>(),
})
