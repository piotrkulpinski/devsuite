export const getUrlHostname = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname
  }

  return url
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
