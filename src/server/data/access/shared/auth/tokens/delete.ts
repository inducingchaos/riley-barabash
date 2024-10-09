/**
 *
 */

import { eq } from "drizzle-orm"
import { db, type Database } from "~/server/data"
import { tokens } from "~/server/data/schemas"
import type { Token, TokenID } from "~/types/auth"

export async function deleteVerifyEmailToken(token: string) {
    await db.delete(tokens).where(eq(tokens.value, token))
}

export async function deleteMagicToken(token: string) {
    await db.delete(tokens).where(eq(tokens.value, token))
}

export async function deleteToken({ where: query, in: db }: { where: Partial<Token>; in: Database }): Promise<void> {
    await db.delete(tokens).where(eq(tokens.id, query.id))
}

export async function deletePasswordResetToken(token: string, trx = db) {
    await trx.delete(tokens).where(eq(tokens.value, token))
}
