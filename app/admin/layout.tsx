import { SessionProvider } from "next-auth/react"
import type { PropsWithChildren } from "react"
import { Toaster } from "~/components/admin/ui/toaster"
import { auth } from "~/lib/auth"

import "./styles.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
