"use server"

import type { Prisma } from "@prisma/client"
import { unstable_noStore as noStore } from "next/cache"
import { getErrorMessage } from "~/lib/errors"
import { prisma } from "~/services/prisma"

/**
 * Submit a tool to the database
 * @param input - The tool data to submit
 * @returns The tool that was submitted
 */
export const submitTool = async (input: Prisma.ToolCreateInput) => {
  noStore()
  try {
    const tool = await prisma.tool.create({
      data: input,
    })

    return {
      data: tool,
      error: null,
    }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
