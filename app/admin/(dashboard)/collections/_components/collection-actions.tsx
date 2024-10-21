"use client"

import type { Collection } from "@prisma/client"
import type { Row } from "@tanstack/react-table"
import { EllipsisIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { CollectionsDeleteDialog } from "~/app/admin/(dashboard)/collections/_components/collections-delete-dialog"
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

interface CollectionActionsProps extends React.ComponentPropsWithoutRef<typeof Button> {
  collection: Collection
  row?: Row<Collection>
}

export const CollectionActions = ({
  collection,
  row,
  className,
  ...props
}: CollectionActionsProps) => {
  const router = useRouter()
  const [showCollectionsDeleteDialog, setShowCollectionsDeleteDialog] = useState(false)

  return (
    <>
      <CollectionsDeleteDialog
        open={showCollectionsDeleteDialog}
        onOpenChange={setShowCollectionsDeleteDialog}
        collections={[collection]}
        showTrigger={false}
        onSuccess={() => row?.toggleSelected(false) || router.push("/admin/collections")}
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
            <Link href={`/admin/collections/${collection.id}`}>Edit</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`${siteConfig.url}/collections/${collection.slug}`} target="_blank">
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setShowCollectionsDeleteDialog(true)}
            className="text-red-500"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
