"use client"

import { keepNumberInRange } from "@curiousleaf/utils"
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import {
  type ComponentProps,
  type HTMLAttributes,
  type KeyboardEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Button } from "~/components/web/ui/button"
import { type VariantProps, cva, cx } from "~/utils/cva"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const TWEEN_FACTOR_BASE = 0.5

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const tweenFactor = useRef(0)

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    const setTweenFactor = useCallback((api: EmblaCarouselType) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
    }, [])

    const tweenOpacity = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = eventName === "scroll"

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        for (const slideIndex of slidesInSnap) {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            for (const loopItem of engine.slideLooper.loopPoints) {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            }
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const opacity = keepNumberInRange(tweenValue, 0, 1).toString()
          api.slideNodes()[slideIndex].style.opacity = opacity
        }
      })
    }, [])

    useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    useEffect(() => {
      if (!api) return

      setTweenFactor(api)
      tweenOpacity(api)
      api
        .on("reInit", setTweenFactor)
        .on("reInit", tweenOpacity)
        .on("scroll", tweenOpacity)
        .on("slideFocus", tweenOpacity)
    }, [api, setTweenFactor, tweenOpacity])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cx("relative select-none", className)}
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
      <div ref={carouselRef}>
        <div
          ref={ref}
          className={cx(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cx(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    )
  },
)
CarouselItem.displayName = "CarouselItem"

const carouselButtonVariants = cva({
  base: "absolute size-8 rounded-full",

  variants: {
    orientation: {
      horizontal: "top-1/2 -translate-y-1/2",
      vertical: "left-1/2 -translate-x-1/2 rotate-90",
    },
    side: {
      left: "",
      right: "",
    },
  },

  compoundVariants: [
    { orientation: "horizontal", side: "left", className: "left-[2.5%]" },
    { orientation: "horizontal", side: "right", className: "right-[2.5%]" },
    { orientation: "vertical", side: "left", className: "top-[2.5%]" },
    { orientation: "vertical", side: "right", className: "bottom-[2.5%]" },
  ],
})

const CarouselButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button> & VariantProps<typeof carouselButtonVariants>
>(({ className, side, variant = "secondary", size = "md", ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cx(carouselButtonVariants({ orientation, side, className }))}
      {...props}
    />
  )
})
CarouselButton.displayName = "CarouselButton"

const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  (props, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel()

    return (
      <CarouselButton
        ref={ref}
        side="left"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        prefix={<ArrowLeftIcon />}
        aria-label="Previous slide"
        {...props}
      />
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>((props, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <CarouselButton
      ref={ref}
      side="right"
      disabled={!canScrollNext}
      onClick={scrollNext}
      prefix={<ArrowRightIcon />}
      aria-label="Next slide"
      {...props}
    />
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { api } = useCarousel()
    const [, setUpdateState] = useState(false)
    const toggleUpdateState = useCallback(() => setUpdateState(prevState => !prevState), [])

    useEffect(() => {
      if (api) {
        api.on("select", toggleUpdateState)
        api.on("reInit", toggleUpdateState)

        return () => {
          api.off("select", toggleUpdateState)
          api.off("reInit", toggleUpdateState)
        }
      }
    }, [api, toggleUpdateState])

    const numberOfSlides = api?.scrollSnapList().length || 0
    const currentSlide = api?.selectedScrollSnap() || 0

    if (numberOfSlides <= 1) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cx("flex justify-center items-center w-full px-4", className)}
        {...props}
      >
        {Array.from({ length: numberOfSlides }, (_, i) => (
          <button
            key={i}
            type="button"
            className={cx(
              "shrink-1 basis-5 p-1 h-3 transition-all",
              i === currentSlide
                ? "basis-8 text-accent"
                : "text-foreground/25 hover:text-foreground/50",
            )}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
          >
            <div className="size-full rounded-full bg-current" />
          </button>
        ))}
      </div>
    )
  },
)
CarouselDots.displayName = "CarouselDots"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
