"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "~/components/admin/ui/badge"
import { Button } from "~/components/admin/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/admin/ui/tooltip"
import { cx } from "~/utils/cva"

interface NavProps extends ComponentProps<"nav"> {
  isCollapsed: boolean
  links: {
    title: string
    href: string
    label?: string
    icon: ReactNode
  }[]
}

export function Nav({ className, links, isCollapsed, ...props }: NavProps) {
  const pathname = usePathname()
  const rootPath = "/admin"

  const getButtonVariant = (href: string) => {
    if (
      (href === rootPath && href === pathname) ||
      (href !== rootPath && pathname.startsWith(href))
    ) {
      return "secondary"
    }

    return "ghost"
  }

  return (
    <nav
      className={cx(
        "flex flex-col gap-1 p-3 group-data-[collapsed=true]/collapsible:justify-center group-data-[collapsed=true]/collapsible:px-2",
        className,
      )}
      {...props}
    >
      {links.map(({ href, title, icon, label }, index) =>
        isCollapsed ? (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={getButtonVariant(href)}
                prefix={icon}
                aria-label={title}
                asChild
              >
                <Link href={href} />
              </Button>
            </TooltipTrigger>

            <TooltipContent side="right" className="flex items-center gap-4">
              {title}
              {label && <span className="opacity-60">{label}</span>}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            key={index}
            variant={getButtonVariant(href)}
            prefix={icon}
            suffix={
              label && (
                <Badge variant="outline" className="ml-auto px-1.5 size-auto">
                  {label}
                </Badge>
              )
            }
            className="justify-start"
            asChild
          >
            <Link href={href}>{title}</Link>
          </Button>
        ),
      )}
    </nav>
  )
}
