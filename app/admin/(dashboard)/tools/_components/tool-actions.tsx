"use client"

import type { Tool } from "@prisma/client"
import type { Row } from "@tanstack/react-table"
import { EllipsisIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"
import { useServerAction } from "zsa-react"
import { ToolsDeleteDialog } from "~/app/admin/(dashboard)/tools/_components/tools-delete-dialog"
import { ToolsScheduleDialog } from "~/app/admin/(dashboard)/tools/_components/tools-schedule-dialog"
import { reuploadToolAssets } from "~/app/admin/(dashboard)/tools/_lib/actions"
import { Button } from "~/components/admin/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/admin/ui/dropdown-menu"
import { siteConfig } from "~/config/site"
import { cx } from "~/utils/cva"

interface ToolActionsProps extends React.ComponentPropsWithoutRef<typeof Button> {
  tool: Tool
  row?: Row<Tool>
}

export const ToolActions = ({ tool, row, className, ...props }: ToolActionsProps) => {
  const router = useRouter()
  const [showToolsDeleteDialog, setShowToolsDeleteDialog] = React.useState(false)
  const [showToolsScheduleDialog, setShowToolsScheduleDialog] = React.useState(false)

  const { execute: reuploadAssetsAction } = useServerAction(reuploadToolAssets, {
    onSuccess: () => {
      toast.success("Tool assets reuploaded")
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  return (
    <>
      <ToolsDeleteDialog
        open={showToolsDeleteDialog}
        onOpenChange={setShowToolsDeleteDialog}
        tools={[tool]}
        showTrigger={false}
        onSuccess={() => row?.toggleSelected(false) || router.push("/admin/tools")}
      />

      <ToolsScheduleDialog
        open={showToolsScheduleDialog}
        onOpenChange={setShowToolsScheduleDialog}
        tools={[tool]}
        showTrigger={false}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="outline"
            size="sm"
            prefix={<EllipsisIcon />}
            className={cx("size-7 data-[state=open]:bg-muted", className)}
            {...props}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/admin/tools/${tool.slug}`}>Edit</Link>
          </DropdownMenuItem>

          {!tool.publishedAt && (
            <DropdownMenuItem
              onSelect={() => setShowToolsScheduleDialog(true)}
              className="text-green-600 dark:text-green-400"
            >
              Schedule
            </DropdownMenuItem>
          )}

          {tool.publishedAt && tool.publishedAt <= new Date() && (
            <DropdownMenuItem asChild>
              <Link href={`${siteConfig.url}/tools/${tool.slug}`} target="_blank">
                View
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onSelect={() => reuploadAssetsAction({ id: tool.id })}>
            Reupload Assets
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={tool.websiteUrl} target="_blank">
              Visit website
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setShowToolsDeleteDialog(true)}
            className="text-red-500"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
