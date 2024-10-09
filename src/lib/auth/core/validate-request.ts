/**
 *
 */

import type { Session, User } from "lucia"
import { cookies } from "next/headers"
import { lucia } from "~/lib/providers/auth"

export async function validateRequest(): Promise<{ user: User; session: Session } | { user: null; session: null }> {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value
    if (!sessionId) return { user: null, session: null }

    const result = await lucia.validateSession(sessionId)

    //  Next.js throws when you attempt to set cookie when rendering page.

    try {
        if (result.session?.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
    } catch {}

    return result
}
