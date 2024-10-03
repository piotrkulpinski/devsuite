import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react"
import { Box } from "~/components/ui/box"
import { cx } from "~/utils/cva"

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <Box focusWithin>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cx(
        "peer size-4 shrink-0 rounded-sm disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=checked]:text-background",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </Box>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
