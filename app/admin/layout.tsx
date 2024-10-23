import type { PropsWithChildren } from "react"

import "./styles.css"

export default function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>
}
