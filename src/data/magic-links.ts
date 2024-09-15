import { generateRandomToken } from "~/data/utils"
import { db } from "~/server/db"
import { magicLinks } from "~/server/db/schemas"
import { eq } from "drizzle-orm"

export const TOKEN_LENGTH = 32
export const TOKEN_TTL = 1000 * 60 * 5 // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7 // 7 days

export async function upsertMagicLink(email: string) {
    const token = await generateRandomToken(TOKEN_LENGTH)
    const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL)

    await db
        .insert(magicLinks)
        .values({
            email,
            token,
            tokenExpiresAt
        })

        .onDuplicateKeyUpdate({
            set: {
                token,
                tokenExpiresAt
            }
        })

    return token
}

/// on focus of verification page check auth state and redirect if so
/// if signed out on a reg page a refresh will be needed or if a req fails because of auth the page will need to be refreshed

// also if authed on the magic page should be redirected

export async function getMagicLinkByToken(token: string) {
    const existingToken = await db.query.magicLinks.findFirst({
        where: eq(magicLinks.token, token)
    })

    return existingToken
}

export async function deleteMagicToken(token: string) {
    await db.delete(magicLinks).where(eq(magicLinks.token, token))
}
