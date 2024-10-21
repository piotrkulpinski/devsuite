import { TagForm } from "~/app/admin/(dashboard)/tags/_components/tag-form"
import { getTools } from "~/app/admin/(dashboard)/tags/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

export default async function CreateTagPage() {
  const tools = await getTools()

  return (
    <Wrapper size="md">
      <H4 as="h1">Create tag</H4>

      <TagForm tools={tools} />
    </Wrapper>
  )
}
