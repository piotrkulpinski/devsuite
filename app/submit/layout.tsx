import type { PropsWithChildren } from "react"
import { Wrapper } from "~/components/ui/wrapper"

export default function SubmitLayout({ children }: PropsWithChildren) {
  return <Wrapper className="flex flex-col gap-16">{children}</Wrapper>
}
