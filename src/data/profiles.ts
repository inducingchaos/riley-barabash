import { db } from "~/server/db"
import { type Profile, profiles } from "~/server/db/schemas"
import { type UserId } from "~/use-cases/types"
import { eq, sql } from "drizzle-orm"

export async function createProfile(userId: UserId, displayName: string, image?: string) {
    const data = {
        userId,
        image,
        displayName
    }
    const profile = (
        await db
            .insert(profiles)
            .values(data)
            .onDuplicateKeyUpdate({ set: { ...data, id: sql`${profiles.id}` } })
            .$returningId()
    )[0]!
    return profile
}

export async function updateProfile(userId: UserId, updateProfile: Partial<Profile>) {
    await db.update(profiles).set(updateProfile).where(eq(profiles.userId, userId))
}

export async function getProfile(userId: UserId) {
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.userId, userId)
    })

    return profile
}
