/**
 *
 */

import { redirect } from "next/navigation"
import { application } from "~/config"
import { validateRequest } from "~/lib/auth/utils"
import { deleteSessionTokenCookie, invalidateSession } from "~/lib/auth/utils/new-lucia"

export async function POST(): Promise<Response> {
    const { session } = await validateRequest()
    if (!session) {
        redirect("/sign-in")
    }

    await invalidateSession(session.value)
    await deleteSessionTokenCookie()
    redirect(application.routing.paths.callbacks.auth.signOut)
}
