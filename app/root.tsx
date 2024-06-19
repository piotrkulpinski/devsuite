/** eslint-disable @typescript-eslint/no-unused-vars */
import { LinksFunction } from "@remix-run/node"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react"
import { Container } from "./components/Container"
import { ThemeProvider } from "next-themes"

import stylesheet from "~/styles.css?url"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesheet },
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>",
    },
    { rel: "preconnect", href: "https://rsms.me/" },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pathname } = useLocation()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Header /> */}

          <Container className="flex-1 flex flex-col gap-12 py-12 mt-[calc(var(--header-top)+var(--header-height))] md:pt-16 lg:pt-20">
            {/* <GradientBlur position="top" /> */}

            {children}

            {/* {!pathname.includes("submit") && (
              <Newsletter
                title="Subscribe to our newsletter"
                description="Stay updated with the newest additions to our digital assets library, upcoming promotions or discounts."
              />
            )} */}

            {/* <GradientBlur position="bottom" /> */}
          </Container>

          {/* <Footer /> */}
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
