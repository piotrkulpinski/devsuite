import he from "he"
import { isValidUrl } from "./helpers"
import { parse } from "node-html-parser"

export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  timeout: number = 5000
) {
  return new Promise<Response>((resolve, reject) => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
      reject(new Error("Request timed out"))
    }, timeout)
    fetch(input, { ...init, signal: controller.signal })
      .then((response) => {
        clearTimeout(timeoutId)
        resolve(response)
      })
      .catch((error) => {
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
    .then((r) => r.text())
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
      description: "No description",
      image: null,
    }
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html)

  const object = {}

  for (const k in metaTags) {
    const { property, content } = metaTags[k]

    // !object[property] → (meaning we're taking the first instance of a metatag and ignoring the rest)
    property && !object[property] && (object[property] = content && he.decode(content))
  }

  for (const m in linkTags) {
    const { rel, href } = linkTags[m]

    // !object[rel] → (ditto the above)
    rel && !object[rel] && (object[rel] = href)
  }

  const title = object["og:title"] || object["twitter:title"] || titleTag

  const description =
    object["description"] || object["og:description"] || object["twitter:description"]

  const image =
    object["og:image"] ||
    object["twitter:image"] ||
    object["image_src"] ||
    object["icon"] ||
    object["shortcut icon"]

  return {
    title: title || url,
    description: description,
    image: getRelativeUrl(url, image),
  }
}
