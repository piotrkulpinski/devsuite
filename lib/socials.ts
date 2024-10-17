export type Socials = Record<string, Array<Record<string, string> & { url: string }>>

export const getSocialsFromUrl = async (url: string) => {
  const apiEndpoint = `https://brandlink.piotr-f64.workers.dev/api/links?url=${url}`

  const response = await fetch(apiEndpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const socials = (await response.json()) as Socials

  return socials
}
