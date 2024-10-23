import { cookies } from "next/headers"
import type { PropsWithChildren } from "react"
import { CommandMenu } from "~/components/admin/command-menu"
import { Shell } from "~/components/admin/shell"
import { Toaster } from "~/components/admin/ui/toaster"
import { prisma } from "~/services/prisma"
import { Providers } from "./providers"

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies()

  const statsPromise = Promise.all([
    prisma.tool.count(),
    prisma.category.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ])

  const layout = cookieStore.get("react-resizable-panels:layout")
  const collapsed = cookieStore.get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <Providers statsPromise={statsPromise}>
      <Shell defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed}>
        {children}
      </Shell>

      <CommandMenu />
      <Toaster />
    </Providers>
  )
}
