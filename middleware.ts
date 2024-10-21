import { NextResponse } from "next/server"
import { env, isProd } from "~/env"
import { auth } from "~/lib/auth"

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
  const { pathname } = req.nextUrl

  if (isProd && env.ALLOWED_IPS) {
    const allowedIps = env.ALLOWED_IPS.split(",")
    const ip = req.ip || req.headers.get("x-forwarded-for")

    if (!ip || !allowedIps.includes(ip)) {
      return NextResponse.redirect(new URL("https://devsuite.beehiiv.com/subscribe"))
    }
  }

  if (!req.auth && pathname.includes("/admin") && !pathname.includes("/login")) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return NextResponse.next()
})
