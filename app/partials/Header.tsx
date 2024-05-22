import { NavLink } from "@remix-run/react"
import {
  BlocksIcon,
  BracesIcon,
  ChevronDownIcon,
  GemIcon,
  MenuIcon,
  SmilePlusIcon,
  SparkleIcon,
  TagIcon,
  XIcon,
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
    <div
      className={cx(
        "sticky top-0 z-10 w-full py-4 border-b border-b-border/50 backdrop-blur-sm bg-background/95",
        className
      )}
      {...props}
    >
      <Container className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6">
        <button type="button" onClick={() => setNavOpen(!isNavOpen)} className="lg:hidden">
          <MenuIcon className={cx("size-6 stroke-[1.5]", isNavOpen && "hidden")} />
          <XIcon className={cx("size-6 stroke-[1.5]", !isNavOpen && "hidden")} />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <Logo />

        <Series className="max-lg:hidden" asChild>
          <nav>
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
            <NavigationLink to="/admin">Admin</NavigationLink>
          </nav>
        </Series>

        <Series size="sm" className="ml-auto -my-1.5">
          <ClientOnly>{() => <ThemeSwitcher size="md" variant="secondary" />}</ClientOnly>

          <Button
            size="md"
            variant="fancy"
            suffix={<SparkleIcon />}
            className="max-sm:hidden"
            asChild
          >
            <NavLink to="/submit" unstable_viewTransition>
              Submit
            </NavLink>
          </Button>
        </Series>

        {isNavOpen && (
          <nav className="mt-2 flex flex-col gap-y-2 w-full lg:hidden">
            <NavigationLink to="/latest">Latest</NavigationLink>
            <NavigationLink to="/categories">Categories</NavigationLink>
            <NavigationLink to="/alternatives">Alternatives</NavigationLink>
            <NavigationLink to="/languages">Languages</NavigationLink>
            <NavigationLink to="/topics">Topics</NavigationLink>
            <NavigationLink to="/submit">Submit</NavigationLink>
            <NavigationLink to="/sponsor">Sponsor</NavigationLink>
            <NavigationLink to="/about">About</NavigationLink>
          </nav>
        )}
      </Container>
    </div>
  )
}
