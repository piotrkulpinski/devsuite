"use client"

import { LoaderIcon, SearchIcon } from "lucide-react"
import { type Values, useQueryStates } from "nuqs"
import { useEffect, useState } from "react"
import { Input } from "~/components/ui/forms/input"
import { Select } from "~/components/ui/forms/select"
import { Stack } from "~/components/ui/stack"
import { useDebounce } from "~/hooks/use-debounce"
import { toolSearchParams } from "~/lib/search-params"

export const ToolFilters = () => {
  const [filters, setFilters] = useQueryStates(toolSearchParams, { shallow: false })
  const [inputValue, setInputValue] = useState(filters.q || "")
  const q = useDebounce(inputValue, 300)

  const updateFilters = (values: Partial<Values<typeof toolSearchParams>>) => {
    setFilters({ ...values, page: null })
  }

  useEffect(() => {
    if (filters.q !== q) {
      updateFilters({ q: q || null })
    }
  }, [q])

  const sortOptions = [
    { value: "publishedAt_desc", label: "Newest" },
    { value: "publishedAt_asc", label: "Oldest" },
    { value: "name_asc", label: "Name A-Z" },
    { value: "name_desc", label: "Name Z-A" },
  ]

  return (
    <Stack className="w-full flex-nowrap" asChild>
      <form method="get" action="/tools">
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />

          <Input
            name="q"
            size="lg"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search tools..."
            className="w-full px-10"
          />

          {inputValue !== q && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <LoaderIcon className="opacity-50 animate-spin" />
            </div>
          )}
        </div>

        <Select
          name="sort"
          size="lg"
          className="min-w-36"
          value={filters.sort}
          onChange={e => updateFilters({ sort: e.target.value })}
        >
          <option value="" disabled>
            Order by
          </option>

          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </form>
    </Stack>
  )
}
