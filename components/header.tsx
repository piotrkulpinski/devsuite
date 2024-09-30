"use client"

import { SparkleIcon } from "lucide-react"
import Link from "next/link"
import { type HTMLAttributes, useEffect, useState } from "react"
import { SearchForm } from "~/components/search-form"
import { Box } from "~/components/ui/box"
import { Button } from "~/components/ui/button"
import { Container } from "~/components/ui/container"
import { Logo } from "~/components/ui/logo"
import { NavigationLink } from "~/components/ui/navigation-link"
import { cx } from "~/utils/cva"

export const Header = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const [isNavOpen, setNavOpen] = useState(false)

  // Close the mobile navigation when the user presses the "Escape" key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <Container
      className={cx("fixed top-[var(--header-top)] z-40 left-1/2 -translate-x-1/2", className)}
      {...props}
    >
      <Box>
        <div
          data-state={isNavOpen ? "open" : "close"}
          className={cx(
            "group/menu flex flex-wrap items-center gap-3 py-2 px-4 -mx-2 h-[var(--header-height)] bg-background/25 backdrop-blur-xl rounded-xl isolate overflow-clip duration-300 md:-mx-4 md:gap-6",
            "max-lg:data-[state=open]:h-[calc(100dvh-(var(--header-top)*2))] max-md:data-[state=open]:bg-background/75",
          )}
        >
          <button
            type="button"
            onClick={() => setNavOpen(!isNavOpen)}
            className="block -m-1 md:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              className="size-7 duration-300 select-none will-change-transform group-data-[state=open]/menu:rotate-45"
              viewBox="0 0 100 100"
              aria-label="Toggle navigation"
              role="img"
            >
              <path
                className="fill-none duration-300 stroke-current stroke-[5] [stroke-linecap:round] [stroke-dasharray:40_121] group-data-[state=open]/menu:[stroke-dashoffset:-68px]"
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              />
              <path
                className="fill-none duration-300 stroke-current stroke-[5] [stroke-linecap:round]"
                d="m 55,50 h -25"
              />
              <path
                className="fill-none duration-300 stroke-current stroke-[5] [stroke-linecap:round] [stroke-dasharray:40_121] group-data-[state=open]/menu:[stroke-dashoffset:-68px]"
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              />
            </svg>
          </button>

          <Logo className="mr-auto" />

          <nav className="hidden md:contents">
            <NavigationLink href="/tools">All Tools</NavigationLink>
            <NavigationLink href="/categories">Categories</NavigationLink>
            <NavigationLink href="/collections">Collections</NavigationLink>
            <NavigationLink href="/advertise">Advertise</NavigationLink>
          </nav>

          <SearchForm className="-mx-2 max-sm:hidden" />

          <Button size="md" variant="primary" suffix={<SparkleIcon />} className="-mr-1.5" asChild>
            <Link href="/submit">Submit</Link>
          </Button>

          <nav
            className={cx(
              "size-full mt-6 mb-4 grid grid-cols-2 place-content-start gap-x-4 gap-y-6 px-2 text-lg transition-opacity md:hidden",
              isNavOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <NavigationLink href="/latest">Latest</NavigationLink>
            <NavigationLink href="/categories">Categories</NavigationLink>
            <NavigationLink href="/alternatives">Alternatives</NavigationLink>
            <NavigationLink href="/languages">Languages</NavigationLink>
            <NavigationLink href="/topics">Topics</NavigationLink>
            <NavigationLink href="/submit">Submit</NavigationLink>
            <NavigationLink href="/sponsor">Sponsor</NavigationLink>
            <NavigationLink href="/about">About</NavigationLink>
          </nav>
        </div>
      </Box>
    </Container>
  )
}
