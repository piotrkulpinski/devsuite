import type Stripe from "stripe"
import { config } from "~/config"
import EmailAdminNewSubmission from "~/emails/admin/new-submission"
import EmailSubmissionExpedited from "~/emails/submission-expedited"
import { env } from "~/env"
import { sendEmail } from "~/lib/email"
import { prisma } from "~/services/prisma"
import { stripe } from "~/services/stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") as string
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!signature || !webhookSecret) {
      return new Response("Webhook secret not found.", { status: 400 })
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object
        const metadata = checkoutSession.metadata

        if (!metadata?.tool || checkoutSession.mode !== "payment") {
          break
        }

        const tool = await prisma.tool.findUniqueOrThrow({
          where: { slug: metadata.tool },
        })

        const to = config.site.email // TODO: Update when out of sandbox: tool.submitterEmail ?? ""
        const subject = `🙌 Thanks for submitting ${tool.name}!`

        const adminTo = config.site.email
        const adminSubject = "New Expedited Listing Request"

        await Promise.all([
          // Send submission email to user
          sendEmail({
            to,
            subject,
            template: EmailSubmissionExpedited({ tool, to, subject }),
          }),

          // Send admin email about new expedited listing
          sendEmail({
            to: adminTo,
            subject: adminSubject,
            template: EmailAdminNewSubmission({ tool, to: adminTo, subject: adminSubject }),
          }),
        ])

        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const metadata = subscription.metadata

        if (!metadata?.tool) {
          break
        }

        await prisma.tool.update({
          where: { slug: metadata?.tool },
          data: { isFeatured: subscription.status === "active" },
        })

        if (event.type === "customer.subscription.created") {
          // TODO: Send admin email about new featured listing
        }

        if (event.type === "customer.subscription.deleted") {
          // TODO: Send admin email about deleted featured listing
        }

        break
      }
    }
  } catch (error) {
    console.log(error)

    return new Response("Webhook handler failed", { status: 400 })
  }

  return new Response(JSON.stringify({ received: true }))
}
