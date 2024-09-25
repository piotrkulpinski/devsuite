import { cva } from "cva"
import Link from "next/link"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const subNavigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 p-0.5 -m-0.5 text-sm -tracking-micro cursor-pointer duration-100",
    "text-foreground/70 disabled:opacity-50 hover:bg-foreground/10 hover:text-foreground",
  ],
  variants: {
    isActive: {
      true: "font-medium text-foreground",
    },
  },
})

export const SubNavigationLink = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cx(subNavigationLinkVariants({ isActive: false, className }))}
      {...props}
    />
  )
})

SubNavigationLink.displayName = "SubNavigationLink"
