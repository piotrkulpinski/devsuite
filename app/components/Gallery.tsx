import { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"

type GalleryProps = HTMLAttributes<HTMLElement> & {
  images: string[]
}

export const Gallery = ({ className, images, ...props }: GalleryProps) => {
  return (
    <div className={cx("flex gap-6 h-72", className)} {...props}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className="w-auto h-full border border-foreground/15 rounded-lg"
        />
      ))}
    </div>
  )
}
