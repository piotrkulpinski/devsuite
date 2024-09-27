import type { Metadata } from "next"
import localFont from "next/font/local"
import type { PropsWithChildren } from "react"
import { Footer } from "~/components/footer"
import { Header } from "~/components/header"
import { Container } from "~/components/ui/container"
import { GradientBlur } from "~/components/ui/gradient-blur"
import { Stars } from "~/components/ui/stars"
import { Toaster } from "~/components/ui/toaster"
import { env } from "~/env"

import "./styles.css"
import Script from "next/script"
import { Newsletter } from "~/components/newsletter"
import { Wrapper } from "~/components/ui/wrapper"
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "~/utils/constants"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${SITE_TAGLINE} – ${SITE_NAME}`,
    template: `%s – ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_TAGLINE} – ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: `${SITE_TAGLINE} – ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/opengraph.png", width: 1200, height: 630 }],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          src="https://plausible.kulpinski.dev/js/script.js"
          data-domain="devsuite.co"
          async
          defer
        />
      </head>

      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <Header />

        <Container className="flex-1 flex flex-col gap-12 pb-8 pt-12 mt-[calc(var(--header-top)+var(--header-height))] md:pt-16 md:gap-16 lg:pt-20 lg:gap-20">
          <GradientBlur position="top" />

          <Stars className="fixed left-1/2 -top-0 -z-10 w-full min-w-[1000px] max-w-screen-2xl aspect-[10/5] mx-auto -translate-x-1/2 -translate-y-1/3" />

          {children}

          <Wrapper className="mt-auto">
            {false && (
              <Newsletter
                title="Subscribe to our newsletter"
                description="Stay updated with the newest additions to our digital assets library, upcoming promotions or discounts."
              />
            )}

            <hr className="border-foreground/10 hidden first:block" />

            <Footer />
          </Wrapper>
        </Container>

        <Toaster />
      </body>
    </html>
  )
}
