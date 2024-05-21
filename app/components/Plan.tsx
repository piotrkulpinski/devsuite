import { Slot } from "@radix-ui/react-slot"
import { HTMLAttributes, ReactNode, forwardRef, isValidElement } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"
import { CheckIcon, XIcon } from "lucide-react"
import { H3 } from "./Heading"
import { Prose } from "./Prose"
import { Series } from "./Series"
import { Card, cardVariants } from "./Card"

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
      positive: "bg-green-500",
      neutral: "bg-border-dark",
      negative: "bg-border-dark",
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
    isFeatured,
    ...rest
  } = props

  const useAsChild = asChild && isValidElement(children)
  const Component = useAsChild ? Slot : "div"

  const originalPrice = discount ? price : null
  const finalPrice = discount ? (price * (100 - discount)) / 100 : price

  return (
    <Card isRevealed={false} isFeatured={isFeatured} asChild>
      <Component ref={ref} className={cx(planVariants({ className }))} {...rest}>
        {isFeatured && (
          <img
            src="/3d-coin.png"
            alt=""
            className="size-56 absolute -top-12 -right-12 -z-10 select-none pointer-events-none opacity-10"
          />
        )}

        <div className="space-y-3">
          <H3>{name}</H3>

          {description && <Prose className="text-muted text-sm text-pretty">{description}</Prose>}
        </div>

        <div className="flex items-end gap-1">
          <span className="text-xl/none opacity-30">$</span>

          <strong className="text-4xl/[0.85] sm:text-5xl/[0.85]">
            {Math.round(finalPrice / 100)}

            {originalPrice && (
              <span className="absolute ml-1 -mt-3 text-[0.5em] font-normal align-top text-secondary line-through decoration-from-font">
                {Math.round(originalPrice / 100)}
              </span>
            )}
          </strong>
        </div>

        {!!features?.length && (
          <Series direction="column" className="mb-auto">
            {features.map(({ type, text }) => (
              <div key={text} className={cx(planFeatureVariants())}>
                <Slot className={cx(planFeatureCheckVariants({ type }))}>
                  {type === "negative" ? <XIcon /> : <CheckIcon />}
                </Slot>

                <span className={cx(type === "negative" && "text-muted")}>{text}</span>
              </div>
            ))}
          </Series>
        )}

        {children}
      </Component>
    </Card>
  )
})

Plan.displayName = "Plan"
