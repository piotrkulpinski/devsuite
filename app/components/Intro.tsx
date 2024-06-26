import type { HTMLAttributes, ReactNode } from "react"
import { VariantProps, cva, cx } from "~/utils/cva"
import { Heading, type HeadingProps } from "./Heading"
import { Prose } from "./Prose"

const introVariants = cva({
  base: "flex w-full flex-col gap-y-4 w-[85%] mx-auto",

  variants: {
    alignment: {
      start: "items-start text-start",
      center: "items-center text-center",
      end: "items-end text-end",
    },
  },

  defaultVariants: {
    alignment: "start",
  },
})

type IntroProps = Omit<HTMLAttributes<HTMLElement>, "title" | "prefix"> &
  VariantProps<typeof introVariants> & {
    title: ReactNode
    description?: ReactNode
    headingProps?: HeadingProps
  }

export const Intro = ({
  children,
  className,
  alignment,
  title,
  description,
  headingProps = { size: "h1" },
  ...props
}: IntroProps) => {
  return (
    <div className={cx(introVariants({ alignment, className }))} {...props}>
      {title && (
        <Heading {...headingProps} className="relative flex-1">
          {title}

          <div className="absolute -bottom-2 inset-x-0 h-8 bg-gradient-to-t from-background/40 to-transparent pointer-events-none select-none" />
        </Heading>
      )}

      {description && (
        <Prose className="max-w-3xl">
          <h2 className="text-base !font-normal !tracking-normal !text-foreground/70 md:text-lg">
            {description}
          </h2>
        </Prose>
      )}

      {children}
    </div>
  )
}
