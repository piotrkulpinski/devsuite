import type { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { Intro } from "~/components/Intro"

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }]
}

export default function Index() {
  return (
    <>
      <Intro title="Admin Panel" alignment="center" className="max-w-2xl mx-auto text-pretty" />

      <Outlet />
    </>
  )
}
