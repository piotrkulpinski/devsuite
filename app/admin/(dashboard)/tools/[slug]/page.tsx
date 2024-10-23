import { notFound } from "next/navigation"
import { ToolActions } from "~/app/admin/(dashboard)/tools/_components/tool-actions"
import { ToolForm } from "~/app/admin/(dashboard)/tools/_components/tool-form"
import {
  getCategories,
  getCollections,
  getTags,
  getToolBySlug,
} from "~/app/admin/(dashboard)/tools/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

type Params = Promise<{ slug: string }>

export default async function UpdateToolPage({ params }: { params: Params }) {
  const { slug } = await params

  const [tool, categories, collections, tags] = await Promise.all([
    getToolBySlug(slug),
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
