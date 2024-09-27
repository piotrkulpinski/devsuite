import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"

export default function SubmitThanks() {
  return (
    <>
      <Intro alignment="center">
        <IntroTitle>Thank you for your submission!</IntroTitle>

        <IntroDescription>
          We&apos;re excited to review your tool and add it to the list. We&apos;ll reach out if we
          have any questions or need more information.
        </IntroDescription>
      </Intro>

      <img src="/3d-heart.webp" alt="" className="max-w-64 w-2/3 h-auto mx-auto" />
    </>
  )
}
