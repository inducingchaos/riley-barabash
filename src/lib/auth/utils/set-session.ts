/**
 *
 */

import "server-only"

import type { UserId } from "lucia"
import { cookies } from "next/headers"
import { lucia } from "~/lib/providers/auth/lucia"
import { generateSessionToken, createSession } from "./new-lucia"

export async function setSession({ using: { userId } }: { using: { userId: UserId } }): Promise<void> {
    const token = generateSessionToken()
    await createSession(token, userId)
    // setSessionTokenCookie(token)

    // const session = await lucia.createSession(userId, {})

    const sessionCookie = lucia.createSessionCookie(token)

    const cookieStore = await cookies()
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
