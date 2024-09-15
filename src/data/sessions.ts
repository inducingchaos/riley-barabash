import { db } from "~/server/db"
import { sessions } from "~/server/db/schemas"
import { type UserId } from "~/use-cases/types"
import { eq } from "drizzle-orm"

export async function deleteSessionForUser(userId: UserId, trx = db) {
    await trx.delete(sessions).where(eq(sessions.userId, userId))
}
