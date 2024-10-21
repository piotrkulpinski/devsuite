"use client"

import type { Collection } from "@prisma/client"
import type { Table } from "@tanstack/react-table"
import { CollectionsDeleteDialog } from "./collections-delete-dialog"

interface CollectionsTableToolbarActionsProps {
  table: Table<Collection>
}

export function CollectionsTableToolbarActions({ table }: CollectionsTableToolbarActionsProps) {
  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <CollectionsDeleteDialog
          collections={table.getFilteredSelectedRowModel().rows.map(row => row.original)}
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
