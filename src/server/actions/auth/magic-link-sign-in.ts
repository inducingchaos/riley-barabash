"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { sendMagicLink } from "~/lib/auth/email/magic-link"
import { unauthenticatedAction } from "~/lib/auth/utils"

export const signInWithMagicLinkAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email()
        })
    )
    .handler(async ({ input }) => {
        // Rate limit here
        await sendMagicLink({ to: { email: input.email } })

        redirect("/sign-in/verification")
    })
