"use client"

import type { Collection } from "@prisma/client"
import type { Row } from "@tanstack/react-table"
import { TrashIcon } from "lucide-react"
import { toast } from "sonner"
import { useServerAction } from "zsa-react"
import { Button } from "~/components/admin/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/admin/ui/dialog"
import { deleteCollections } from "../_lib/actions"

interface CollectionsDeleteDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  collections: Row<Collection>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const CollectionsDeleteDialog = ({
  collections,
  showTrigger = true,
  onSuccess,
  ...props
}: CollectionsDeleteDialogProps) => {
  const { execute, isPending } = useServerAction(deleteCollections, {
    onSuccess: () => {
      props.onOpenChange?.(false)
      toast.success("Collections deleted")
      onSuccess?.()
    },

    onError: ({ err }) => {
      toast.error(err.message)
    },
  })

  return (
    <Dialog {...props}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" prefix={<TrashIcon />}>
            Delete ({collections.length})
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{collections.length}</span>
            {collections.length === 1 ? " collection" : " collections"} from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => execute({ ids: collections.map(({ id }) => id) })}
            isPending={isPending}
            disabled={isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
