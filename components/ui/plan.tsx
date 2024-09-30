import { Slot } from "@radix-ui/react-slot"
import { CheckIcon, CoinsIcon, XIcon } from "lucide-react"
import { type HTMLAttributes, type ReactNode, forwardRef, isValidElement } from "react"
import { Badge } from "~/components/ui/badge"
import { Card, CardStars, type cardVariants } from "~/components/ui/card"
import { H4 } from "~/components/ui/heading"
import { Prose } from "~/components/ui/prose"
import { Stack } from "~/components/ui/stack"
import { type VariantProps, cva, cx } from "~/utils/cva"

export const planVariants = cva({
  base: "gap-8 p-4 min-w-64 md:p-6",
})

export const planFeatureVariants = cva({
  base: "flex gap-3 text-sm",
})

export const planFeatureCheckVariants = cva({
  base: "shrink-0 size-5 stroke-[3px] p-1 text-white rounded-md",

  variants: {
    type: {
      positive: "bg-green-500/60",
      neutral: "bg-foreground/10",
      negative: "bg-foreground/10",
    },
  },
})

export type PlanElement = HTMLDivElement

export type PlanProps = Omit<HTMLAttributes<PlanElement>, "size"> &
  VariantProps<typeof cardVariants> &
  VariantProps<typeof planVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean

    /**
     * The price of the plan.
     */
    price: number

    /**
     * The name of the plan.
     */
    name: string

    /**
     * The description of the plan.
     */
    description?: string

    /**
     * The amount of discount applied to the plan.
     */
    discount?: number

    /**
     * If set to `true`, the plan will be rendered as a subscription.
     */
    isSubscription?: boolean

    /**
     * The features of the plan.
     */
    features?: {
      /**
       * The text of the feature.
       */
      text: string

      /**
       * The footnote of the feature.
       */
      footnote?: ReactNode | string

      /**
       * The type of the feature.
       */
      type?: "positive" | "neutral" | "negative"
    }[]
  }

export const Plan = forwardRef<PlanElement, PlanProps>((props, ref) => {
  const {
    children,
    className,
    asChild,
    price,
    name,
    description,
    discount,
    features,
    isSubscription,
    isFeatured,
    ...rest
  } = props

  const useAsChild = asChild && isValidElement(children)
  const Component = useAsChild ? Slot : "div"

  const originalPrice = discount ? price : null
  const finalPrice = discount ? (price * (100 - discount)) / 100 : price

  return (
    <Card hover={false} isRevealed={false} isFeatured={isFeatured} asChild>
      <Component ref={ref} className={cx(planVariants({ className }))} {...rest}>
        {isFeatured && (
          <Badge
            variant="outline"
            className="absolute top-0 right-6 z-10 -translate-y-1/2 -mr-0.5 bg-background"
            prefix={<CoinsIcon className="text-yellow-500" />}
          >
            Best Value
          </Badge>
        )}

        {isFeatured && <CardStars className="brightness-150" />}

        <div className="space-y-3">
          <H4>{name}</H4>

          {description && (
            <Prose className="text-foreground/50 text-sm text-pretty">{description}</Prose>
          )}
        </div>

        <div className="flex items-end gap-1">
          <span className="text-xl/none opacity-30">$</span>

          <strong className="font-semibold text-4xl/[0.85] sm:text-5xl/[0.85]">
            {Math.round(finalPrice / 100)}

            {originalPrice && (
              <span className="absolute ml-1 -mt-3 text-[0.5em] font-normal align-top text-foreground/65 line-through decoration-from-font">
                {Math.round(originalPrice / 100)}
              </span>
            )}
          </strong>

          {finalPrice > 0 && (
            <span className="text-sm text-foreground/50">
              /{isSubscription ? "month" : "one-time"}
            </span>
          )}
        </div>

        {!!features?.length && (
          <Stack direction="column" className="mb-auto">
            {features.map(({ type, text }) => (
              <div key={text} className={cx(planFeatureVariants())}>
                <Slot className={cx(planFeatureCheckVariants({ type }))}>
                  {type === "negative" ? <XIcon /> : <CheckIcon />}
                </Slot>

                <span className={cx(type === "negative" && "text-foreground/50")}>{text}</span>
              </div>
            ))}
          </Stack>
        )}

        {children}
      </Component>
    </Card>
  )
})

Plan.displayName = "Plan"
