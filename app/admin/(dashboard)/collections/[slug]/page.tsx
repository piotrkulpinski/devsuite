import { notFound } from "next/navigation"
import { CollectionActions } from "~/app/admin/(dashboard)/collections/_components/collection-actions"
import { CollectionForm } from "~/app/admin/(dashboard)/collections/_components/collection-form"
import { getCollectionBySlug, getTools } from "~/app/admin/(dashboard)/collections/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

export default async function UpdateCollectionPage({ params }: { params: { slug: string } }) {
  const [collection, tools] = await Promise.all([getCollectionBySlug(params.slug), getTools()])

  if (!collection) {
    return notFound()
  }

  return (
    <Wrapper size="md">
      <div className="flex items-center justify-between gap-4">
        <H4 as="h1">Update collection</H4>

        <CollectionActions collection={collection} />
      </div>

      <CollectionForm collection={collection} tools={tools} />
    </Wrapper>
  )
}
