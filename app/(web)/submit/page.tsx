import { SubmitForm } from "~/app/(web)/submit/form"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"
import { Wrapper } from "~/components/ui/wrapper"

export default function SubmitPage() {
  return (
    <Wrapper size="sm">
      <Intro alignment="center">
        <IntroTitle>Submit a Tool</IntroTitle>

        <IntroDescription>
          A high-quality website curation is the most important aspect for us. We can&apos;t list
          all sites since it&apos;s a highly curated directory.
        </IntroDescription>
      </Intro>

      <SubmitForm />
    </Wrapper>
  )
}
