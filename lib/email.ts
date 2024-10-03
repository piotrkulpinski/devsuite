export const isRealEmail = async (email: string) => {
  const disposableJsonURL =
    "https://rawcdn.githack.com/disposable/disposable-email-domains/master/domains.json"
  const response = await fetch(disposableJsonURL)
  const disposableDomains: string[] = await response.json()
  const domain = email.split("@")[1]

  return !disposableDomains.includes(domain)
}
