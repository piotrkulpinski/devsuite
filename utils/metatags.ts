import he from "he"
import { parse } from "node-html-parser"
import { isValidUrl } from "../../remix/app/utils/helpers"

export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  timeout = 5000,
) {
  return new Promise<Response>((resolve, reject) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      reject(new Error("Request timed out"))
    }, timeout)
    fetch(input, { ...init, signal: controller.signal })
      .then(response => {
        clearTimeout(timeoutId)
        resolve(response)
      })
      .catch(error => {
        clearTimeout(timeoutId)
        reject(error)
      })
  })
}

export const getHtml = async (url: string) => {
  return await fetchWithTimeout(url, {
    headers: {
      "User-Agent": "Dub.co Bot",
    },
  })
    .then(r => r.text())
    .catch(() => null)
}

export const getHeadChildNodes = (html: string) => {
  const ast = parse(html) // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll("meta").map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href
    return {
      property,
      content: attributes.content,
    }
  })
  const title = ast.querySelector("title")?.innerText
  const linkTags = ast.querySelectorAll("link").map(({ attributes }) => {
    const { rel, href } = attributes
    return {
      rel,
      href,
    }
  })

  return { metaTags, title, linkTags }
}

export const getRelativeUrl = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null
  }

  if (isValidUrl(imageUrl)) {
    return imageUrl
  }

  const { protocol, host } = new URL(url)
  const baseURL = `${protocol}//${host}`
  return new URL(imageUrl, baseURL).toString()
}

export const getMetaTags = async (url: string) => {
  const html = await getHtml(url)

  if (!html) {
    return {
      title: url,
      description: undefined,
      imageUrl: undefined,
      faviconUrl: undefined,
    }
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html)

  const meta: Record<string, string> = {}

  for (const k in metaTags) {
    const { property, content } = metaTags[k]

    // !meta[property] → (meaning we're taking the first instance of a metatag and ignoring the rest)
    property && !meta[property] && (meta[property] = content && he.decode(content))
  }

  for (const m in linkTags) {
    const { rel, href } = linkTags[m]

    // !meta[rel] → (ditto the above)
    rel && !meta[rel] && (meta[rel] = href)
  }

  const title = meta["og:title"] || meta["twitter:title"] || titleTag
  const description = meta["description"] || meta["og:description"] || meta["twitter:description"]
  const imageUrl = meta["og:image"] || meta["twitter:image"] || meta["image_src"]
  const faviconUrl = meta["icon"] || meta["shortcut icon"]

  return {
    title: title || url,
    description: description,
    imageUrl: getRelativeUrl(url, imageUrl),
    faviconUrl: getRelativeUrl(url, faviconUrl),
  }
}
