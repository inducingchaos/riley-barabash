/**
 *
 */

import { tokens, type CreatableToken, type Token, type User } from "~/server/data/schemas"
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding"
import { db } from "~/server/data"
import { sha256 } from "@oslojs/crypto/sha2"
import { eq } from "drizzle-orm"

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20)
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    return token
}

export async function createSession(token: string, userId: number): Promise<Token> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session: CreatableToken = {
        userId,
        type: "session",
        value: sessionId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }

    const { id } = (await db.insert(tokens).values(session).$returningId())[0]!
    return { ...session, id }
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

    const session = await db.query.tokens.findFirst({
        where: eq(tokens.value, sessionId),
        with: {
            user: true
        }
    })
    if (!session) return { session: null, user: null }

    if (Date.now() >= session.expiresAt.getTime()) {
        await db.delete(tokens).where(eq(tokens.id, session.id))
        return { session: null, user: null }
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        await db
            .update(tokens)
            .set({
                expiresAt: session.expiresAt
            })
            .where(eq(tokens.id, session.id))
    }
    return { session, user: session.user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
    await db.delete(tokens).where(eq(tokens.value, sessionId))
}

export type SessionValidationResult = { session: Token; user: User } | { session: null; user: null }

import { cookies } from "next/headers"

// ...

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
    cookies().set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
        expires: expiresAt,
        path: "/"
    })
}

export function deleteSessionTokenCookie(): void {
    cookies().set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
        maxAge: 0,
        path: "/"
    })
}

export const session = {
    create: createSession,
    validate: validateSessionToken,
    invalidate: invalidateSession,
    setCookie: setSessionTokenCookie,
    deleteCookie: deleteSessionTokenCookie
}
