import {
  Body,
  Container,
  type ContainerProps,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components"
import { config } from "~/config"

export type EmailWrapperProps = ContainerProps & {
  subject: string
  to: string
}

export const EmailWrapper = ({ subject, to, children, ...props }: EmailWrapperProps) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>

      <Tailwind>
        <Body className="mx-auto my-auto bg-background font-sans">
          <Container className="w-full max-w-[580px] mx-auto px-10" {...props}>
            <Link href={config.site.url} className="inline-block mt-6 mb-2">
              <Img
                src={`${config.site.url}/_static/logo.svg`}
                width="122"
                height="32"
                alt={config.site.name}
                className="h-7 w-auto"
              />
            </Link>

            {children}

            <Hr />

            <Text className="text-xs/normal text-gray-500">
              This email was intended for <span className="text-foreground">{to}</span>. If you were
              not expecting this email, you can ignore it. If you are concerned about your accounts
              safety, please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
