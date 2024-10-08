"use client"

import { Slot } from "@radix-ui/react-slot"
import { motion } from "framer-motion"
import { CheckIcon, XIcon } from "lucide-react"
import MotionNumber from "motion-number"
import { useParams, useRouter } from "next/navigation"
import { type HTMLAttributes, type ReactNode, forwardRef, isValidElement, useState } from "react"
import { createStripeCheckout } from "~/actions/stripe"
import { PlanIntervalSwitch } from "~/components/plan-interval-switch"
import { Badge } from "~/components/ui/badge"
import { Button, type ButtonProps } from "~/components/ui/button"
import { Card, CardStars, type cardVariants } from "~/components/ui/card"
import { H5 } from "~/components/ui/heading"
import { Prose } from "~/components/ui/prose"
import { Stack } from "~/components/ui/stack"
import { type VariantProps, cva, cx } from "~/utils/cva"

const planVariants = cva({
  base: "gap-8 p-4 basis-72 grow max-w-96 md:p-6",
})

const planFeatureVariants = cva({
  base: "flex gap-3 text-sm",
})

const planFeatureCheckVariants = cva({
  base: "shrink-0 size-5 stroke-[3px] p-1 text-white rounded-md",

  variants: {
    type: {
      positive: "bg-green-500/50",
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
     * The props of the button.
     */
    buttonProps?: ButtonProps

    /**
     * The prices of the plan. If empty, the plan is free.
     */
    prices: { interval?: ProductInterval; price: number; priceId: string }[]

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

const intervals = [
  { label: "Monthly", value: "month" },
  { label: "Yearly", value: "year" },
]

export type ProductInterval = (typeof intervals)[number]["value"]

export const Plan = forwardRef<PlanElement, PlanProps>((props, ref) => {
  const {
    children,
    className,
    asChild,
    buttonProps,
    prices,
    name,
    description,
    features,
    isFeatured,
    ...rest
  } = props

  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const [interval, setInterval] = useState<ProductInterval>("month")
  const [isPending, setIsPending] = useState(false)

  const useAsChild = asChild && isValidElement(children)
  const Component = useAsChild ? Slot : "div"

  const getPriceForInterval = (interval: ProductInterval | undefined) => {
    if (prices.length === 0) {
      return { price: 0, priceId: undefined, interval: undefined }
    }
    const selectedPrice = prices.find(p => p.interval === interval)
    return selectedPrice ?? prices[0]
  }

  const isSubscription = prices.length > 0 && prices.some(p => p.interval)
  const currentPrice = getPriceForInterval(isSubscription ? interval : undefined)
  const monthlyPrice = isSubscription ? getPriceForInterval("month") : currentPrice

  const priceValue = isSubscription
    ? currentPrice.price / (interval === "month" ? 100 : 1200)
    : currentPrice.price / 100

  const monthlyPriceValue = monthlyPrice.price / 100

  const originalPrice = isSubscription && interval === "year" ? monthlyPriceValue : null
  const discount =
    isSubscription && interval === "year"
      ? Math.round((1 - priceValue / monthlyPriceValue) * 100)
      : null

  const onSubmit = async () => {
    const priceId = currentPrice.priceId

    if (!priceId) {
      return router.push("/submit/thanks")
    }

    setIsPending(true)

    try {
      await createStripeCheckout(priceId, slug, isSubscription ? "subscription" : "payment")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card hover={false} isRevealed={false} isFeatured={isFeatured} asChild>
      <Component ref={ref} className={cx(planVariants({ className }))} {...rest}>
        {isFeatured && <CardStars className="brightness-200" />}

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <H5>{name}</H5>

            {isSubscription && prices.length > 1 && (
              <PlanIntervalSwitch intervals={intervals} value={interval} onChange={setInterval} />
            )}
          </div>

          {description && (
            <Prose className="text-foreground/50 text-sm text-pretty">{description}</Prose>
          )}
        </div>

        <div className="relative flex items-end w-full">
          <span className="self-start mt-1 mr-1 text-xl/none font-display">$</span>

          <strong className="relative font-display font-semibold -tracking-wide text-4xl/[0.9] sm:text-5xl/[0.9]">
            <MotionNumber
              value={priceValue}
              format={{ notation: "compact" }}
              locales="en-US"
              className="!flex items-center h-[0.9em] tabular-nums"
            />

            {!!originalPrice && (
              <motion.del
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.5, y: 0 }}
                className="absolute ml-1 left-full -top-3 text-[0.4em] font-normal align-top decoration-from-font"
              >
                <MotionNumber
                  value={Math.round(originalPrice)}
                  format={{ notation: "compact" }}
                  locales="en-US"
                  className="!flex items-center h-[0.9em] tabular-nums"
                />
              </motion.del>
            )}
          </strong>

          {priceValue > 0 && (
            <div className="m-0.5 opacity-50 text-base/none md:text-lg/none">
              /{isSubscription ? "month" : "one-time"}
            </div>
          )}

          {discount && (
            <Badge variant="success" className="absolute -top-3.5 right-0" asChild>
              <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                {discount}% off
              </motion.span>
            </Badge>
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

        <Button
          type="button"
          onClick={onSubmit}
          className="mt-auto w-full"
          isPending={isPending}
          {...buttonProps}
        />
      </Component>
    </Card>
  )
})

Plan.displayName = "Plan"
