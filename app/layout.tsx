import { getUrlHostname } from "@curiousleaf/utils"
import type { Metadata } from "next"
import Script from "next/script"
import type { PropsWithChildren } from "react"
import { Footer } from "~/components/footer"
import { Header } from "~/components/header"
import { Newsletter } from "~/components/newsletter"
import { PostHogProvider } from "~/components/posthog"
import { Container } from "~/components/ui/container"
import { Stars } from "~/components/ui/stars"
import { Toaster } from "~/components/ui/toaster"
import { Wrapper } from "~/components/ui/wrapper"
import { env } from "~/env"
import { GeistSans, UncutSans } from "~/lib/fonts"
import { RSS_URL, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "~/utils/constants"

import "./styles.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TAGLINE} – ${SITE_NAME}`,
    template: `%s – ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TAGLINE} – ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: `${SITE_TAGLINE} – ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    site: "@devsuite",
    creator: "@piotrkulpinski",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": RSS_URL },
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
  themeColor: [{ media: "(prefers-color-scheme: dark)" }],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${UncutSans.variable} ${GeistSans.variable}`}>
      <head>
        <Script
          src={`${env.NEXT_PUBLIC_PLAUSIBLE_HOST}/js/script.js`}
          data-domain={getUrlHostname(env.NEXT_PUBLIC_SITE_URL)}
          async
          defer
        />
      </head>

      <PostHogProvider>
        <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
          <div className="fixed inset-x-0 top-0 -z-10 max-w-screen-lg mx-auto aspect-[2/1] overflow-hidden">
            <Stars className="absolute size-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
          </div>

          <Header />

          <Container className="flex-1 flex flex-col gap-12 pb-8 pt-12 mt-[calc(var(--header-top)+var(--header-height))] md:pt-16 md:gap-16 lg:pt-20 lg:gap-20">
            {children}

            <Wrapper className="mt-auto">
              {false && (
                <Newsletter
                  title="Subscribe to our newsletter"
                  description="Stay updated with the newest additions to our digital assets library, upcoming promotions or discounts."
                />
              )}

              <hr className="relative border-foreground/15 left-1/2 w-screen -translate-x-1/2 hidden first:block" />

              <Footer />
            </Wrapper>
          </Container>

          <Toaster />
        </body>
      </PostHogProvider>
    </html>
  )
}
