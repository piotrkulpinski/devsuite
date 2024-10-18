import { SessionProvider } from "next-auth/react"
import type { PropsWithChildren } from "react"
import { Toaster } from "~/components/ui/toaster"
import { auth } from "~/lib/auth"

import "./styles.css"

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <body className="flex flex-col min-h-screen w-full font-sans">
        {children}
        <Toaster />
      </body>
    </SessionProvider>
  )
}
