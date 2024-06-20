import { Slot } from "@radix-ui/react-slot"
import { ComponentProps, ElementRef, HTMLAttributes, forwardRef, isValidElement } from "react"
import { VariantProps, cva, cx } from "~/utils/cva"
import { Box } from "./Box"

const dockItemVariants = cva({
  base: [
    "relative p-1.5 rounded transition-all duration-200 ease-[cubic-bezier(0.5,1.5,0.5,1)]",
    "hover:pb-2.5 hover:-mt-1 hover:z-10",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],

  variants: {
    isActive: {
      true: "after:absolute after:mt-1 after:left-1/2 after:-translate-x-1/2 after:pointer-events-none after:bg-current after:w-2.5 after:h-px after:rounded-full",
      false: "text-foreground/70",
    },
  },

  defaultVariants: {
    isActive: false,
  },
})

type DockItemProps = ComponentProps<"div"> &
  VariantProps<typeof dockItemVariants> & {
    /**
     * If series to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean
  }

const DockItem = forwardRef<ElementRef<"div">, DockItemProps>((props, ref) => {
  const { className, asChild, isActive, ...rest } = props
  const useAsChild = asChild && isValidElement(props.children)
  const Component = useAsChild ? Slot : "div"

  return <Component ref={ref} className={cx(dockItemVariants({ isActive, className }))} {...rest} />
})
DockItem.displayName = "Dock.Item"

const DockSeparator = forwardRef<ElementRef<"div">, ComponentProps<"div">>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div
      ref={ref}
      className={cx("w-[1px] h-4 -my-2 mx-1.5 bg-foreground/15", className)}
      {...rest}
    />
  )
})
DockSeparator.displayName = "Dock.Separator"

export const Dock = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Box>
      <div
        className={cx(
          "flex items-center bg-background/25 backdrop-blur-xl rounded-full py-1.5 px-2 isolate",
          className
        )}
        {...props}
      />
    </Box>
  )
}

Dock.Item = DockItem
Dock.Separator = DockSeparator
