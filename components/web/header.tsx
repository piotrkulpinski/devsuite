"use client"

import { SparkleIcon } from "lucide-react"
import Link from "next/link"
import { type HTMLAttributes, useEffect, useState } from "react"
import { Box } from "~/components/common/box"
import { Logo } from "~/components/common/logo"
import { SearchForm } from "~/components/web/search-form"
import { Button } from "~/components/web/ui/button"
import { Container } from "~/components/web/ui/container"
import { NavigationLink } from "~/components/web/ui/navigation-link"
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
      className={cx(
        "group/menu fixed z-40 top-[var(--header-top)] left-1/2 -translate-x-1/2",
        className,
      )}
      data-state={isNavOpen ? "open" : "close"}
      {...props}
    >
      <div
        className={cx(
          "[--offset:25px] [--cutoff:calc(100%-var(--offset))]",
          "absolute inset-x-0 top-[calc(var(--header-top)*-1)] -bottom-[var(--offset)] backdrop-blur-xl duration-300",
          "[mask-image:linear-gradient(to_bottom,black_0,black_var(--cutoff),transparent_var(--cutoff))]",
          isNavOpen && "max-md:-bottom-[calc(var(--offset)+var(--header-top))]",
        )}
      />

      <Box>
        <div
          className={cx(
            "flex flex-wrap items-center gap-3 py-2 px-4 -mx-2 h-[var(--header-height)] bg-background/50 rounded-xl isolate overflow-clip duration-300 md:-mx-4 md:gap-6",
            "max-md:group-data-[state=open]/menu:h-[calc(100dvh-(var(--header-top)*2))] max-md:group-data-[state=open]/menu:bg-background/75",
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
          </nav>

          <SearchForm className="md:-mx-2" />

          <Button size="md" variant="primary" suffix={<SparkleIcon />} className="-mr-1.5" asChild>
            <Link href="/submit">Submit</Link>
          </Button>

          <nav
            className={cx(
              "size-full mt-6 mb-4 grid grid-cols-2 place-content-start gap-x-4 gap-y-6 px-2 text-lg transition-opacity md:hidden",
              "group-data-[state=open]/menu:opacity-100 group-data-[state=close]/menu:opacity-0",
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
