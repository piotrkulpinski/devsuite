import { HTMLAttributes } from "react"
import { VariantProps, cva, cx } from "~/utils/cva"

const gradientBlurVariants = cva({
  base: "fixed inset-x-0 z-20 h-40 pointer-events-none",

  variants: {
    position: {
      top: "top-0",
      bottom: "bottom-0 scale-y-flip",
    },
  },
})

export type GradientBlurProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof gradientBlurVariants> & {
    /**
     * Number of steps to blur
     * @default 8
     */
    steps?: number
  }

export const GradientBlur = ({ className, position, steps = 8, ...props }: GradientBlurProps) => {
  return (
    <div className={cx(gradientBlurVariants({ position, className }))} {...props}>
      <div className="relative size-full">
        {Array.from({ length: steps }).map((_, i) => {
          const blur = 0.078125 * Math.pow(2, i)
          const step = 100 / steps

          return (
            <div
              key={i}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: i + 1,
                backdropFilter: `blur(${blur}px)`,
                maskImage: `linear-gradient(to top, rgba(0, 0, 0, 0) ${i * step}%, rgba(0, 0, 0, 1) ${(i + 1) * step}%, rgba(0, 0, 0, 1) ${(i + 2) * step}%, rgba(0, 0, 0, 0) ${(i + 3) * step}%)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
