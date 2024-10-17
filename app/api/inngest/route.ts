import { serve } from "inngest/next"
import { toolScheduled } from "~/functions/tool-scheduled"
import { inngest } from "~/services/inngest"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [toolScheduled],
})
