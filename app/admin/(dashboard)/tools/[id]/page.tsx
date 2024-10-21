import { notFound } from "next/navigation"
import { ToolActions } from "~/app/admin/(dashboard)/tools/_components/tool-actions"
import { ToolForm } from "~/app/admin/(dashboard)/tools/_components/tool-form"
import {
  getCategories,
  getCollections,
  getTags,
  getToolById,
} from "~/app/admin/(dashboard)/tools/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

export default async function UpdateToolPage({ params }: { params: { id: string } }) {
  const [tool, categories, collections, tags] = await Promise.all([
    getToolById(params.id),
    getCategories(),
    getCollections(),
    getTags(),
  ])

  if (!tool) {
    return notFound()
  }

  return (
    <Wrapper size="md">
      <div className="flex items-center justify-between gap-4">
        <H4 as="h1">Update tool</H4>

        <ToolActions tool={tool} />
      </div>

      <ToolForm tool={tool} categories={categories} collections={collections} tags={tags} />
    </Wrapper>
  )
}
