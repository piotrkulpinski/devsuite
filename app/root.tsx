/** eslint-disable @typescript-eslint/no-unused-vars */
import { LinksFunction } from "@remix-run/node"
import { ThemeProvider } from "next-themes"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "@remix-run/react"
import { Footer } from "~/partials/Footer"
import { Container } from "./components/Container"
import { GradientBlur } from "./components/GradientBlur"
import TopBarProgress from "react-topbar-progress-indicator"

import stylesheet from "~/styles.css?url"
import { Header } from "./partials/Header"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesheet },
    { rel: "icon", href: "/favicon.png", type: "image/png" },
    { rel: "preconnect", href: "https://rsms.me/" },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        {navigation.state == "loading" && <TopBarProgress />}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <Container className="flex-1 flex flex-col gap-12 py-12 mt-[calc(var(--header-top)+var(--header-height))] md:py-16 lg:py-20">
            <GradientBlur position="top" />
            {children}
            <GradientBlur position="bottom" />
          </Container>

          <Footer />
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
