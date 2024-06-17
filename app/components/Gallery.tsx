import { HTMLAttributes } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel"

type GalleryProps = HTMLAttributes<HTMLElement> & {
  images: string[]
}

export const Gallery = ({ images, ...props }: GalleryProps) => {
  if (images.length === 0) {
    return null
  }

  if (images.length === 1) {
    return <img src={images[0]} alt="" className="w-full h-auto rounded md:rounded-lg" />
  }

  return (
    <Carousel
      className="left-1/2 w-dvw mb-8 -translate-x-1/2 overflow-x-clip"
      opts={{ align: "center", loop: true }}
      {...props}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem className="basis-4/5 md:basis-[656px]" key={index}>
            <img src={image} alt="" className="w-auto h-full rounded md:rounded-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="absolute -bottom-8 left-1/2 -translate-x-1/2" />
    </Carousel>
  )
}
