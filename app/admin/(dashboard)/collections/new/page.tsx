import { CollectionForm } from "~/app/admin/(dashboard)/collections/_components/collection-form"
import { getTools } from "~/app/admin/(dashboard)/collections/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

export default async function CreateCollectionPage() {
  const tools = await getTools()

  return (
    <Wrapper size="md">
      <H4 as="h1">Create collection</H4>

      <CollectionForm tools={tools} />
    </Wrapper>
  )
}
