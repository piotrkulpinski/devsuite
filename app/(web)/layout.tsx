import type { PropsWithChildren } from "react"
import { Footer } from "~/components/web/footer"
import { Header } from "~/components/web/header"
import { Newsletter } from "~/components/web/newsletter"
import { Container } from "~/components/web/ui/container"
import { Stars } from "~/components/web/ui/stars"
import { Toaster } from "~/components/web/ui/toaster"
import { Wrapper } from "~/components/web/ui/wrapper"

import "./styles.css"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
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

          <hr className="relative left-1/2 w-screen -translate-x-1/2 hidden first:block" />

          <Footer />
        </Wrapper>
      </Container>

      <Toaster />
    </>
  )
}
