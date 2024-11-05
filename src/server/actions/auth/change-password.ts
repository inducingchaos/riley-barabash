/**
 * @todo
 * - [P1] Add rate-limiting.
 */

"use server"

import { z } from "zod"
import { unauthenticatedAction } from "~/lib/auth/utils"
import { changePassword } from "~/lib/auth/email/password"
import { Exception } from "~/meta"

export const changePasswordAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            token: z.string(),
            password: z.string().min(8)
        })
    )
    .handler(async ({ input: { token, password } }) => {
        //  Add rate-limiting here.

        await changePassword({ using: { token, password } })
    })
