"use client"

import type { Tag } from "@prisma/client"
import type { Row } from "@tanstack/react-table"
import { EllipsisIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { TagsDeleteDialog } from "~/app/admin/(dashboard)/tags/_components/tags-delete-dialog"
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

interface TagActionsProps extends React.ComponentPropsWithoutRef<typeof Button> {
  tag: Tag
  row?: Row<Tag>
}

export const TagActions = ({ tag, row, className, ...props }: TagActionsProps) => {
  const router = useRouter()
  const [showTagsDeleteDialog, setShowTagsDeleteDialog] = useState(false)

  return (
    <>
      <TagsDeleteDialog
        open={showTagsDeleteDialog}
        onOpenChange={setShowTagsDeleteDialog}
        tags={[tag]}
        showTrigger={false}
        onSuccess={() => row?.toggleSelected(false) || router.push("/admin/tags")}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="outline"
            size="icon"
            prefix={<EllipsisIcon />}
            className={cx("text-muted-foreground data-[state=open]:bg-muted", className)}
            {...props}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/admin/tags/${tag.id}`}>Edit</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`${siteConfig.url}/tags/${tag.slug}`} target="_blank">
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => setShowTagsDeleteDialog(true)} className="text-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
