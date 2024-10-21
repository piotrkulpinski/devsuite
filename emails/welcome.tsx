import { Img, Link, Text } from "@react-email/components"
import { config } from "~/config"
import { EmailWrapper, type EmailWrapperProps } from "~/emails/_components/wrapper"

export type EmailWelcomeProps = EmailWrapperProps

const EmailWelcome = ({ ...props }: EmailWelcomeProps) => {
  return (
    <EmailWrapper {...props}>
      <Text>Welcome to {config.site.name}!</Text>

      <Text>
        <strong>Thank you for subscribing 🚀</strong>
      </Text>

      <Img
        src={`${config.site.url}/_static/thanks.gif`}
        width={500}
        alt="Thanks"
        className="w-full"
      />

      <Text>
        Every couple of weeks, I'll send you a free email with the latest tools, articles, and
        updates about {config.site.name} and the developer tooling space.
      </Text>

      <Text>In the meantime, please also check the following:</Text>

      <ul>
        <li>
          <Text>
            <Link href={`${config.site.url}/submit`}>Submit your developer tool</Link> in-front of
            thousands of developers looking for the best tools. It’s 100% free to submit.
          </Text>
        </li>
        <li>
          <Text>
            <Link href={`${config.site.url}/tools`}>Check out recently published tools</Link> - we
            publish 3 new projects every week.
          </Text>
        </li>
        <li>
          <Text>
            <Link href={config.links.twitter}>Follow us on Twitter/X</Link> - Let’s connect and talk
            about developer tools or anything tech related.
          </Text>
        </li>
      </ul>

      <Text>See you soon!</Text>

      <Text>
        — Piotr (<Link href={config.links.author}>@piotrkulpinski</Link>)
      </Text>

      <Img
        src={`${config.site.url}/_static/authors/piotrkulpinski.jpg`}
        width={128}
        alt="Author"
        className="mb-4 w-16 h-16 rounded-full"
      />
    </EmailWrapper>
  )
}

export default EmailWelcome
