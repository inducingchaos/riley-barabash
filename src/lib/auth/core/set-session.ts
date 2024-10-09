/**
 *
 */

import "server-only"

import type { UserId } from "lucia"
import { cookies } from "next/headers"
import { lucia } from "~/lib/providers/auth/lucia"

export async function setSession({ using: { userId } }: { using: { userId: UserId } }): Promise<void> {
    const session = await lucia.createSession(userId, {})

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
