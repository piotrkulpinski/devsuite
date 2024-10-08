import { env } from "~/env"

export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
  email: env.NEXT_PUBLIC_SITE_EMAIL,
  name: "DevSuite",
  tagline: "A suite of developer tools that help you ship faster 🚀",
  description:
    "Find the best tools to help you build faster and more efficiently. Stop wasting time and money by developing tools that already exist.",
}
