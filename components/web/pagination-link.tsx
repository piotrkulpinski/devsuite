import { Slot } from "@radix-ui/react-slot"
import Link, { type LinkProps } from "next/link"

import type { HTMLAttributes, ReactNode } from "react"
import { navigationLinkVariants } from "~/components/web/ui/navigation-link"
import { type VariantProps, cx } from "~/utils/cva"

type PaginationLinkProps = Omit<HTMLAttributes<HTMLElement> & LinkProps, "prefix"> &
  VariantProps<typeof navigationLinkVariants> & {
    prefix?: ReactNode
    suffix?: ReactNode
    isDisabled?: boolean
  }

export const PaginationLink = ({
  children,
  className,
  prefix,
  suffix,
  isActive,
  isDisabled,
  ...props
}: PaginationLinkProps) => {
  return (
    <Link
      className={cx(
        isDisabled && "pointer-events-none opacity-40",
        isActive && "bg-foreground/10 rounded-sm",
        navigationLinkVariants({
          isActive,
          className,
        }),
      )}
      {...props}
    >
      <Slot className="size-5 duration-150 group-hover:-translate-x-0.5">{prefix}</Slot>

      {children}

      <Slot className="size-5 duration-150 group-hover:translate-x-0.5">{suffix}</Slot>
    </Link>
  )
}
