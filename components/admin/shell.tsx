"use client"

import { GemIcon, LayoutDashboardIcon, LibraryIcon, ShapesIcon, TagIcon } from "lucide-react"
import * as React from "react"
import { Nav } from "~/components/admin/nav"
import { NavUser } from "~/components/admin/nav-user"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/admin/ui/resizable"
import { Separator } from "~/components/admin/ui/separator"
import { useIsMobile } from "~/hooks/use-mobile"
import { useStats } from "~/hooks/use-stats-context"
import { cx } from "~/utils/cva"

interface ShellProps extends React.PropsWithChildren {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

export function Shell({
  children,
  defaultLayout = [20, 48],
  defaultCollapsed = false,
  navCollapsedSize = 0,
}: ShellProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const stats = useStats()
  const isMobile = useIsMobile()

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={sizes => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        data-collapsed={isCollapsed}
        collapsible={true}
        minSize={isMobile ? navCollapsedSize : 5}
        maxSize={isMobile ? navCollapsedSize : 20}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
        }}
        onResize={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
        }}
        className={cx(
          "group/collapsible sticky top-0 h-dvh z-40 flex flex-col",
          isCollapsed ? "min-w-12 transition-all duration-300 ease-in-out" : "min-w-52 max-w-64",
        )}
      >
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/admin",
              icon: <LayoutDashboardIcon />,
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Tools",
              href: "/admin/tools",
              label: stats[0].toString(),
              icon: <GemIcon />,
            },
            {
              title: "Categories",
              href: "/admin/categories",
              label: stats[1].toString(),
              icon: <ShapesIcon />,
            },
            {
              title: "Collections",
              href: "/admin/collections",
              label: stats[2].toString(),
              icon: <LibraryIcon />,
            },
            {
              title: "Tags",
              href: "/admin/tags",
              label: stats[3].toString(),
              icon: <TagIcon />,
            },
          ]}
        />

        <NavUser isCollapsed={isCollapsed} className="mt-auto" />
      </ResizablePanel>

      <ResizableHandle
        withHandle={!isMobile}
        className="sticky top-0 h-dvh items-start pt-[1.33rem]"
      />

      <ResizablePanel
        defaultSize={defaultLayout[1]}
        className="grid grid-cols-1 content-start gap-4 p-4 sm:px-6"
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
