"use client"

import { formatDate } from "@curiousleaf/utils"
import type { Tag } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import { TagActions } from "~/app/admin/(dashboard)/tags/_components/tag-actions"
import { DataTableColumnHeader } from "~/components/admin/data-table/data-table-column-header"
import { DataTableLink } from "~/components/admin/data-table/data-table-link"
import { Checkbox } from "~/components/common/checkbox"

export function getColumns(): ColumnDef<Tag>[] {
  return [
    {
      accessorKey: "name",
      header: ({ table, column }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="block my-auto mx-1.5"
          />

          <DataTableColumnHeader column={column} title="Name" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="block my-auto mx-1.5"
          />

          <DataTableLink href={`/admin/tags/${row.original.slug}`}>
            {row.getValue("name")}
          </DataTableLink>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ cell }) => (
        <span className="text-muted-foreground">{formatDate(cell.getValue() as Date)}</span>
      ),
      size: 0,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <TagActions tag={row.original} row={row} className="float-right -my-0.5" />
      ),
      size: 0,
    },
  ]
}
