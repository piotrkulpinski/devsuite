import { NavLink, type NavLinkProps } from "@remix-run/react"
import { cva } from "cva"
import { type ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const navigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 py-1 px-3 -my-1 -mx-1.5 text-sm font-medium rounded-full -tracking-micro cursor-pointer",
    "disabled:opacity-50 hover:bg-card-dark hover:text-foreground",
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
