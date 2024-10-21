import { Suspense } from "react"
import { DataTableSkeleton } from "~/components/admin/data-table/data-table-skeleton"
import { searchParamsSchema } from "~/schema/search-params"
import type { SearchParams } from "~/types"
import { CollectionsTable } from "./_components/collections-table"
import { getCollections } from "./_lib/queries"

export interface CollectionsPageProps {
  searchParams: SearchParams
}

export default function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const search = searchParamsSchema.parse(searchParams)
  const collectionsPromise = getCollections(search)

  return (
    <Suspense
      fallback={
        <DataTableSkeleton
          title="Collections"
          columnCount={5}
          rowCount={15}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={["12%", "48%", "15%", "15%", "10%"]}
          shrinkZero
        />
      }
    >
      <CollectionsTable collectionsPromise={collectionsPromise} />
    </Suspense>
  )
}
