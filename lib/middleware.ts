import type { NextRequest } from "next/server"

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string

  // remove www. from domain and convert to lowercase
  domain = domain.replace("www.", "").toLowerCase()

  // path is the path of the URL (e.g. example.com/tools/github -> /tools/github)
  const path = req.nextUrl.pathname

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString()
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : ""
  const fullPath = `${path}${searchParamsString}`

  return { domain, path, fullPath, searchParamsString }
}
