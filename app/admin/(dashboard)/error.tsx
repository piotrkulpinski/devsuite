"use client"

import { useEffect } from "react"
import { Button } from "~/components/admin/ui/button"
import { H4 } from "~/components/common/heading"

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
      <H4 as="h1">Something went wrong!</H4>

      <p className="text-sm text-muted-foreground">
        Please try again. If the problem persists, contact support.
      </p>

      <Button className="justify-self-start" onClick={() => reset()}>
        Try again
      </Button>
    </>
  )
}
