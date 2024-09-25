"use server"

import { redirect } from "next/navigation"

/**
 *
 */
export const submit = async (_: any, formData: FormData) => {
  console.log(formData)
  redirect("/submit/packages")
}
