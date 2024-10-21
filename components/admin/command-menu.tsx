"use client"

import type { Category, Collection, Tag, Tool } from "@prisma/client"
import { LoaderIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useServerAction } from "zsa-react"
import { searchItems } from "~/actions/search"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/admin/ui/command"
import { useDebouncedState } from "~/hooks/use-debounced-state"

type SearchResult = {
  tools: Tool[]
  categories: Category[]
  collections: Collection[]
  tags: Tag[]
}

export const CommandMenu = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useDebouncedState("", 250)
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => {
          if (!open) {
            return true
          }

          // Clear search results
          clearSearch()
          return false
        })
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const { execute, isPending } = useServerAction(searchItems, {
    onSuccess: ({ data }) => {
      setSearchResults(data)
    },

    onError: ({ err }) => {
      console.error(err)
      setSearchResults(null)
    },
  })

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.length > 1) {
        execute({ query: searchQuery })
      } else {
        setSearchResults(null)
      }
    }

    performSearch()
  }, [searchQuery])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)

    // Clear search results
    !newOpen && clearSearch()
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  const handleSelect = (url: string) => {
    handleOpenChange(false)
    router.push(url)
  }

  const clearSearch = () => {
    setTimeout(() => {
      setSearchResults(null)
      setSearchQuery("")
    }, 250)
  }

  return (
    <CommandDialog open={open} onOpenChange={handleOpenChange}>
      <CommandInput placeholder="Type to search..." onValueChange={handleSearch} />

      {isPending && (
        <div className="absolute top-4 left-3 bg-background text-muted-foreground">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      )}

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Create">
          <CommandItem onSelect={() => handleSelect("/tools/new")}>New Tool</CommandItem>
          <CommandItem onSelect={() => handleSelect("/categories/new")}>New Category</CommandItem>
          <CommandItem onSelect={() => handleSelect("/collections/new")}>
            New Collection
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/tags/new")}>New Tag</CommandItem>
        </CommandGroup>

        {/* <CommandGroup heading="Quick Commands">
          <CommandItem onSelect={handleIndexSearch}>Index Search</CommandItem>
        </CommandGroup> */}

        {!!searchResults?.tools.length && (
          <CommandGroup heading="Tools">
            {searchResults.tools.map(tool => (
              <CommandItem
                key={tool.id}
                value={`tool:${tool.name}`}
                onSelect={() => handleSelect(`/tools/${tool.id}`)}
              >
                {tool.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {!!searchResults?.categories.length && (
          <CommandGroup heading="Categories">
            {searchResults.categories.map(category => (
              <CommandItem
                key={category.id}
                onSelect={() => handleSelect(`/categories/${category.id}`)}
              >
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {!!searchResults?.collections.length && (
          <CommandGroup heading="Collections">
            {searchResults.collections.map(collection => (
              <CommandItem
                key={collection.id}
                value={`collection:${collection.name}`}
                onSelect={() => handleSelect(`/collections/${collection.id}`)}
              >
                {collection.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {!!searchResults?.tags.length && (
          <CommandGroup heading="Tags">
            {searchResults.tags.map(tag => (
              <CommandItem key={tag.id} onSelect={() => handleSelect(`/tags/${tag.id}`)}>
                {tag.slug}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
