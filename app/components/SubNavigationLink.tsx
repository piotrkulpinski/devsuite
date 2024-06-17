import { NavLink, type NavLinkProps } from "@remix-run/react"
import { cva } from "cva"
import { type ElementRef, forwardRef } from "react"
import { cx } from "~/utils/cva"

export const subNavigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 p-9.5 -m-0.5 text-sm -tracking-micro cursor-pointer",
    "text-foreground/70 disabled:opacity-50 hover:bg-card hover:text-foreground",
  ],
  variants: {
    isActive: {
      true: "font-medium text-foreground",
    },
  },
})

export const SubNavigationLink = forwardRef<ElementRef<typeof NavLink>, NavLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <NavLink
        ref={ref}
        className={({ isActive }) => cx(subNavigationLinkVariants({ isActive, className }))}
        unstable_viewTransition
        {...props}
      />
    )
  }
)

SubNavigationLink.displayName = "SubNavigationLink"
