import { cva } from "cva"
import Link from "next/link"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const navigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 p-0.5 -m-0.5 text-sm cursor-pointer",
    "text-foreground/50 disabled:opacity-50 hover:text-foreground",
  ],
  variants: {
    isActive: {
      true: "text-foreground",
    },
  },
})

export const NavigationLink = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cx(navigationLinkVariants({ isActive: false, className }))}
      {...props}
    />
  )
})

NavigationLink.displayName = "NavigationLink"
