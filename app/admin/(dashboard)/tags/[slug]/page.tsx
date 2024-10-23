import { notFound } from "next/navigation"
import { TagActions } from "~/app/admin/(dashboard)/tags/_components/tag-actions"
import { TagForm } from "~/app/admin/(dashboard)/tags/_components/tag-form"
import { getTagBySlug, getTools } from "~/app/admin/(dashboard)/tags/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

type Params = Promise<{ slug: string }>

export default async function UpdateTagPage({ params }: { params: Params }) {
  const { slug } = await params
  const [tag, tools] = await Promise.all([getTagBySlug(slug), getTools()])

  if (!tag) {
    return notFound()
  }

  return (
    <Wrapper size="md">
      <div className="flex items-center justify-between gap-4">
        <H4 as="h1">Update tag</H4>

        <TagActions tag={tag} />
      </div>

      <TagForm tag={tag} tools={tools} />
    </Wrapper>
  )
}
