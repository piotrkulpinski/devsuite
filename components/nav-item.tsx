"use client"

import { Slot } from "@radix-ui/react-slot"
import hotkeys from "hotkeys-js"
import { type ReactNode, useEffect } from "react"
import { Dock } from "~/components/ui/dock"
import { Shortcut } from "~/components/ui/shortcut"
import { Tooltip } from "~/components/ui/tooltip"

export type NavItemProps = {
  icon: ReactNode
  tooltip: string
  shortcut?: string
  hotkey?: string
  isActive?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

export const NavItem = ({ ...props }: NavItemProps) => {
  const { icon, tooltip, shortcut, hotkey, isActive, isDisabled, onClick } = props

  useEffect(() => {
    const key = hotkey || shortcut

    if (key && !isDisabled && onClick) {
      hotkeys(key, () => onClick())
    }

    return () => {
      if (key) {
        hotkeys.unbind(key)
      }
    }
  }, [shortcut, onClick, hotkey, isDisabled])

  return (
    <Tooltip
      tooltip={
        <>
          {tooltip} {shortcut && <Shortcut>{shortcut}</Shortcut>}
        </>
      }
      sideOffset={0}
    >
      <Dock.Item isActive={isActive} asChild>
        <button type="button" onClick={onClick} disabled={isDisabled}>
          <Slot className="size-4">{icon}</Slot>
        </button>
      </Dock.Item>
    </Tooltip>
  )
}
