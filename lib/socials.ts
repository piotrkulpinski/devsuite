import "server-only"
import ky from "ky"

export type Socials = Record<string, Array<Record<string, string> & { url: string }>>

export const getSocialsFromUrl = async (url: string) => {
  try {
    const apiEndpoint = `https://brandlink.piotr-f64.workers.dev/api/links?url=${url}`
    return await ky.get(apiEndpoint).json<Socials>()
  } catch (error) {
    console.error("Error fetching socials:", error)
    return {}
  }
}
