import { SubmitForm } from "~/app/submit/form"
import { Intro, IntroDescription, IntroTitle } from "~/components/ui/intro"

export default function SubmitPage() {
  return (
    <>
      <Intro alignment="center">
        <IntroTitle>Submit a Tool</IntroTitle>

        <IntroDescription>
          A high-quality website curation is the most important aspect for us. We can&apos;t list
          all sites since it&apos;s a highly curated directory.
        </IntroDescription>
      </Intro>

      <SubmitForm />
    </>
  )
}
