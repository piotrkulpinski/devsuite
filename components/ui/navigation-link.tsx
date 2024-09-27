"use client"

import { cva } from "cva"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  type AnchorHTMLAttributes,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"
import { cx } from "~/utils/cva"

export const navigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 p-0.5 -m-0.5 text-sm cursor-pointer",
    "text-foreground/65 disabled:opacity-50 hover:text-foreground",
  ],
  variants: {
    isActive: {
      true: "text-foreground",
    },
  },
})

const isItemActive = (href: string | undefined, pathname: string) => {
  if (href && href !== "/") {
    return pathname.includes(href)
  }

  return false
}

export const NavigationLink = forwardRef<
  ElementRef<typeof Link>,
  AnchorHTMLAttributes<HTMLAnchorElement> & ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = isItemActive(props.href, pathname)
  const Comp = props.href.startsWith("http") ? "a" : Link

  return (
    <Comp ref={ref} className={cx(navigationLinkVariants({ isActive, className }))} {...props} />
  )
})

NavigationLink.displayName = "NavigationLink"
