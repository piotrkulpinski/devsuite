import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { HTMLAttributes, ReactNode } from "react"
import { VariantProps, cva, cx } from "~/utils/cva"

const dockItemVariants = cva({
  base: "relative",

  variants: {
    isActive: {
      true: "-translate-y-1 after:absolute after:mt-1 after:left-1/2 after:-translate-x-1/2 after:bg-current after:size-[3px] after:rounded-full",
      false: "text-secondary",
    },
  },

  defaultVariants: {
    isActive: false,
  },
})

type DockItemProps = HTMLMotionProps<"div"> &
  VariantProps<typeof dockItemVariants> & {
    /**
     * If series to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

const DockItem = ({ children, className, isActive, ...props }: DockItemProps) => {
  return (
    <motion.div
      className={cx(dockItemVariants({ isActive, className }))}
      style={{
        paddingBottom: 0,
        marginTop: 0,
      }}
      whileHover={{
        paddingBottom: 5,
        marginTop: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children as ReactNode}

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="after:absolute after:mt-1 after:left-1/2 after:-translate-x-1/2 after:bg-current after:size-[3px] after:rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const DockSeparator = () => {
  return <div className="w-[1px] h-4 -my-2 bg-border" />
}

export const Dock = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-3 bg-background border rounded-full py-3 px-4",
        className
      )}
      {...props}
    />
  )
}

Dock.Item = DockItem
Dock.Separator = DockSeparator
