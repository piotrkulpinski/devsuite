"use client"

import type { Tool } from "@prisma/client"
import type { Row } from "@tanstack/react-table"
import { ClockIcon } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"
import { useServerAction } from "zsa-react"
import { Button } from "~/components/admin/ui/button"
import { Calendar } from "~/components/admin/ui/calendar"
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
import { scheduleTools } from "../_lib/actions"

interface ToolsScheduleDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tools: Row<Tool>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export const ToolsScheduleDialog = ({
  tools,
  showTrigger = true,
  onSuccess,
  ...props
}: ToolsScheduleDialogProps) => {
  const [publishedAt, setPublishedAt] = React.useState<Date | undefined>(undefined)

  const { execute, isPending } = useServerAction(scheduleTools, {
    onSuccess: () => {
      props.onOpenChange?.(false)
      toast.success("Tool(s) scheduled")
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
          <Button variant="outline" size="sm" prefix={<ClockIcon />}>
            Schedule ({tools.length})
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pick a date to publish</DialogTitle>
          <DialogDescription>
            This tool(s) will be published on the date you choose.
          </DialogDescription>
        </DialogHeader>

        <Calendar
          initialFocus
          mode="single"
          selected={publishedAt}
          onSelect={setPublishedAt}
          className="px-0"
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            aria-label="Schedule"
            variant="default"
            onClick={() => publishedAt && execute({ ids: tools.map(({ id }) => id), publishedAt })}
            isPending={isPending}
            disabled={!publishedAt || isPending}
          >
            Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
