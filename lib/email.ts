import { SendEmailCommand } from "@aws-sdk/client-sesv2"
import { render } from "@react-email/components"
import type { ReactElement } from "react"
import { config } from "~/config"
import { sesClient } from "~/services/aws-ses"

type EmailParams = {
  to: string | string[]
  subject: string
  template: ReactElement
}

export const sendEmail = async ({ to, subject, template }: EmailParams) => {
  return sesClient.send(
    new SendEmailCommand({
      FromEmailAddress: `${config.site.name} <${config.site.email}>`,
      Destination: { ToAddresses: Array.isArray(to) ? to : [to] },
      Content: {
        Simple: {
          Subject: { Data: subject },
          Body: {
            Html: { Data: await render(template) },
            Text: { Data: await render(template, { plainText: true }) },
          },
        },
      },
    }),
  )
}

export const isRealEmail = async (email: string) => {
  const disposableJsonURL =
    "https://rawcdn.githack.com/disposable/disposable-email-domains/master/domains.json"
  const response = await fetch(disposableJsonURL)
  const disposableDomains: string[] = await response.json()
  const domain = email.split("@")[1]

  return !disposableDomains.includes(domain)
}
