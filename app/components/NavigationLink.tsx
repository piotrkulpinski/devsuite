import { NavLink, type NavLinkProps } from "@remix-run/react"
import { cva } from "cva"
import { type ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const navigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 font-medium rounded-full -tracking-micro cursor-pointer opacity-80",
    "disabled:opacity-50 hover:opacity-100",
  ],
  variants: {
    isActive: {
      true: "text-foreground",
    },
  },
})

export const NavigationLink = forwardRef<ElementRef<typeof NavLink>, NavLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <NavLink
        ref={ref}
        className={({ isActive }) => cx(navigationLinkVariants({ isActive, className }))}
        unstable_viewTransition
        {...props}
      />
    )
  }
)

NavigationLink.displayName = "NavigationLink"
