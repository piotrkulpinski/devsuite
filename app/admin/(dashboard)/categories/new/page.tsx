import { CategoryForm } from "~/app/admin/(dashboard)/categories/_components/category-form"
import { getTools } from "~/app/admin/(dashboard)/categories/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

export default async function CreateCategoryPage() {
  const tools = await getTools()

  return (
    <Wrapper size="md">
      <H4 as="h1">Create category</H4>

      <CategoryForm tools={tools} />
    </Wrapper>
  )
}
