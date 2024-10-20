import type { HTMLAttributes } from "react"
import { Heading, type HeadingProps } from "~/components/common/heading"
import { Prose } from "~/components/common/prose"
import { type VariantProps, cva, cx } from "~/utils/cva"

const introVariants = cva({
  base: "flex flex-col gap-y-4 w-full max-w-md sm:max-w-xl md:max-w-3xl",

  variants: {
    alignment: {
      start: "items-start text-start mr-auto",
      center: "items-center text-center mx-auto",
      end: "items-end text-end ml-auto",
    },
  },

  defaultVariants: {
    alignment: "start",
  },
})

type IntroProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof introVariants> & {
    headingProps?: HeadingProps
  }

const Intro = ({ className, alignment, ...props }: IntroProps) => {
  return <div className={cx(introVariants({ alignment, className }))} {...props} />
}

const IntroTitle = ({ size = "h1", ...props }: HTMLAttributes<HTMLElement> & HeadingProps) => {
  return <Heading size={size} {...props} />
}

const IntroDescription = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Prose className={cx("w-full max-w-2xl", className)} {...props}>
      <h2 className="!text-base !font-normal !tracking-normal !text-foreground/65 md:!text-lg">
        {children}
      </h2>
    </Prose>
  )
}

export { Intro, IntroTitle, IntroDescription }
