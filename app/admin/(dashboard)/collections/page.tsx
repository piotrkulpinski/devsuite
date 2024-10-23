import { Suspense } from "react"
import { DataTableSkeleton } from "~/components/admin/data-table/data-table-skeleton"
import { searchParamsSchema } from "~/schema/search-params"
import type { SearchParams } from "~/types"
import { CollectionsTable } from "./_components/collections-table"
import { getCollections } from "./_lib/queries"

export default async function CollectionsPage({ searchParams }: { searchParams: SearchParams }) {
  const search = searchParamsSchema.parse(await searchParams)
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
