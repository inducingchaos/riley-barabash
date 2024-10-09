"use server"

import { setSession, unauthenticatedAction } from "~/lib/auth/core"
import { redirect } from "next/navigation"
import { z } from "zod"
import { signUp } from "~/lib/auth/email/password"
import { serializeError, Error } from "~/meta"

export const signUpAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            name: z.string().min(1),
            email: z.string().email(),
            password: z.string().min(8)
        })
    )
    .experimental_shapeError(async ({ err: error }) => {
        if (error instanceof Error) return serializeError(error)
        else throw error
    })
    .handler(async ({ input }) => {
        //  Rate-limit.

        const user = await signUp({ using: { name: input.name, email: input.email, password: input.password } })
        await setSession({ using: { userId: user.id } })
        return redirect("/")
    })
