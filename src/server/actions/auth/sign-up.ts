"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { signUp } from "~/lib/auth/email/password"
import { setSession, unauthenticatedAction } from "~/lib/auth/utils"

export const signUpAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(8)
        })
    )
    .handler(async ({ input }) => {
        //  Rate-limit.

        const user = await signUp({ using: { name: input.name, email: input.email, password: input.password } })
        await setSession({ using: { userId: user.id } })
        return redirect("/")
    })
