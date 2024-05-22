import { useNavigate } from "@remix-run/react"
import hotkeys from "hotkeys-js"
import {
  HomeIcon,
  TwitterIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FacebookIcon,
  HeartIcon,
  EraserIcon,
} from "lucide-react"
import { Fragment, HTMLAttributes, useEffect, useState } from "react"
import { Dock } from "~/components/Dock"
import { Shortcut } from "~/components/Shortcut"
import { Tooltip } from "~/components/Tooltip"

type NavItemProps = {
  icon: React.ComponentType
  tooltip: string
  shortcut?: string
  isActive?: boolean
  onClick?: () => void
}

const NavItem = ({ ...props }: NavItemProps) => {
  const { icon: Icon, tooltip, shortcut, isActive, onClick } = props

  useEffect(() => {
    if (shortcut && onClick) {
      hotkeys(shortcut, () => onClick())
    }

    return () => {
      if (shortcut) {
        hotkeys.unbind(shortcut)
      }
    }
  }, [shortcut, onClick])

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
        <button type="button" onClick={onClick}>
          <Icon />
        </button>
      </Dock.Item>
    </Tooltip>
  )
}

export const Nav = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  const actions: (null | NavItemProps)[] = [
    {
      icon: HomeIcon,
      tooltip: "Go Home",
      shortcut: "H",
      onClick: () => navigate("/"),
    },
    {
      icon: EraserIcon,
      tooltip: "Request a Change",
      shortcut: "R",
    },
    {
      icon: HeartIcon,
      tooltip: "Add to favorites",
      shortcut: "L",
      isActive: isFavorite,
      onClick: () => setIsFavorite(!isFavorite),
    },
    null,
    {
      icon: ArrowLeftIcon,
      tooltip: "Previous Tool",
      shortcut: "←",
    },
    {
      icon: ArrowRightIcon,
      tooltip: "Next Tool",
      shortcut: "→",
    },
    null,
    {
      icon: TwitterIcon,
      tooltip: "Share on Twitter",
    },
    {
      icon: FacebookIcon,
      tooltip: "Share on Facebook",
    },
  ]

  return (
    <Dock {...props}>
      {actions.map((action, i) => (
        <Fragment key={i}>
          {!action && <Dock.Separator />}
          {action && <NavItem {...action} />}
        </Fragment>
      ))}
    </Dock>
  )
}
