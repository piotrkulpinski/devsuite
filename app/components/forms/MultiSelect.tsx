import { Badge } from "~/components/Badge"
import { Command, CommandItem, CommandEmpty, CommandList } from "~/components/Command"
import { Command as CommandPrimitive } from "cmdk"
import { X as RemoveIcon, Check } from "lucide-react"
import {
  ComponentPropsWithoutRef,
  Dispatch,
  ElementRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEventHandler,
  SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react"
import { cx } from "~/utils/cva"
import { Box } from "../Box"

type MultiSelectProps = ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  values: string[]
  onValuesChange: (value: string[]) => void
  loop?: boolean
}

interface MultiSelectContextProps {
  value: string[]
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (value: boolean) => void
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null)

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext)
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider")
  }
  return context
}

const MultiSelect = ({
  values: value,
  onValuesChange: onValueChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}: MultiSelectProps) => {
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const onValueChangeHandler = useCallback(
    (val: string) => {
      if (value.includes(val)) {
        onValueChange(value.filter((item) => item !== val))
      } else {
        onValueChange([...value, val])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onValueChange, value]
  )

  // TODO : change from else if use to switch case statement

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const moveNext = () => {
        const nextIndex = activeIndex + 1
        setActiveIndex(nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex)
      }

      const movePrev = () => {
        const prevIndex = activeIndex - 1
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex)
      }

      if ((e.key === "Backspace" || e.key === "Delete") && value.length > 0) {
        if (inputValue.length === 0) {
          if (activeIndex !== -1 && activeIndex < value.length) {
            onValueChange(value.filter((item) => item !== value[activeIndex]))
            const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1
            setActiveIndex(newIndex)
          } else {
            onValueChange(value.filter((item) => item !== value[value.length - 1]))
          }
        }
      } else if (e.key === "Enter") {
        setOpen(true)
      } else if (e.key === "Escape") {
        if (activeIndex !== -1) {
          setActiveIndex(-1)
        } else {
          setOpen(false)
        }
      } else if (dir === "rtl") {
        if (e.key === "ArrowRight") {
          movePrev()
        } else if (e.key === "ArrowLeft" && (activeIndex !== -1 || loop)) {
          moveNext()
        }
      } else {
        if (e.key === "ArrowLeft") {
          movePrev()
        } else if (e.key === "ArrowRight" && (activeIndex !== -1 || loop)) {
          moveNext()
        }
      }
    },
    [value, dir, activeIndex, loop, inputValue.length, onValueChange]
  )

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        onKeyDown={handleKeyDown}
        className={cx("overflow-visible bg-transparent flex flex-col space-y-2", className)}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  )
}

const MultiSelectTrigger = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { value, onValueChange, activeIndex } = useMultiSelect()

    const mousePreventDefault: MouseEventHandler = useCallback((e) => {
      e.preventDefault()
      e.stopPropagation()
    }, [])

    return (
      <Box focusWithin>
        <div
          ref={ref}
          className={cx(
            "flex flex-wrap gap-1 px-4 py-2 border border-foreground/15 rounded-lg bg-background",
            className
          )}
          {...props}
        >
          {value.map((item, index) => (
            <Badge
              key={item}
              className={cx(
                "flex items-center gap-1",
                activeIndex === index && "ring-2 ring-muted-foreground "
              )}
            >
              <span className="text-xs">{item}</span>
              <button
                aria-label={`Remove ${item} option`}
                aria-roledescription="button to remove option"
                type="button"
                onMouseDown={mousePreventDefault}
                onClick={() => onValueChange(item)}
              >
                <span className="sr-only">Remove {item} option</span>
                <RemoveIcon className="h-4 w-4 hover:stroke-destructive" />
              </button>
            </Badge>
          ))}
          {children}
        </div>
      </Box>
    )
  }
)
MultiSelectTrigger.displayName = "MultiSelectTrigger"

const MultiSelectInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } = useMultiSelect()
  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={cx(
        "ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1",
        className,
        activeIndex !== -1 && "caret-transparent"
      )}
    />
  )
})
MultiSelectInput.displayName = "MultiSelectInput"

const MultiSelectContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children }, ref) => {
    const { open } = useMultiSelect()
    return (
      <div ref={ref} className="relative">
        {open && children}
      </div>
    )
  }
)
MultiSelectContent.displayName = "MultiSelectContent"

const MultiSelectList = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={cx(
        "p-2 flex flex-col gap-2 rounded-md scrollbar-thin scrollbar-track-transparent transition-colors scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg w-full absolute bg-background shadow-md z-10 border border-foreground/15 top-0",
        className
      )}
    >
      {children}
      <CommandEmpty>
        <span className="text-muted-foreground">No results found</span>
      </CommandEmpty>
    </CommandList>
  )
})
MultiSelectList.displayName = "MultiSelectList"

const MultiSelectItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  { value: string } & ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, value, children, ...props }, ref) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect()

  const mousePreventDefault: MouseEventHandler = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const isIncluded = Options.includes(value)
  return (
    <CommandItem
      ref={ref}
      {...props}
      onSelect={() => {
        onValueChange(value)
        setInputValue("")
      }}
      className={cx(
        "rounded-md cursor-pointer px-2 py-1 transition-colors flex justify-between ",
        className,
        isIncluded && "opacity-50 cursor-default",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      onMouseDown={mousePreventDefault}
    >
      {children}
      {isIncluded && <Check className="h-4 w-4" />}
    </CommandItem>
  )
})
MultiSelectItem.displayName = "MultiSelectItem"

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectInput,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
}
