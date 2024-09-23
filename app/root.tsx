import type { LinksFunction } from "@remix-run/node"
import { Links, Meta, Scripts, ScrollRestoration, useMatches } from "@remix-run/react"
import { ThemeProvider } from "next-themes"
import { Container } from "./components/Container"
import { GradientBlur } from "./components/GradientBlur"
import { Stars } from "./components/Stars"
import { Toaster } from "./components/Toaster"
import { ErrorPage } from "./partials/ErrorPage"
import { Footer } from "./partials/Footer"
import { Header } from "./partials/Header"
import { Newsletter } from "./partials/Newsletter"

import styles from "~/styles.css?url"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/favicon.png", type: "image/png" },
  ]
}

type RouteMatch = {
  handle: {
    newsletter?: boolean
    topBlur?: boolean
    bottomBlur?: boolean
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches() as RouteMatch[]
  const noNewsletter = matches.some(({ handle }) => handle?.newsletter === false)
  const noTopBlur = matches.some(({ handle }) => handle?.topBlur === false)
  const noBottomBlur = matches.some(({ handle }) => handle?.bottomBlur === false)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <Container className="flex-1 flex flex-col gap-12 py-12 mt-[calc(var(--header-top)+var(--header-height))] md:pt-16 md:gap-16 lg:pt-20 lg:gap-20">
            {!noTopBlur && <GradientBlur position="top" />}

            <Stars className="fixed left-1/2 -top-0 -z-10 w-full min-w-[1000px] max-w-screen-2xl aspect-[10/5] mx-auto scale-y-flip -translate-x-1/2 -translate-y-1/3" />

            {children}

            {!noNewsletter && (
              <Newsletter
                title="Subscribe to our newsletter"
                description="Stay updated with the newest additions to our digital assets library, upcoming promotions or discounts."
                className="mt-auto"
              />
            )}

            {!noBottomBlur && <GradientBlur position="bottom" />}
          </Container>

          <Footer />
        </ThemeProvider>

        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  return <ErrorPage />
}
