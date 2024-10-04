"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import type { PropsWithChildren } from "react"
import { env } from "~/env"

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    api_host: `${env.NEXT_PUBLIC_POSTHOG_HOST}`,
    person_profiles: "always",
  })
}

export function PostHogProvider({ children }: PropsWithChildren) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
