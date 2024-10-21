import { AtSignIcon, RssIcon } from "lucide-react"
import type { HTMLAttributes } from "react"
import { H6 } from "~/components/common/heading"
import { BrandGitHubIcon } from "~/components/common/icons/brand-github"
import { BrandXIcon } from "~/components/common/icons/brand-x"
import { Logo } from "~/components/common/logo"
import { Stack } from "~/components/common/stack"
import { NavigationLink } from "~/components/web/ui/navigation-link"
import { Tooltip, TooltipProvider } from "~/components/web/ui/tooltip"
import { config } from "~/config"
import { cx } from "~/utils/cva"
import { addUTMTracking } from "~/utils/helpers"

export const Footer = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <footer className={cx("flex flex-col gap-y-8", className)} {...props}>
      <div
        className={cx(
          "grid grid-cols-3 gap-y-8 gap-x-4 md:gap-x-6 md:grid-cols-[repeat(16,minmax(0,1fr))]",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col items-start gap-4 col-span-full md:col-span-6 md:gap-6">
          <Stack direction="column" className="text-sm/normal">
            <Logo />

            <p className="text-foreground/65 text-pretty max-w-60">{config.site.tagline}</p>
          </Stack>

          <Stack className="text-sm/normal">
            <TooltipProvider delayDuration={500} disableHoverableContent>
              <Tooltip tooltip="RSS Feed">
                <NavigationLink href="/rss.xml" target="_blank" rel="noreferrer">
                  <RssIcon className="size-[1.44em]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="Contact Us">
                <NavigationLink
                  href={`mailto:${config.site.email}`}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <AtSignIcon className="size-[1.44em]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="X/Twitter">
                <NavigationLink
                  href={config.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <BrandXIcon className="size-[1.44em]" />
                </NavigationLink>
              </Tooltip>

              <Tooltip tooltip="Source Code">
                <NavigationLink
                  href={config.links.github}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <BrandGitHubIcon className="size-[1.44em]" />
                </NavigationLink>
              </Tooltip>
            </TooltipProvider>
          </Stack>
        </div>

        <Stack className="gap-x-4 text-sm/normal flex-col items-start md:col-span-3 md:col-start-8">
          <H6 as="strong">Quick Links:</H6>

          <NavigationLink href="/about">About</NavigationLink>
          <NavigationLink href="/sponsor">Sponsor</NavigationLink>
          <NavigationLink href="/submit">Submit</NavigationLink>
          <NavigationLink href={`mailto:${config.site.email}`}>Contact</NavigationLink>
        </Stack>

        <Stack className="gap-x-4 text-sm/normal flex-col items-start md:col-span-3">
          <H6 as="strong">Browse:</H6>

          <NavigationLink href="/tools">Tools</NavigationLink>
          <NavigationLink href="/categories">Categories</NavigationLink>
          <NavigationLink href="/collections">Collections</NavigationLink>
          <NavigationLink href="/tags">Tags</NavigationLink>
        </Stack>

        <Stack className="gap-x-4 text-sm/normal flex-col items-start md:col-span-3">
          <H6 as="strong">Other Products:</H6>

          {config.links.family.map(link => (
            <NavigationLink
              key={link.href}
              href={addUTMTracking(link.href, { source: config.site.name.toLowerCase() })}
              target="_blank"
              rel="noopener noreferrer"
              title={link.description}
            >
              {link.title}
            </NavigationLink>
          ))}
        </Stack>
      </div>

      <div className="flex flex-row flex-wrap items-end justify-between gap-x-4 gap-y-2 w-full">
        <NavigationLink
          href={config.links.author}
          className="text-xs"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <img
            src="/_static/authors/piotrkulpinski.jpg"
            alt="Piotr Kulpinski"
            loading="lazy"
            width="16"
            height="16"
            decoding="async"
            className="max-sm:hidden size-4 rounded-full"
          />
          Made by Piotr Kulpinski
        </NavigationLink>

        <p className="text-xs text-foreground/50">This website may contain affiliate links</p>
      </div>

      {children}
    </footer>
  )
}
