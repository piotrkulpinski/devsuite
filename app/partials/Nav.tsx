/** eslint-disable react-hooks/exhaustive-deps */
/** eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "@remix-run/react"
import hotkeys from "hotkeys-js"
import {
  HomeIcon,
  TwitterIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FacebookIcon,
  LinkIcon,
} from "lucide-react"
import { Fragment, HTMLAttributes, useEffect } from "react"
import { toast } from "sonner"
import { Dock } from "~/components/Dock"
import { Shortcut } from "~/components/Shortcut"
import { Tooltip } from "~/components/Tooltip"

type NavItemProps = {
  icon: React.ComponentType
  tooltip: string
  shortcut?: string
  hotkey?: string
  isActive?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

const NavItem = ({ ...props }: NavItemProps) => {
  const { icon: Icon, tooltip, shortcut, hotkey, isActive, isDisabled, onClick } = props

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
  }, [shortcut, onClick, hotkey])

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
          <Icon />
        </button>
      </Dock.Item>
    </Tooltip>
  )
}

type NavProps = HTMLAttributes<HTMLElement> & {
  previous?: string
  next?: string
}

export const Nav = ({ previous, next, ...props }: NavProps) => {
  // const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  const actions: (null | NavItemProps)[] = [
    {
      icon: HomeIcon,
      tooltip: "Go Home",
      shortcut: "H",
      onClick: () => navigate("/", { unstable_viewTransition: true }),
    },
    // {
    //   icon: EraserIcon,
    //   tooltip: "Request a Change",
    //   shortcut: "R",
    // },
    // {
    //   icon: HeartIcon,
    //   tooltip: "Add to favorites",
    //   shortcut: "L",
    //   isActive: isFavorite,
    //   onClick: () => setIsFavorite(!isFavorite),
    // },
    null,
    {
      icon: ArrowLeftIcon,
      tooltip: "Previous Tool",
      shortcut: "←",
      hotkey: "left",
      isDisabled: !previous,
      onClick: () => navigate(`/${previous}`, { unstable_viewTransition: true }),
    },
    {
      icon: ArrowRightIcon,
      tooltip: "Next Tool",
      shortcut: "→",
      hotkey: "right",
      isDisabled: !next,
      onClick: () => navigate(`/${next}`, { unstable_viewTransition: true }),
    },
    null,
    {
      icon: LinkIcon,
      tooltip: "Copy Link",
      shortcut: "C",
      onClick: () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
      },
    },
    {
      icon: TwitterIcon,
      tooltip: "Share on Twitter",
    },
    {
      icon: FacebookIcon,
      tooltip: "Share on Facebook",
    },
  ]

  useEffect(() => {
    hotkeys("E", () => navigate(`edit`))

    return () => hotkeys.unbind("E")
  }, [])

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
