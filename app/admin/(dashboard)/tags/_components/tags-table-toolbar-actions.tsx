"use client"

import type { Tag } from "@prisma/client"
import type { Table } from "@tanstack/react-table"
import { TagsDeleteDialog } from "./tags-delete-dialog"

interface TagsTableToolbarActionsProps {
  table: Table<Tag>
}

export function TagsTableToolbarActions({ table }: TagsTableToolbarActionsProps) {
  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <TagsDeleteDialog
          tags={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}

      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </>
  )
}
