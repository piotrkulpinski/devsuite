import { Slot } from "@radix-ui/react-slot"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"
import { VariantProps, cva, cx } from "~/utils/cva"
import { Heading } from "./Heading"

export const shortcutVariants = cva({
  base: "inline-flex whitespace-nowrap rounded border border-transparent px-[0.4em] py-[0.088em] text-xs/tight font-medium text-current opacity-40",

  variants: {
    variant: {
      soft: "bg-card",
      outline: "border-border",
    },
  },

  defaultVariants: {
    variant: "outline",
  },
})

export type ShortcutElement = ElementRef<typeof Heading>

export type ShortcutProps = ComponentPropsWithoutRef<typeof Heading> &
  VariantProps<typeof shortcutVariants>

export const Shortcut = forwardRef<ShortcutElement, ShortcutProps>((props, ref) => {
  const { className, variant, size = "h6", ...rest } = props

  return (
    <Slot className={cx(shortcutVariants({ variant, className }))} {...rest}>
      <Heading ref={ref} size={size} {...rest} />
    </Slot>
  )
})

Shortcut.displayName = "Shortcut"
