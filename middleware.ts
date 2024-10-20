import { getUrlHostname } from "@curiousleaf/utils"
import { NextResponse } from "next/server"
import { env } from "~/env"
import { auth } from "~/lib/auth"
import { parse } from "~/lib/middleware"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static/ (static files inside /public folder)
     * 5. Metadata files: favicon.ico, sitemap.xml, robots.txt, rss.xml, manifest.webmanifest, .well-known
     * biome-ignore format:
     */
    "/((?!api/|_next/|_proxy/|_static/|favicon.ico|sitemap(?:-\d+)?.xml|robots.txt|rss.xml|manifest.webmanifest|.well-known).*)",
  ],
}

export default auth(req => {
  const { domain, path } = parse(req)

  if (env.ALLOWED_IPS) {
    const allowedIps = env.ALLOWED_IPS.split(",")
    const ip = req.ip || req.headers.get("x-forwarded-for")

    if (!ip || !allowedIps.includes(ip)) {
      return NextResponse.redirect(new URL("https://devsuite.beehiiv.com/subscribe"))
    }
  }

  const adminHostnames = new Set([
    `admin.${getUrlHostname(env.NEXT_PUBLIC_SITE_URL)}`,
    "admin.localhost:5175",
  ])

  // if (path.startsWith("/admin") && !adminHostnames.has(domain)) {
  //   return NextResponse.redirect(new URL("/", req.url))
  // }

  if (adminHostnames.has(domain)) {
    if (!req.auth && !path.includes("/login")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (req.auth && path.includes("/login")) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.rewrite(new URL(`/admin${path === "/" ? "" : path}`, req.url))
  }

  return NextResponse.next()
})
