"use client"

import { Slot } from "@radix-ui/react-slot"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  HomeIcon,
  LinkIcon,
  LoaderIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, type HTMLAttributes } from "react"
import { toast } from "sonner"
import { useServerAction } from "zsa-react"
import { publishTool } from "~/actions/ai"
import type { ToolOne } from "~/api/tools/payloads"
import { BrandFacebookIcon } from "~/components/common/icons/brand-facebook"
import { BrandHackerNewsIcon } from "~/components/common/icons/brand-hackernews"
import { BrandLinkedInIcon } from "~/components/common/icons/brand-linkedin"
import { BrandRedditIcon } from "~/components/common/icons/brand-reddit"
import { BrandWhatsAppIcon } from "~/components/common/icons/brand-whatsapp"
import { BrandXIcon } from "~/components/common/icons/brand-x"
import { NavItem, type NavItemProps } from "~/components/web/nav-item"
import { Dock } from "~/components/web/ui/dock"
import { Tooltip, TooltipProvider } from "~/components/web/ui/tooltip"
import { config } from "~/config"

type NavProps = HTMLAttributes<HTMLElement> & {
  tool: ToolOne
  previous?: string
  next?: string
}

export const Nav = ({ tool, previous, next, ...props }: NavProps) => {
  // const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentUrl = `${config.site.url}${pathname}`

  const shareUrl = encodeURIComponent(currentUrl)
  const shareTitle = encodeURIComponent(`${tool.name} — ${config.site.name}`)

  const shareOptions = [
    {
      platform: "X",
      url: `https://x.com/intent/post?text=${shareTitle}&url=${shareUrl}`,
      icon: <BrandXIcon />,
    },
    {
      platform: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: <BrandFacebookIcon />,
    },
    {
      platform: "LinkedIn",
      url: `https://linkedin.com/sharing/share-offsite?url=${shareUrl}&text=${shareTitle}`,
      icon: <BrandLinkedInIcon />,
    },
    {
      platform: "HackerNews",
      url: `https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${shareTitle}`,
      icon: <BrandHackerNewsIcon />,
    },
    {
      platform: "Reddit",
      url: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
      icon: <BrandRedditIcon />,
    },
    {
      platform: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${`${shareTitle}+${shareUrl}`}`,
      icon: <BrandWhatsAppIcon />,
    },
  ]

  const { execute, isPending } = useServerAction(publishTool, {
    onSuccess: ({ data }) => {
      console.log(data)
    },

    onError: ({ err }) => {
      console.error(err.message)
      toast.error(err.message)
    },
  })

  const actions: (null | NavItemProps)[] = [
    {
      icon: <HomeIcon />,
      tooltip: "Go Home",
      shortcut: "H",
      onClick: () => router.push("/"),
    },
    {
      icon: isPending ? <LoaderIcon className="animate-spin" /> : <CalendarIcon />,
      tooltip: "Publish Tool",
      shortcut: "P",
      onClick: () => execute({ slug: tool.slug }),
    },
    // {
    //   icon: <EraserIcon />,
    //   tooltip: "Request a Change",
    //   shortcut: "R",
    // },
    // {
    //   icon: <HeartIcon />,
    //   tooltip: "Add to favorites",
    //   shortcut: "L",
    //   isActive: isFavorite,
    //   onClick: () => setIsFavorite(!isFavorite),
    // },
    {
      icon: <LinkIcon />,
      tooltip: "Copy Link",
      shortcut: "C",
      onClick: () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
      },
    },
    null,
    {
      icon: <ArrowLeftIcon />,
      tooltip: "Previous Tool",
      shortcut: "←",
      hotkey: "left",
      isDisabled: !previous,
      onClick: () => router.push(`/tools/${previous}`),
    },
    {
      icon: <ArrowRightIcon />,
      tooltip: "Next Tool",
      shortcut: "→",
      hotkey: "right",
      isDisabled: !next,
      onClick: () => router.push(`/tools/${next}`),
    },
  ]

  return (
    <TooltipProvider delayDuration={0} disableHoverableContent>
      <Dock {...props}>
        {actions.map((action, i) => (
          <Fragment key={i}>
            {!action && <Dock.Separator />}
            {action && <NavItem {...action} />}
          </Fragment>
        ))}

        <Dock.Separator />

        {shareOptions.map(({ platform, url, icon }) => (
          <Tooltip key={platform} tooltip={`Share on ${platform}`} sideOffset={0}>
            <Dock.Item asChild>
              <Link href={url} target="_blank" rel="noopener noreferrer nofollow">
                <Slot className="size-4">{icon}</Slot>
              </Link>
            </Dock.Item>
          </Tooltip>
        ))}
      </Dock>
    </TooltipProvider>
  )
}
