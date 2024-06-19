import { NavLink } from "@remix-run/react"
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
          className={cx(
            "flex flex-wrap items-center gap-3 py-3.5 px-4 -mx-2 bg-background/25 backdrop-blur-xl rounded-3xl isolate overflow-clip transition-all md:-mx-4 md:gap-4 lg:gap-6",
            isNavOpen ? "h-[calc(100dvh-(var(--header-top)*2))]" : "h-[var(--header-height)]"
          )}
        >
          <button
            type="button"
            onClick={() => setNavOpen(!isNavOpen)}
            className="size-4 lg:hidden"
            aria-label="Toggle navigation"
          >
            <div
              className={cx(
                "absolute h-px w-3.5 bg-current transition-all",
                isNavOpen ? "rotate-45" : "-translate-y-[3.5px]"
              )}
            />
            <div
              className={cx(
                "absolute h-px w-3.5 bg-current transition-all",
                isNavOpen ? "-rotate-45" : "translate-y-[3.5px]"
              )}
            />
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
              <NavLink to="/submit" unstable_viewTransition>
                Submit
              </NavLink>
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
