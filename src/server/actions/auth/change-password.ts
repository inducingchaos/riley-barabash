/**
 * @todo
 * - [P1] Add rate-limiting.
 */

"use server"

import { z } from "zod"
import { unauthenticatedAction } from "~/lib/auth/core"
import { changePassword } from "~/lib/auth/email/password"
import { Error, serializeError } from "~/meta"

export const changePasswordAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            token: z.string(),
            password: z.string().min(8)
        })
    )
    .experimental_shapeError(({ err: error }) => {
        if (error instanceof Error) return serializeError(error)
        else throw error
    })
    .handler(async ({ input: { token, password } }) => {
        //  Add rate-limiting here.

        await changePassword({ using: { token, password } })
    })
