import type { HTMLAttributes } from "react"
import { type VariantProps, cva, cx } from "~/utils/cva"

const gradientBlurVariants = cva({
  base: "fixed inset-x-0 z-20 h-32 pointer-events-none md:h-40",

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
          const blur = 0.078125 * 2 ** i
          const step = 100 / steps

          return (
            <div
              key={i}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: i + 1,
                WebkitBackdropFilter: `blur(${blur}px)`,
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
