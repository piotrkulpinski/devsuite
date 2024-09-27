import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server"

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(24),
})
