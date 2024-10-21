import { serve } from "inngest/next"
import { toolDeleted } from "~/functions/tool-deleted"
import { toolPublished } from "~/functions/tool-published"
import { toolScheduled } from "~/functions/tool-scheduled"
import { toolSubmitted } from "~/functions/tool-submitted"
import { inngest } from "~/services/inngest"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [toolScheduled, toolPublished, toolDeleted, toolSubmitted],
})
