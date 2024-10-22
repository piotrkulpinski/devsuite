"use client"

import type { Tool } from "@prisma/client"
import type { Table } from "@tanstack/react-table"
import { ToolsScheduleDialog } from "~/app/admin/(dashboard)/tools/_components/tools-schedule-dialog"
import { ToolsDeleteDialog } from "./tools-delete-dialog"

interface ToolsTableToolbarActionsProps {
  table: Table<Tool>
}

export function ToolsTableToolbarActions({ table }: ToolsTableToolbarActionsProps) {
  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <>
          <ToolsScheduleDialog
            tools={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />

          <ToolsDeleteDialog
            tools={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
        </>
      ) : null}

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </>
  )
}
