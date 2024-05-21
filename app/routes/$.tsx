import { Link, useLocation } from "@remix-run/react"
import { Button } from "~/components/Button"
import { Wrapper } from "~/components/Wrapper"
import { Intro } from "~/components/Intro"

export default function NotFound() {
  const location = useLocation()

  return (
    <Wrapper>
      <Intro
        title="Page not found"
        description={`We're sorry, but the page "${location.pathname}" could not be found. You may have mistyped the address or the page may have moved.`}
      >
        <Button size="lg" variant="primary" className="mt-4" asChild>
          <Link to="/">Go back home</Link>
        </Button>
      </Intro>
    </Wrapper>
  )
}
