import type Stripe from "stripe"
import { config } from "~/config"
import EmailAdminNewSubmission from "~/emails/admin/new-submission"
import EmailSubmissionExpedited from "~/emails/submission-expedited"
import { env } from "~/env"
import { sendEmails } from "~/services/email"
import { prisma } from "~/services/prisma"
import { stripe } from "~/services/stripe"

const relevantEvents = new Set([
  "payment_intent.created",
  "customer.subscription.created",
  "customer.subscription.deleted",
])

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") as string
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!signature || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 })
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log(`🔔  Webhook received: ${event.type}`)
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "payment_intent.created": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent
          const { slug } = paymentIntent.metadata as Stripe.Metadata

          try {
            const tool = await prisma.tool.findUniqueOrThrow({ where: { slug } })

            const to = tool.submitterEmail ?? ""
            const subject = `🙌 Thanks for submitting ${tool.name}!`

            const adminTo = config.site.email
            const adminSubject = "New Expedited Listing Request"

            console.log(`💌 Sending submission emails about tool: ${tool.name}`)

            await sendEmails([
              {
                to,
                subject,
                react: EmailSubmissionExpedited({ tool, to, subject }),
              },
              {
                to: adminTo,
                subject: adminSubject,
                react: EmailAdminNewSubmission({ tool, to: adminTo, subject: adminSubject }),
              },
            ])
          } catch (error: any) {
            console.log(error)
            throw new Error(`Payment intent insert/update failed: ${error.message}`)
          }

          break
        }

        case "customer.subscription.created": {
          const subscription = event.data.object as Stripe.Subscription
          const { slug } = subscription.metadata as Stripe.Metadata

          try {
            const tool = await prisma.tool.update({
              where: { slug },
              data: { isFeatured: true },
            })

            // TODO: Send admin email about new featured listing
          } catch (error: any) {
            console.log(error)
            throw new Error(`Subscription insert/update failed: ${error.message}`)
          }

          break
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription
          const { slug } = subscription.metadata as Stripe.Metadata

          try {
            const tool = await prisma.tool.update({
              where: { slug },
              data: { isFeatured: false },
            })

            // TODO: Send admin email about deleted featured listing
          } catch (error: any) {
            console.log(error)
            throw new Error(`Subscription insert/update failed: ${error.message}`)
          }

          break
        }

        default:
          throw new Error("Unhandled relevant event!")
      }
    } catch (error) {
      console.log(error)
      return new Response("Webhook handler failed. View your Next.js function logs.", {
        status: 400,
      })
    }
  }

  return new Response(JSON.stringify({ received: true }))
}
