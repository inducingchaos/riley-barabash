/**
 *
 */

import { cookies } from "next/headers"
import { cache } from "react"
import {
    deleteSessionTokenCookie,
    setSessionTokenCookie,
    validateSessionToken,
    type SessionValidationResult
} from "./new-lucia"

export const validateRequest = async (): Promise<SessionValidationResult> => {
    const token = cookies().get("session")?.value ?? null
    if (!token) return { user: null, session: null }

    const result = await validateSessionToken(token)

    //  Next.js throws when you attempt to set cookie when rendering page.

    try {
        const isSessionExpiringSoon = result.session?.expiresAt
            ? Date.now() >= result.session.expiresAt.getTime() - 15 * 24 * 60 * 60 * 1000
            : false
        const fresh = isSessionExpiringSoon

        if (result.session && fresh) {
            setSessionTokenCookie(result.session.value, result.session.expiresAt)
        }
        if (!result.session) {
            deleteSessionTokenCookie()
        }
    } catch {}

    return result
}
