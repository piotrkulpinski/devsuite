import { cva } from "cva"
import Link from "next/link"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const navigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 font-medium rounded-full -tracking-micro cursor-pointer text-foreground/60",
    "disabled:opacity-50 hover:text-foreground",
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
