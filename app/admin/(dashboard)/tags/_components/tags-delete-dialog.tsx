"use client"

import type { Tag } from "@prisma/client"
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
import { deleteTags } from "../_lib/actions"

interface TagsDeleteDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tags: Row<Tag>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const TagsDeleteDialog = ({
  tags,
  showTrigger = true,
  onSuccess,
  ...props
}: TagsDeleteDialogProps) => {
  const { execute, isPending } = useServerAction(deleteTags, {
    onSuccess: () => {
      props.onOpenChange?.(false)
      toast.success("Tags deleted")
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
            Delete ({tags.length})
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-medium">{tags.length}</span>
            {tags.length === 1 ? " tag" : " tags"} from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => execute({ ids: tags.map(({ id }) => id) })}
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
