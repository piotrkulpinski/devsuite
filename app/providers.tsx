"use client"

import { getUrlHostname } from "@curiousleaf/utils"
import PlausibleProvider from "next-plausible"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import type { PropsWithChildren } from "react"
import { PosthogPageview } from "~/components/web/posthog-pageview"
import { config } from "~/config"
import { env } from "~/env"

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    api_host: "/_proxy/posthog/ingest",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
  })
}

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PostHogProvider client={posthog}>
      <PlausibleProvider
        domain={getUrlHostname(config.site.url)}
        scriptProps={{
          src: "/_proxy/plausible/script.js",
          // @ts-ignore
          "data-api": "/_proxy/plausible/event",
        }}
      />

      <PosthogPageview />
      <NuqsAdapter>{children}</NuqsAdapter>
    </PostHogProvider>
  )
}
