"use client"

import { ChevronsUpDown, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import type { ComponentProps } from "react"
import { Avatar, AvatarImage } from "~/components/admin/ui/avatar"
import { Button } from "~/components/admin/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/admin/ui/dropdown-menu"
import { cx } from "~/utils/cva"

interface NavUserProps extends ComponentProps<"nav"> {
  isCollapsed: boolean
}

export const NavUser = ({ className, isCollapsed, ...props }: NavUserProps) => {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={isCollapsed ? "icon" : "md"}
          prefix={
            session.user.image ? (
              <Avatar className="size-5">
                <AvatarImage src={session.user.image} />
              </Avatar>
            ) : (
              <User />
            )
          }
          suffix={!isCollapsed && <ChevronsUpDown className="ml-auto text-muted-foreground" />}
          className={cx(!isCollapsed && "justify-start")}
          aria-label={session.user.name ?? "User"}
        >
          {isCollapsed ? null : session.user.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuItem asChild>
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
