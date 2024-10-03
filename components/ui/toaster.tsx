"use client"

import { usePathname } from "next/navigation"
import type { ComponentPropsWithoutRef } from "react"
import { Toaster as Sonner } from "sonner"
import { cx } from "~/utils/cva"

export const Toaster = (props: ComponentPropsWithoutRef<typeof Sonner>) => {
  const pathname = usePathname()

  return (
    <Sonner
      key={pathname}
      position="top-center"
      gap={8}
      offset="80px"
      className="!z-50 flex flex-col gap-2 items-center"
      richColors
      toastOptions={{
        classNames: {
          toast: cx(
            "justify-center !rounded !border !border-foreground/15 !bg-background/50 backdrop-blur-xl !py-2.5 !shadow-sm sm:w-auto",
            "data-[type=error]:!text-red-500/75 data-[type=success]:!text-green-500/75",
          ),
        },
      }}
      {...props}
    />
  )
}
