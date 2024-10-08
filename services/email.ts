import { render } from "@react-email/components"
import type { ReactElement } from "react"
import { config } from "~/config"
import { resend } from "~/services/resend"

type EmailParams = {
  to: string
  subject: string
  react: ReactElement
}

export async function sendEmails(emails: EmailParams | EmailParams[]) {
  const emailArray = Array.isArray(emails) ? emails : [emails]

  const emailsToSend = emailArray.map(async ({ to, subject, react }) => ({
    from: `${config.site.name} <${config.site.email}>`,
    to,
    subject,
    react,
    text: await render(react, { plainText: true }),
  }))

  const resolvedEmails = await Promise.all(emailsToSend)

  return resend.batch.send(resolvedEmails)
}
