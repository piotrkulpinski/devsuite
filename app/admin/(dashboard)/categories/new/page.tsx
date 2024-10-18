import { CategoryForm } from "~/app/admin/(dashboard)/categories/_components/category-form"
import { getTools } from "~/app/admin/(dashboard)/categories/_lib/queries"
import { H3 } from "~/components/ui/heading"
import { Wrapper } from "~/components/ui/wrapper"

export default async function CreateCategoryPage() {
  const tools = await getTools()

  return (
    <Wrapper size="md">
      <H3>Create category</H3>

      <CategoryForm tools={tools} />
    </Wrapper>
  )
}
