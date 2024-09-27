import { SearchIcon } from "lucide-react"
import { Input } from "~/components/ui/forms/input"
import { Stack } from "~/components/ui/stack"
import { searchParamsCache } from "~/lib/search-params"

export const ToolFilters = () => {
  const q = searchParamsCache.get("q")

  return (
    <Stack className="w-full" asChild>
      <form method="get" action="/tools">
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />

          <Input
            name="q"
            size="lg"
            defaultValue={q}
            placeholder="Search tools..."
            className="w-full pl-10"
          />
        </div>
      </form>
    </Stack>
  )
}
