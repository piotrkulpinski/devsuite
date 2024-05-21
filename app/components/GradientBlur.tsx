import { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"

export type GradientBlurProps = HTMLAttributes<HTMLElement> & {
  /**
   * Number of steps to blur
   * @default 8
   */
  steps?: number
}

export const GradientBlur = ({ className, steps = 8, ...props }: GradientBlurProps) => {
  return (
    <div
      className={cx("fixed bottom-0 left-0 right-0 pointer-events-none z-10", className)}
      {...props}
    >
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
                maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${i * step}%, rgba(0, 0, 0, 1) ${(i + 1) * step}%, rgba(0, 0, 0, 1) ${(i + 2) * step}%, rgba(0, 0, 0, 0) ${(i + 3) * step}%)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
