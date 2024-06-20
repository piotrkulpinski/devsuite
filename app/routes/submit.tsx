import { Outlet } from "@remix-run/react"
import { Wrapper } from "~/components/Wrapper"

export const handle = {
  newsletter: false,
  bottomBlur: false,
}

export default function SubmitLayout() {
  return (
    <Wrapper className="flex flex-col gap-16">
      <Outlet />
    </Wrapper>
  )
}
