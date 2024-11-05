/**
 * @todo
 * - [P1] Add rate-limiting.
 */

"use server"

import { z } from "zod"
import { sendRecoveryLink } from "~/lib/auth/email/password"
import { unauthenticatedAction } from "~/lib/auth/utils"

export const resetPasswordAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email()
        })
    )
    .handler(async ({ input }) => {
        //  TODO [P1]: Rate-limit here.

        await sendRecoveryLink({ to: { email: input.email } })
    })
