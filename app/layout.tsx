import { getUrlHostname } from "@curiousleaf/utils"
import type { Metadata } from "next"
import Script from "next/script"
import type { PropsWithChildren } from "react"
import { PostHogProvider } from "~/components/posthog"
import { config } from "~/config"
import { env } from "~/env"
import { GeistSans, UncutSans } from "~/lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: {
    default: `${config.site.tagline} – ${config.site.name}`,
    template: `%s – ${config.site.name}`,
  },
  description: config.site.description,
  openGraph: {
    title: `${config.site.tagline} – ${config.site.name}`,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: `${config.site.tagline} – ${config.site.name}`,
    description: config.site.description,
    site: "@devsuite",
    creator: "@piotrkulpinski",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: config.site.url,
    types: { "application/rss+xml": config.links.feed },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${UncutSans.variable} ${GeistSans.variable}`}>
      <head>
        <Script
          src={`${env.NEXT_PUBLIC_PLAUSIBLE_HOST}/js/script.js`}
          data-domain={getUrlHostname(config.site.url)}
          async
          defer
        />
      </head>

      <PostHogProvider>{children}</PostHogProvider>
    </html>
  )
}
