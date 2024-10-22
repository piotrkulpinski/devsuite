import { config } from "~/config"
import EmailWelcome from "~/emails/welcome"
import { sendEmails } from "~/lib/email"
import { inngest } from "~/services/inngest"

export const newsletterSubscribed = inngest.createFunction(
  { id: "newsletter.subscribed" },
  { event: "newsletter.subscribed" },
  async ({ event, step }) => {
    await step.run("send-welcome-email", async () => {
      const to = event.data.email
      const subject = `Welcome to ${config.site.name} 🚀`

      return sendEmails({
        to,
        subject,
        react: EmailWelcome({ to, subject }),
      })
    })
  },
)
