import { Suspense } from "react"
import { DataTableSkeleton } from "~/components/admin/data-table/data-table-skeleton"
import { searchParamsSchema } from "~/schema/search-params"
import type { SearchParams } from "~/types"
import { TagsTable } from "./_components/tags-table"
import { getTags } from "./_lib/queries"

export interface TagsPageProps {
  searchParams: SearchParams
}

export default function TagsPage({ searchParams }: TagsPageProps) {
  const search = searchParamsSchema.parse(searchParams)
  const tagsPromise = getTags(search)

  return (
    <Suspense
      fallback={
        <DataTableSkeleton
          title="Tags"
          columnCount={5}
          rowCount={15}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={["12%", "48%", "15%", "15%", "10%"]}
          shrinkZero
        />
      }
    >
      <TagsTable tagsPromise={tagsPromise} />
    </Suspense>
  )
}
