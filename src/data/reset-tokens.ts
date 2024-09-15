import { generateRandomToken } from "~/data/utils"
import { resetTokens } from "~/server/db/schemas"
import { type UserId } from "~/use-cases/types"
import { eq } from "drizzle-orm"
import { TOKEN_LENGTH, TOKEN_TTL } from "./magic-links"
import { db } from "~/server/db"

export async function createPasswordResetToken(userId: UserId) {
    const token = await generateRandomToken(TOKEN_LENGTH)
    const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL)

    await db.delete(resetTokens).where(eq(resetTokens.userId, userId))
    await db.insert(resetTokens).values({
        userId,
        token,
        tokenExpiresAt
    })

    return token
}

export async function getPasswordResetToken(token: string) {
    const existingToken = await db.query.resetTokens.findFirst({
        where: eq(resetTokens.token, token)
    })

    return existingToken
}

export async function deletePasswordResetToken(token: string, trx = db) {
    await trx.delete(resetTokens).where(eq(resetTokens.token, token))
}
