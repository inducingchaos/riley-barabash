/**
 * @todo
 * - [P1] Add rate-limiting.
 */

"use server"

import { unauthenticatedAction } from "~/lib/auth/core"
import { setSession } from "~/lib/auth/core"
import { redirect } from "next/navigation"
import { z } from "zod"
import { Exception } from "~/meta"
import { signInWithPassword } from "~/lib/auth/email/password"

export const signInAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })
    )
    .experimental_shapeError(({ err: error }) => {
        if (error instanceof Exception) return error.serialize()
        else throw error
    })
    .handler(async ({ input }) => {
        // TODO [P1]: Add rate-limiting.

        const user = await signInWithPassword({ using: { email: input.email, password: input.password } })

        await setSession({ using: { userId: user.id } })
        redirect("/")
    })
