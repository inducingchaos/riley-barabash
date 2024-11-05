/**
 * @todo
 * - [P1] Add rate-limiting.
 */

"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { signInWithPassword } from "~/lib/auth/email/password"
import { setSession, unauthenticatedAction } from "~/lib/auth/utils"

export const signInAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })
    )
    .handler(async ({ input }) => {
        // TODO [P1]: Add rate-limiting.

        const user = await signInWithPassword({ using: { email: input.email, password: input.password } })

        await setSession({ using: { userId: user.id } })
        redirect("/")
    })
