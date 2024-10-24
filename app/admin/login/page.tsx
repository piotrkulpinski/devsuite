import { redirect } from "next/navigation"
import { Button } from "~/components/admin/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/admin/ui/card"
import { auth, signIn } from "~/lib/auth"

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  const handleSignIn = async () => {
    "use server"
    await signIn("google", { redirectTo: "/admin" })
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-8 bg-muted md:items-center">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardFooter>
          <Button size="lg" className="w-full" onClick={handleSignIn}>
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
