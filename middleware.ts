import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { env } from "~/env"

export function middleware(request: NextRequest) {
  if (!env.ALLOWED_IPS) {
    return NextResponse.next()
  }

  const allowedIps = env.ALLOWED_IPS.split(",")
  const ip = request.ip || request.headers.get("x-forwarded-for")

  if (!ip || !allowedIps.includes(ip)) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}
