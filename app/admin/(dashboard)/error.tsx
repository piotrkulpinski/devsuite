"use client"

import { useEffect } from "react"
import { H3 } from "~/components/common/heading"
import { Button } from "~/components/ui/button"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <H3>Something went wrong!</H3>

      <p className="text-sm text-muted-foreground">
        Please try again. If the problem persists, contact support.
      </p>

      <Button className="justify-self-start" onClick={() => reset()}>
        Try again
      </Button>
    </>
  )
}
