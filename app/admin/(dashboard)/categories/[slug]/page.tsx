import { notFound } from "next/navigation"
import { CategoryActions } from "~/app/admin/(dashboard)/categories/_components/category-actions"
import { CategoryForm } from "~/app/admin/(dashboard)/categories/_components/category-form"
import { getCategoryBySlug, getTools } from "~/app/admin/(dashboard)/categories/_lib/queries"
import { Wrapper } from "~/components/admin/ui/wrapper"
import { H4 } from "~/components/common/heading"

type Params = Promise<{ slug: string }>

export default async function UpdateCategoryPage({ params }: { params: Params }) {
  const { slug } = await params
  const [category, tools] = await Promise.all([getCategoryBySlug(slug), getTools()])

  if (!category) {
    return notFound()
  }

  return (
    <Wrapper size="md">
      <div className="flex items-center justify-between gap-4">
        <H4 as="h1">Update category</H4>

        <CategoryActions category={category} />
      </div>

      <CategoryForm category={category} tools={tools} />
    </Wrapper>
  )
}
