import type { Tool } from "@prisma/client"
import { EventSchemas, Inngest } from "inngest"
import { config } from "~/config"

type Events = {
  "tool.submitted": { data: Pick<Tool, "slug"> }
  "tool.scheduled": { data: Pick<Tool, "slug"> }
  "tool.published": { data: Pick<Tool, "slug"> }
  "tool.deleted": { data: Pick<Tool, "slug"> }
}

export const inngest = new Inngest({
  id: config.site.name,
  schemas: new EventSchemas().fromRecord<Events>(),
})
