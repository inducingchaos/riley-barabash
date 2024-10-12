/**
 *
 */

import { validateRequest } from "~/lib/auth/core"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { lucia } from "~/lib/providers/auth"
import { application } from "~/config"

export async function POST(): Promise<Response> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const { session } = await validateRequest()
    if (!session) {
        redirect("/sign-in")
    }

    await lucia.invalidateSession(session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    redirect(application.routing.paths.callbacks.auth.signOut)
}
