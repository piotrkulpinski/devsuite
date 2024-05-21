import { Intro } from "~/components/Intro"
import { Wrapper } from "~/components/Wrapper"

export default function SubmitThanks() {
  return (
    <Wrapper className="flex flex-col gap-16">
      <Intro
        title="Thank you for your submission!"
        description="We're excited to review your tool and add it to the list. We'll reach out if we have any questions or need more information."
        alignment="center"
      />

      <img src="/3d-heart.png" alt="" className="max-w-64 w-2/3 h-auto mx-auto" />
    </Wrapper>
  )
}
