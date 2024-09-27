import { env } from "~/env"

export const SITE_URL = env.NEXT_PUBLIC_SITE_URL
export const SITE_EMAIL = env.NEXT_PUBLIC_SITE_EMAIL
export const SITE_NAME = "DevSuite"
export const SITE_TAGLINE = "A suite of developer tools that help you ship faster 🚀"
export const SITE_DESCRIPTION =
  "Find the best tools to help you build faster and more efficiently. Stop wasting time and money by developing tools that already exist."

export const RSS_URL = `${SITE_URL}/rss.xml`
export const TWITTER_URL = "https://x.com/ossalternative"
export const TWITTER_AUTHOR_URL = "https://x.com/piotrkulpinski"
export const GITHUB_URL = "https://github.com/piotrkulpinski/devsuite"

export const FAMILY_LINKS = [
  {
    title: "OpenAlternative",
    href: "https://openalternative.co",
    description: "Open Source Alternatives to Popular Software",
  },
  {
    title: "Superstash",
    href: "https://superstash.co",
    description: "No-code directory website builder",
  },
  {
    title: "Chipmunk Theme",
    href: "https://chipmunktheme.com",
    description: "Build directory websites in WordPress",
  },
]

export const DAY_IN_MS = 1000 * 60 * 60 * 24

export const JSON_HEADERS = {
  "Cache-Control": "public, max-age=3600, s-maxage=7200 stale-while-revalidate=3.154e7",
}
