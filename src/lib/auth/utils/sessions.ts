/**
 *
 */

import { sha256 } from "@oslojs/crypto/sha2"
import { encodeHexLowerCase } from "@oslojs/encoding"
import { cookies } from "next/headers"
import { SESSION_EXPIRY } from "~/constants/temp"
import { db } from "~/server/data"
import { createToken, deleteToken, getToken, updateToken } from "~/server/data/access/shared/auth"
import { type Token } from "~/server/data/schemas"

export async function createSession({
    using: { userId, token: tokenValue }
}: {
    using: { userId: number; token?: string }
}): Promise<Token> {
    return await createToken({
        using: {
            userId,
            type: "session",

            //  Session tokens are hashed before storage in the database to prevent user impersonation in the case of a database breach.

            value: encodeHexLowerCase(sha256(new TextEncoder().encode(tokenValue))),
            expiresAt: new Date(Date.now() + SESSION_EXPIRY)
        },
        in: db
    })
}

export async function validateSession({
    using: { token: tokenValue }
}: {
    using: { token: string }
}): Promise<Token | undefined> {
    const token = await getToken({
        where: {
            value: encodeHexLowerCase(sha256(new TextEncoder().encode(tokenValue)))
        },
        from: db
    })
    if (!token) return undefined

    const isExpired = Date.now() >= token.expiresAt.getTime()
    const isExpiring = !isExpired && Date.now() >= token.expiresAt.getTime() - SESSION_EXPIRY / 2

    if (isExpired) {
        await deleteToken({ where: { value: token.value }, from: db })
        return undefined
    }

    if (isExpiring) {
        await updateToken({
            where: { value: token.value },
            using: { expiresAt: new Date(Date.now() + SESSION_EXPIRY) },
            in: db
        })
    }

    return token
}

export async function invalidateSession({ where: { token: tokenValue } }: { where: { token: string } }): Promise<void> {
    await deleteToken({ where: { value: encodeHexLowerCase(sha256(new TextEncoder().encode(tokenValue))) }, from: db })
}

// ...

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
        expires: expiresAt,
        path: "/"
    })
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
        maxAge: 0,
        path: "/"
    })
}
