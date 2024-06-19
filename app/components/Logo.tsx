import type { HTMLAttributes } from "react"
import { cx } from "~/utils/cva"
import { SITE_NAME } from "~/utils/constants"
import { Series } from "./Series"
import { NavLink } from "@remix-run/react"

export const Logo = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Series size="sm" className={cx("text-sm text-foreground", className)} asChild {...props}>
      <NavLink to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 327 309"
          height="24"
          width="24"
          role="img"
          aria-label="Logo"
          className="size-4"
        >
          <path
            fill="currentColor"
            d="M311.63,154.67 L311.63,139.84 L190.93,146.79 C186.72,147.02 183.12,143.79 182.89,139.59 C182.79,137.72 183.36,135.98 184.4,134.59 L250.52,33.92 L224.82,19.08 L170.48,127.1 C168.58,130.86 163.99,132.38 160.23,130.48 C158.69,129.7 157.53,128.48 156.82,127.05 L102.51,19.08 L76.81,33.92 L143.19,134.98 C145.5,138.5 144.52,143.22 141.01,145.54 C139.59,146.47 137.98,146.87 136.4,146.78 L136.4,146.8 L15.7,139.85 L15.7,169.51 L136.4,162.56 C140.61,162.33 144.21,165.55 144.44,169.76 C144.54,171.62 143.96,173.37 142.93,174.76 L76.81,275.43 L89.68,282.86 L89.69,282.85 L102.53,290.26 L156.86,182.25 C158.76,178.49 163.35,176.97 167.11,178.87 C168.65,179.65 169.81,180.87 170.52,182.3 L224.83,290.26 L237.66,282.85 L238.09,282.62 L250.53,275.43 L184.16,174.37 C181.85,170.85 182.83,166.13 186.34,163.82 C187.76,162.89 189.37,162.49 190.94,162.58 L190.94,162.57 L311.64,169.52 L311.64,154.69 L311.63,154.67 Z M326.94,131.75 L326.94,177.59 L326.92,177.59 L326.91,178.01 C326.68,182.22 323.08,185.44 318.87,185.21 L205.21,178.67 L267.68,273.78 L267.93,274.19 C270.02,277.84 268.77,282.5 265.12,284.6 L245.69,295.81 L245.3,296.05 L225.45,307.51 L225.06,307.72 C221.3,309.62 216.71,308.11 214.81,304.34 L163.66,202.66 L112.59,304.19 C112.5,304.37 112.41,304.55 112.31,304.73 C110.2,308.38 105.52,309.62 101.88,307.51 L82.03,296.05 L82.04,296.04 L62.21,284.6 L61.82,284.36 C58.3,282.05 57.33,277.32 59.64,273.8 L122.12,178.67 L9.03,185.18 C8.71,185.22 8.38,185.24 8.05,185.24 C3.82,185.24 0.4,181.81 0.4,177.59 L0.4,131.75 L0.42,131.75 L0.43,131.33 C0.66,127.12 4.26,123.89 8.47,124.13 L122.13,130.68 L59.66,35.57 L59.41,35.16 C57.32,31.51 58.57,26.85 62.22,24.76 L101.51,2.07 C101.75,1.91 102.01,1.76 102.28,1.63 C106.04,-0.27 110.64,1.24 112.54,5.01 L163.69,106.69 L214.84,5.01 L214.85,5.02 L215.05,4.65 C217.14,1 221.8,-0.26 225.45,1.84 L265.15,24.76 L265.54,25 C269.06,27.31 270.03,32.04 267.72,35.55 L205.24,130.68 L318.33,124.16 C318.65,124.12 318.98,124.1 319.31,124.1 C323.54,124.1 326.96,127.53 326.96,131.75 L326.94,131.75 Z"
          />
        </svg>
        <span className="font-medium">{SITE_NAME}</span>
      </NavLink>
    </Series>
  )
}