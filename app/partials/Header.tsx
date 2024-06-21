import { Link } from "@remix-run/react"
import {
  BlocksIcon,
  BracesIcon,
  ChevronDownIcon,
  GemIcon,
  SmilePlusIcon,
  SparkleIcon,
  TagIcon,
} from "lucide-react"
import { type HTMLAttributes, useEffect, useState } from "react"
import { ClientOnly } from "remix-utils/client-only"
import { cx } from "~/utils/cva"
import { Button } from "~/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/DropdownMenu"
import { NavigationLink, navigationLinkVariants } from "~/components/NavigationLink"
import { Series } from "~/components/Series"
import { ThemeSwitcher } from "~/components/ThemeSwitcher"
import { Container } from "~/components/Container"
import { Logo } from "~/components/Logo"
import { Box } from "~/components/Box"

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
            "group/menu flex flex-wrap items-center gap-3 py-3.5 px-4 -mx-2 h-[var(--header-height)] bg-background/25 backdrop-blur-xl rounded-3xl isolate overflow-clip duration-300 md:-mx-4 md:gap-4 lg:gap-6",
            "max-lg:data-[state=open]:h-[calc(100dvh-(var(--header-top)*2))] max-lg:data-[state=open]:bg-background/75"
          )}
        >
          <button
            type="button"
            onClick={() => setNavOpen(!isNavOpen)}
            className="block -m-1 lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              className="size-7 duration-300 select-none will-change-transform group-data-[state=open]/menu:rotate-45"
              viewBox="0 0 100 100"
              role="img"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                pathLength="100"
                transform="rotate(-90 50 50)"
                className="sm:hidden fill-none duration-300 stroke-[5] stroke-current group-data-[state=open]/menu:[stroke-linecap:round] [stroke-dasharray:0_100] group-data-[state=open]/menu:[stroke-dasharray:100_100]"
              />
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

          <Logo />

          <nav className="flex flex-wrap items-center gap-3 text-sm md:gap-4 max-lg:hidden">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className={cx(navigationLinkVariants({ className: "gap-1" }))}>
                Browse{" "}
                <ChevronDownIcon className="group-data-[state=open]:-rotate-180 duration-200" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <NavigationLink to="/latest">
                    <GemIcon className="size-4 opacity-75" /> Latest
                  </NavigationLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavigationLink to="/categories">
                    <BlocksIcon className="size-4 opacity-75" /> Categories
                  </NavigationLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavigationLink to="/alternatives">
                    <SmilePlusIcon className="size-4 opacity-75" /> Alternatives
                  </NavigationLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavigationLink to="/languages">
                    <BracesIcon className="size-4 opacity-75" /> Languages
                  </NavigationLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavigationLink to="/topics">
                    <TagIcon className="size-4 opacity-75" /> Topics
                  </NavigationLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavigationLink to="/about">About</NavigationLink>
            <NavigationLink to="/sponsor">Sponsor</NavigationLink>
          </nav>

          <Series size="sm" className="ml-auto -my-1.5 -mr-1.5">
            <ClientOnly>{() => <ThemeSwitcher size="md" variant="secondary" />}</ClientOnly>

            <Button size="md" variant="fancy" suffix={<SparkleIcon />} asChild>
              <Link to="/submit" unstable_viewTransition>
                Submit
              </Link>
            </Button>
          </Series>

          <nav
            className={cx(
              "size-full mt-6 mb-4 grid grid-cols-2 place-content-start gap-x-4 gap-y-6 transition-opacity lg:hidden",
              isNavOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <NavigationLink to="/latest">Latest</NavigationLink>
            <NavigationLink to="/categories">Categories</NavigationLink>
            <NavigationLink to="/alternatives">Alternatives</NavigationLink>
            <NavigationLink to="/languages">Languages</NavigationLink>
            <NavigationLink to="/topics">Topics</NavigationLink>
            <NavigationLink to="/submit">Submit</NavigationLink>
            <NavigationLink to="/sponsor">Sponsor</NavigationLink>
            <NavigationLink to="/about">About</NavigationLink>
          </nav>
        </div>
      </Box>
    </Container>
  )
}
