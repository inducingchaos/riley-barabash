"use server"

import { unauthenticatedAction } from "~/lib/auth/core"
import { redirect } from "next/navigation"
import { z } from "zod"
import { Error } from "~/meta"
import { sendMagicLink } from "~/lib/auth/email/magic-link"

export const signInWithMagicLinkAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email()
        })
    )
    .experimental_shapeError(async error => {
        if (error instanceof Error) return error
    })
    .handler(async ({ input }) => {
        // Rate limit here
        await sendMagicLink({ using: { email: input.email } })

        redirect("/sign-in/verification")
    })
