/**
 * @todo
 * - [P1] Add rate-limiting.
 */

"use server"

import { unauthenticatedAction } from "~/lib/auth/core"
import { z } from "zod"
import { resetPassword } from "~/lib/auth/email/password"
import { Error } from "~/meta"

export const resetPasswordAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email()
        })
    )
    .experimental_shapeError(async ({ err: error }) => {
        if (error instanceof Error) return error
        else throw error
    })
    .handler(async ({ input }) => {
        //  TODO [P1]: Rate-limit here.

        await resetPassword({ using: { email: input.email } })
    })
