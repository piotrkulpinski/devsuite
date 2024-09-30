"use client"

import { useDebounce } from "@uidotdev/usehooks"
import { LoaderIcon, SearchIcon } from "lucide-react"
import { useQueryStates } from "nuqs"
import { useEffect, useState } from "react"
import { Input } from "~/components/ui/forms/input"
import { Select } from "~/components/ui/forms/select"
import { Stack } from "~/components/ui/stack"
import { toolSearchParams } from "~/lib/search-params"

export const ToolFilters = () => {
  const [filters, setFilters] = useQueryStates(toolSearchParams, { shallow: false })
  const [inputValue, setInputValue] = useState(filters.q || "")
  const debouncedInputValue = useDebounce(inputValue, 300)

  useEffect(() => {
    setFilters({ q: debouncedInputValue })
  }, [debouncedInputValue, setFilters])

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
            className="w-full pl-10 pr-10"
          />

          {inputValue !== debouncedInputValue && (
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
          onChange={e => setFilters({ sort: e.target.value })}
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
