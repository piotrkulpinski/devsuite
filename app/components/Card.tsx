import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef, isValidElement } from "react"

import { type VariantProps, cva, cx } from "~/utils/cva"

const cardVariants = cva({
  base: [
    "group/card fade-in flex flex-col gap-4 border rounded-lg p-6",
    "hover:[&[href]]:ring-[3px] hover:[&[href]]:ring-card-dark hover:[&[href]]:border-border-dark",
  ],
})

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    /**
     * If card to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, asChild, ...rest } = props
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return <Component ref={ref} className={cx(cardVariants({ className }))} {...rest} />
})

Card.displayName = "Card"
