"use server"

import { unauthenticatedAction } from "~/lib/auth/core"
import { redirect } from "next/navigation"
import { z } from "zod"
import { Exception } from "~/meta"
import { sendMagicLink } from "~/lib/auth/email/magic-link"

export const signInWithMagicLinkAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email()
        })
    )
    .experimental_shapeError(({ err: error }) => {
        if (error instanceof Exception) return error.serialize()
        else throw error
    })
    .handler(async ({ input }) => {
        // Rate limit here
        await sendMagicLink({ to: { email: input.email } })

        redirect("/sign-in/verification")
    })
