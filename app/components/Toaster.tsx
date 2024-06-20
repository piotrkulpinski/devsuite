import type { ComponentPropsWithoutRef } from "react"
import { Toaster as Sonner } from "sonner"
import { cx } from "~/utils/cva"

export const Toaster = (props: ComponentPropsWithoutRef<typeof Sonner>) => {
  return (
    <Sonner
      gap={10}
      offset="15px"
      className="!z-[60] !w-64"
      richColors
      toastOptions={{
        classNames: {
          toast: cx(
            "!rounded w-full !border !border-foreground/15 !bg-background/10 backdrop-blur-sm !py-2.5 !shadow-sm",
            "data-[type=error]:!text-red data-[type=success]:!text-green"
          ),
        },
      }}
      {...props}
    />
  )
}
