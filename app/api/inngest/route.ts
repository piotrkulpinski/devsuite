import { serve } from "inngest/next"
import { newsletterSubscribed } from "~/functions/newsletter-subscribed"
import { toolDeleted } from "~/functions/tool-deleted"
import { toolExpedited } from "~/functions/tool-expedited"
import { toolFeatured } from "~/functions/tool-featured"
import { toolPublished } from "~/functions/tool-published"
import { toolScheduled } from "~/functions/tool-scheduled"
import { toolSubmitted } from "~/functions/tool-submitted"
import { inngest } from "~/services/inngest"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    toolScheduled,
    toolPublished,
    toolDeleted,
    toolSubmitted,
    toolExpedited,
    toolFeatured,
    newsletterSubscribed,
  ],
})
