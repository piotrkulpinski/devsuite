"use client"

import * as React from "react"
import type { DataTableFilterField } from "~/types"

import type { Collection } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { DataTable } from "~/components/admin/data-table/data-table"
import { DataTableHeader } from "~/components/admin/data-table/data-table-header"
import { DataTableToolbar } from "~/components/admin/data-table/data-table-toolbar"
import { DataTableViewOptions } from "~/components/admin/data-table/data-table-view-options"
import { DateRangePicker } from "~/components/admin/date-range-picker"
import { Button } from "~/components/admin/ui/button"
import { useDataTable } from "~/hooks/use-data-table"
import type { getCollections } from "../_lib/queries"
import { getColumns } from "./collections-table-columns"
import { CollectionsTableToolbarActions } from "./collections-table-toolbar-actions"

interface CollectionsTableProps {
  collectionsPromise: ReturnType<typeof getCollections>
}

export function CollectionsTable({ collectionsPromise }: CollectionsTableProps) {
  const { collections, collectionsTotal, pageCount } = React.use(collectionsPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Collection>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Filter by name...",
    },
    // {
    //   label: "Status",
    //   value: "status",
    //   options: collections.status.enumValues.map(status => ({
    //     label: status[0]?.toUpperCase() + status.slice(1),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     withCount: true,
    //   })),
    // },
    // {
    //   label: "Priority",
    //   value: "priority",
    //   options: collections.priority.enumValues.map(priority => ({
    //     label: priority[0]?.toUpperCase() + priority.slice(1),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     withCount: true,
    //   })),
    // },
  ]

  const { table } = useDataTable({
    data: collections,
    columns,
    pageCount,
    /* optional props */
    filterFields,
    initialState: {
      sorting: [{ id: "name", desc: false }],
      columnPinning: { right: ["actions"] },
    },
    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  })

  return (
    <DataTable table={table}>
      <DataTableHeader
        title="Collections"
        total={collectionsTotal}
        callToAction={
          <Button prefix={<PlusIcon />} asChild>
            <Link href="/admin/collections/new">
              <span className="max-sm:sr-only">New collection</span>
            </Link>
          </Button>
        }
      >
        <DataTableToolbar table={table} filterFields={filterFields}>
          <CollectionsTableToolbarActions table={table} />
          <DateRangePicker triggerSize="sm" triggerClassName="ml-auto" align="end" />
          <DataTableViewOptions table={table} />
        </DataTableToolbar>
      </DataTableHeader>
    </DataTable>
  )
}
