/**
 *
 */

import { eq } from "drizzle-orm"
import { DataError } from "~/errors"
import { type Database } from "~/server/data"
import { profiles } from "~/server/data/schemas"
import type { Profile, ProfileOptions } from "~/types/auth"
import { getProfile } from "."

export async function createProfile({ using: values, in: db }: { using: ProfileOptions; in: Database }): Promise<Profile> {
    return await db.transaction(async tx => {
        const profile = await getProfile({ where: values, from: tx })
        if (profile)
            throw new DataError({
                name: "RESOURCE_ALREADY_EXISTS",
                message: "Profile already exists with the provided values.",
                cause: {
                    existing: profile,
                    new: values
                }
            })

        const { id } = (await tx.insert(profiles).values(values).$returningId())[0]!

        return (await db.query.profiles.findFirst({ where: eq(profiles.id, id) }))!
    })
}
