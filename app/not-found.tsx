"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <Intro alignment="center" className="max-w-xl">
      <IntroTitle>404 Not Found</IntroTitle>
      <IntroDescription>
        We're sorry, but the page {pathname} could not be found. You may have mistyped the address
        or the page may have moved.
      </IntroDescription>

      <Button className="mt-4" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </Intro>
  )
}